import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';

import { Events, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';

import firebase from 'firebase';
import { FirebaseProvider } from '../../providers/firebase/firebase';

import { Observable } from 'rxjs/Observable';
import Cropper from 'cropperjs';
import moment from 'moment';

declare var cordova: any;

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
  loader: any;
  gettingImage = false;
  imageCropped = false;
  recording = false;

  constructor(
    private events: Events,
    private loadingCtrl: LoadingController,
    private camera: Camera,
    private media: Media,
    private file: File,
    private firebase: FirebaseProvider
  ) {
    console.log("Hello Upload Component");
  }

  ngOnInit() {
    console.log("Initializing Upload Component");
    this.contentName = moment().format('YYYYMMDDhhmmss');
    console.log("Content name is " + this.contentName);
    this.loadMedia();
    this.listenToRedoEvents();
  }

  loadMedia() {
    console.log("Loading Media");
    console.log("Content type is " + this.contentType);
    switch (this.contentType) {
      case 'camera': {
        this.sourceType = this.camera.PictureSourceType.CAMERA;
        this.getImage();
      }
      break;
      case 'library': {
        this.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
        this.getImage();
      }
      break;
      case 'audio': {
        this.contentName = this.contentName + ".m4a";
        this.getAudio();
      }
    }
  }

  getImage() {
    console.log("Getting image");
    this.gettingImage = true;
    this.camera.getPicture(this.getCameraOptions()).then((image) => {
      this.imageElement.nativeElement.src = image;
      this.cropImage();
    }).catch((error) => { 
      console.error(error)
      this.events.publish("getImageCanceled");
    });;
  }

  getCameraOptions() {
    let cameraOpts: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.sourceType,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: false,
      correctOrientation: true
    }
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

  uploadImage() {
    console.log("Uploading Image");
    let loading = this.loadingCtrl.create({ content: 'Please Wait..' });
    loading.present();
    this.image = this.cropperInstance.getCroppedCanvas({ width: 1000, height: 1000 }).toDataURL('image/jpeg');
    let uploadPath = 'content/' + this.firebase.user.uid + '/images/' + this.contentName;
    console.log("Upload path is " + uploadPath);
    this.storeImage(uploadPath, this.image).subscribe((snapshot) => {
      console.log("Finished storing media");
      console.log(snapshot);
      let image = {
        url: snapshot.downloadURL,
        name: this.contentName
      }
      this.uploaded.emit(image);
      loading.dismiss();
    });
  }

  storeImage(path, obj) {
    console.log("Storing Image");
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

  getAudio() {
    console.log("Getting Audio");
    this.recording = true;
    this.file.createFile(this.file.tempDirectory, this.contentName, true).then(() => {
      const audio: MediaObject = this.media.create(this.file.tempDirectory.replace(/^file:\/\//, '') + this.contentName);
      console.log("Audio assigned to constant audio media object");
      console.log(audio);
      this.audio = audio;
      console.log("Audio assigned to this.audio media object");
      console.log(this.audio);
      this.audio.startRecord();
      window.setTimeout(() => {
        if (this.recording) this.uploadAudio();
      }, 10000);
    }, (error) => {
      console.log("There was an error");
      this.events.publish("getAudioCanceled");
      this.loader.dismiss();
    });
  }

  uploadAudio() {
    console.log("Uploading Audio");
    this.recording = false;
    this.loader = this.loadingCtrl.create({ content: 'Please Wait..' });
    this.loader.present();
    this.audio.stopRecord();
    this.storeAudio().subscribe((downloadURL) => {
      console.log("Finished storing record");
      console.log("Download URL is " + downloadURL);
      let audio = {
        url: downloadURL,
        name: this.contentName
      }
      this.audio.release();
      this.audio = null;
      this.contentName = null;
      this.recording = false;
      this.uploaded.emit(audio);
      this.loader.dismiss();
    }, (error) => {
      console.log("There was an error");
      this.events.publish("getAudioCanceled");
      this.loader.dismiss();
    });
  }

  storeAudio() {
    console.log("Storing Audio");
    return Observable.create((observer) => {
      console.log('Saving record');
      const filePath = `${this.file.tempDirectory}` + this.contentName;
      console.log("Path to record is " + filePath);
      const readFile: any = window['resolveLocalFileSystemURL'];
      return readFile(filePath, (fileEntry) => {
        return fileEntry.file((file) => {
          const fileReader = new FileReader();
          fileReader.onloadend = (result: any) => {
            let arrayBuffer = result.target.result;
            let blob = new Blob([new Uint8Array(arrayBuffer)], { type: 'audio/m4a' });
            console.log("Blob is ");
            console.log(blob);
            let uploadPath = 'content/' + this.firebase.user.uid + '/audio/' + this.contentName;
            var storageRef = firebase.storage().ref(uploadPath);
            console.log("Storage reference is " + storageRef);
            var uploadTask = storageRef.put(blob);
            console.log('Upload started:');
            uploadTask.on('state_changed', (snapshot) => {
              console.log("state changed");
              let percent = uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes * 100;
              console.log(percent + "% done");
            }, (e) => {
              console.error(e);
              observer.error(e);
            }, () => {
              var downloadURL = uploadTask.snapshot.downloadURL;
              console.log('Storage Download URL:' + downloadURL);
              observer.next(downloadURL);
            });
          };
          fileReader.onerror = (e: any) => {
            console.error(e);
            observer.error(e);
          };
          fileReader.readAsArrayBuffer(file);
        }, (e) => {
          console.error(e);
          observer.error(e);
        });
      }, (e) => {
        console.error(e);
        observer.error(e);
      });
    });
  }

  listenToRedoEvents() {
    console.log("Listening To Redo Events");
    this.events.subscribe('redoUpload', (contentType, contentName) => {
      console.log("Redo Upload triggered");
      this.contentType = contentType;
      console.log("Content type is " + this.contentType);
      console.log("Content name is " + this.contentName);
      this.resetUpload();
      this.loadMedia();
    });
  }

  resetUpload() {
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
}