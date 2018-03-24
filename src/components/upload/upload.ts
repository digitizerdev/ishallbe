import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';

import { Platform, Events, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';

import firebase from 'firebase';
import { FirebaseProvider } from '../../providers/firebase/firebase';

import { Observable } from 'rxjs/Observable';
import Cropper from 'cropperjs';
import moment from 'moment';

@Component({
  selector: 'upload',
  templateUrl: 'upload.html'
})
export class UploadComponent {
  @ViewChild('imageSrc') imageElement: ElementRef;

  @Input('method') contentType;
  @Output() uploaded = new EventEmitter();
  sourceType: any;
  cameraOptions: any;
  cropperInstance: any;
  image: any;
  audio: any;
  contentBlob: any;
  contentName: string;
  filepath: string;
  loader: any;
  gettingImage = false;
  imageCropped = false;
  recording = false;
  complete = false;

  constructor(
    private platform: Platform,
    private events: Events,
    private loadingCtrl: LoadingController,
    private camera: Camera,
    private media: Media,
    private file: File,
    private firebase: FirebaseProvider
  ) {
  }

  ngOnInit() {
    console.log("Upload initialized");
    this.contentName = moment().unix().toString();
    this.loadMedia();
    this.listenToRedoEvents();
  }

  loadMedia() {
    console.log("Loading meedia");
    console.log("Content Type is " + this.contentType);
    switch (this.contentType) {
      case 'camera': {
        this.sourceType = this.camera.PictureSourceType.CAMERA;
        this.getImage();
      }
        break;
      case 'audio': {
        this.contentName = this.contentName + ".m4a";
        console.log(this.platform.platforms());
        if (this.platform.is('ios')) this.getIOSAudio();
        if (this.platform.is('android')) this.getAndroidAudio(); 
      }
        break;
      default: {
        this.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
        this.getImage();
      }
    }
  }

  getImage() {
    console.log("Getting Image");
    this.gettingImage = true;
    this.camera.getPicture(this.getCameraOptions()).then((image) => {
      this.imageElement.nativeElement.src = image;
      if (this.contentType == "pin") this.cropPin();
      else this.cropImage();
    }).catch((error) => {
      this.events.publish("getImageCanceled");
    });;
  }

  getCameraOptions() {
    console.log("Getting Camera Options");
    let cameraOpts: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.sourceType,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: false,
      correctOrientation: true
    }
    console.log(cameraOpts);
    return cameraOpts;
  }

  cropImage() {
    console.log("Cropping Image");
    this.cropperInstance = new Cropper(this.imageElement.nativeElement, {
      aspectRatio: 3 / 3,
      dragMode: 'move',
      modal: true,
      guides: true,
      highlight: false,
      background: false,
      autoCrop: true,
      autoCropArea: 0.9,
      responsive: true,
      zoomable: true,
      movable: false
    });
  }

  cropPin() {
    console.log("Cropping Pin");
    this.cropperInstance = new Cropper(this.imageElement.nativeElement, {
      dragMode: 'move',
      modal: true,
      guides: true,
      highlight: false,
      background: false,
      autoCrop: true,
      autoCropArea: 0.9,
      responsive: true,
      zoomable: true,
      movable: false
    });
  }

  uploadImage() {
    console.log("Uploading Image");
    this.loader = this.loadingCtrl.create({ spinner: 'bubbles', content: 'Loading..' });
    this.loader.present();
    this.image = this.cropperInstance.getCroppedCanvas({ width: 1000, height: 1000 }).toDataURL('image/jpeg');
    let uploadPath = 'content/' + this.firebase.user.uid + '/images/' + this.contentName;
    console.log("Upload Path is " + uploadPath);
    this.storeImage(uploadPath, this.image).subscribe((snapshot) => {
      let image = {
        url: snapshot.downloadURL,
        name: this.contentName
      }
      console.log("Stored Image");
      console.log(image);
      this.complete = true;
      this.uploaded.emit(image);
      this.loader.dismiss();
    });
  }

  storeImage(path, obj) {
    console.log("Storing Image"); 
    this.waitForStorageTimeout();
    return Observable.create((observer) => {
      let storagePath = firebase.storage().ref(path);
      return storagePath.putString(obj, 'data_url', { contentType: 'image/jpeg' }).
        then(function (snapshot) {
          observer.next(snapshot);
        }).catch((error: any) => {
          observer.next(error);
        });
    });
  }

  getAndroidAudio() {
    console.log("Getting Audio");
    this.recording = true;
    this.filepath = this.file.externalDataDirectory + this.contentName;
    console.log("Android File Path is " + this.filepath);
    const audio: MediaObject = this.media.create(this.filepath);
    console.log("Original Audio");
    console.log(audio);
    this.audio = audio;
    console.log("Assigned Audio");
    console.log(this.audio);
    this.audio.startRecord();
    window.setTimeout(() => {
      if (this.recording) this.uploadAudio();
    }, 10000);
  }

  getIOSAudio() {
    this.recording = true;
    this.filepath = this.file.tempDirectory.replace(/^file:\/\//, '') + this.contentName;
    console.log("iOS File Path is " + this.filepath);
    this.file.createFile(this.file.tempDirectory, this.contentName, true).then(() => {
      const audio: MediaObject = this.media.create(this.filepath);
      this.audio = audio;
      this.audio.startRecord();
      window.setTimeout(() => {
        if (this.recording) this.uploadAudio();
      }, 10000);
    }, (error) => {
      console.error("ERROR");
      console.error(error);
      this.events.publish("getAudioCanceled");
    });
  }

  uploadAudio() {
    console.log("Uploading Audio");
    this.recording = false;
    this.loader = this.loadingCtrl.create({ spinner: 'bubbles', content: 'Loading..' });
    this.loader.present();
    this.audio.stopRecord();
    this.storeAudio().subscribe((downloadURL) => {
      let audio = {
        url: downloadURL,
        name: this.contentName
      }
      console.log("Stored Audio");
      console.log(audio);
      this.audio.release();
      this.audio = null;
      this.contentName = null;
      this.recording = false;
      this.complete = true;
      this.uploaded.emit(audio);
      this.loader.dismiss();
    }, (error) => {
      console.error(error);
      this.complete = true;
      this.events.publish("getAudioCanceled");
      this.loader.dismiss();
    });
  }

  storeAudio() {
    return Observable.create((observer) => {
      this.waitForStorageTimeout();
      const filePath = `${this.file.tempDirectory}` + this.contentName;
      console.log("Filepath is " + filePath);
      const readFile: any = window['resolveLocalFileSystemURL'];
      return readFile(filePath, (fileEntry) => {
        return fileEntry.file((file) => {
          const fileReader = new FileReader();
          fileReader.onloadend = (result: any) => {
            let arrayBuffer = result.target.result;
            let blob = new Blob([new Uint8Array(arrayBuffer)], { type: 'audio/m4a' });
            let uploadPath = 'content/' + this.firebase.user.uid + '/audio/' + this.contentName;
            var storageRef = firebase.storage().ref(uploadPath);
            var uploadTask = storageRef.put(blob);
            uploadTask.on('state_changed', (snapshot) => {
            }, (e) => {
              observer.error(e);
            }, () => {
              var downloadURL = uploadTask.snapshot.downloadURL;
              observer.next(downloadURL);
            });
          };
          fileReader.onerror = (e: any) => {
            observer.error(e);
          };
          fileReader.readAsArrayBuffer(file);
        }, (e) => {
          observer.error(e);
        });
      }, (e) => {
        observer.error(e);
      });
    });
  }

  listenToRedoEvents() {
    console.log("Listening to Redo Events");
    this.events.subscribe('redoUpload', (contentType, contentName) => {
      console.log("Redo Upload triggered");
      console.log("Content Type is " + contentType);
      console.log("Content Name is " + contentName);
      this.contentType = contentType;
      this.resetUpload();
      this.loadMedia();
    });
  }

  resetUpload() {
    console.log("Reseting Upload");
    this.sourceType = null;
    this.cameraOptions = null;
    this.cropperInstance = null;
    this.image = null;
    this.audio = null;
    this.contentBlob = null;
    this.gettingImage = false;
    this.imageCropped = false;
    this.recording = false;
  }

  waitForStorageTimeout() {
    console.log("Listening for Storage Timeout");
    setTimeout(() => {
      if (!this.complete) {
        console.log("Storage Timeout");
        this.loader.dismiss();
        this.resetUpload();
        this.events.publish("timeout");
      }
    },
      7000);
  }
}