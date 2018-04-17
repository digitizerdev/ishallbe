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
  browser = false;

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
    if (this.platform.is('cordova')) this.browser = false;
      else this.browser = true;
    this.contentName = moment().unix().toString();
    this.loadMedia();
    this.listenToRedoEvents();
  }

  loadMedia() {
    console.log("Loading Media");
    console.log("Browser: " + this.browser);
    console.log("Content Type is " + this.contentType);
    switch (this.contentType) {
      case 'camera': {
        this.sourceType = this.camera.PictureSourceType.CAMERA;
        this.getImage();
      }
        break;
      case 'audio': {
        this.contentName = this.contentName + ".m4a";
        if (this.platform.is('ios')) this.getIOSAudio();
        if (this.platform.is('android')) this.getAndroidAudio();
      }
        break;
      case 'browser-image': {
        this.getBrowserImage();
      }
        break;
      default: {
        this.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
        this.getImage();
      }
    }
  }

  getImage() {
    this.gettingImage = true;
    this.camera.getPicture(this.getCameraOptions()).then((image) => {
      this.imageElement.nativeElement.src = image;
      if (this.contentType == "pin") this.cropPin();
      else this.cropImage();
    }).catch((error) => {
      this.events.publish("getImageCanceled");
    });;
  }

  getBrowserImage() {
    console.log("Getting Browser Image");
    let file = (<HTMLInputElement>document.getElementById("files")).files[0];
    var storageRef = firebase.storage().ref('test/' + file.name);
    var task = storageRef.put(file);
    task.on('state_changed',
      function progress(snapshot: any) {
        var percentage = (snapshot.bytesTransferred /
          snapshot.totalBytes) * 100;
        console.log(percentage);
        this.image = snapshot.downloadUrl;
      }, function error(err) {
        console.error(err);
      },
      function complete() {
        console.log("Complete!");
      }
    )
  }

  getCameraOptions() {
    let cameraOpts: CameraOptions = {
      quality: 100,
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
    this.cropperInstance = new Cropper(this.imageElement.nativeElement, {
      dragMode: 'move',
      modal: true,
      guides: true,
      highlight: false,
      background: false,
      autoCrop: false,
      autoCropArea: 0.9,
      responsive: true,
      zoomable: true,
      movable: false
    });
  }

  uploadImage() {
    this.loader = this.loadingCtrl.create({ spinner: 'bubbles', content: 'Loading..' });
    this.loader.present();
    this.image = this.cropperInstance.getCroppedCanvas({ width: 1000, height: 1000 }).toDataURL('image/jpeg');
    let uploadPath = 'content/' + this.firebase.user.uid + '/images/' + this.contentName;
    this.storeImage(uploadPath).subscribe((snapshot) => {
      let image = {
        url: snapshot.downloadURL,
        name: this.contentName
      }
      this.complete = true;
      this.uploaded.emit(image);
      this.loader.dismiss();
    });
  }

  uploadBrowserImage() {
    console.log("Uploading Browser Image");
    this.loader = this.loadingCtrl.create({ spinner: 'bubbles', content: 'Loading..' });
    this.loader.present();
    let uploadPath = 'content/' + this.firebase.user.uid + '/images/' + this.contentName;
    this.storeImage(uploadPath).subscribe((snapshot) => {
      let image = {
        url: snapshot.downloadURL,
        name: this.contentName
      }
      this.complete = true;
      this.uploaded.emit(image);
      this.loader.dismiss();
    });
  } 

  storeImage(path) {
    this.waitForStorageTimeout();
    return Observable.create((observer) => {
      let storagePath = firebase.storage().ref(path);
      return storagePath.putString(this.image, 'data_url', { contentType: 'image/jpeg' }).
        then(function (snapshot) {
          observer.next(snapshot);
        }).catch((error: any) => {
          observer.next(error);
        });
    });
  }

  getAndroidAudio() {
    this.recording = true;
    this.filepath = this.file.externalDataDirectory + this.contentName;
    const audio: MediaObject = this.media.create(this.filepath);
    this.audio = audio;
    this.audio.startRecord();
    window.setTimeout(() => {
      if (this.recording) this.uploadAudio();
    }, 10000);
  }

  getIOSAudio() {
    this.recording = true;
    this.filepath = this.file.tempDirectory.replace(/^file:\/\//, '') + this.contentName;
    this.file.createFile(this.file.tempDirectory, this.contentName, true).then(() => {
      const audio: MediaObject = this.media.create(this.filepath);
      this.audio = audio;
      this.audio.startRecord();
      window.setTimeout(() => {
        if (this.recording) this.uploadAudio();
      }, 10000);
    }, (error) => {
      this.events.publish("getAudioCanceled");
    });
  }

  uploadAudio() {
    this.recording = false;
    this.loader = this.loadingCtrl.create({ spinner: 'bubbles', content: 'Loading..' });
    this.loader.present();
    this.audio.stopRecord();
    this.storeAudio().subscribe((downloadURL) => {
      let audio = {
        url: downloadURL,
        name: this.contentName
      }
      this.audio.release();
      this.audio = null;
      this.contentName = null;
      this.recording = false;
      this.complete = true;
      this.uploaded.emit(audio);
      this.loader.dismiss();
    }, (error) => {
      this.complete = true;
      this.events.publish("getAudioCanceled");
      this.loader.dismiss();
    });
  }

  storeAudio() {
    return Observable.create((observer) => {
      this.waitForStorageTimeout();
      let filePath = "";
      if (this.platform.is('ios')) filePath = `${this.file.tempDirectory}` + this.contentName;
      else filePath = this.filepath;
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
    this.events.subscribe('redoUpload', (contentType, contentName) => {
      this.contentType = contentType;
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

  waitForStorageTimeout() {
    setTimeout(() => {
      if (!this.complete) {
        this.loader.dismiss();
        this.resetUpload();
        this.events.publish("timeout");
      }
    },
      7000);
  }
}