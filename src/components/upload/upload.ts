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
  }

  ngOnInit() {
    this.contentName = moment().format('YYYYMMDDhhmmss');
    this.loadMedia();
    this.listenToRedoEvents();
  }

  loadMedia() {
    switch (this.contentType) {
      case 'camera': {
        this.sourceType = this.camera.PictureSourceType.CAMERA;
        this.getImage();
      }
      break;
      case 'audio': {
        this.contentName = this.contentName + ".m4a";
        this.getAudio();
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
    this.catchUploadTimeout();
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
      autoCrop: true,
      autoCropArea: 0.9,
      responsive: true,
      zoomable: true,
      movable: false
    });
  }

  uploadImage() {
    this.loader = this.loadingCtrl.create({ spinner: 'bubbles', content: 'Please Wait..' });
    this.loader.present();
    this.image = this.cropperInstance.getCroppedCanvas({ width: 1000, height: 1000 }).toDataURL('image/jpeg');
    let uploadPath = 'content/' + this.firebase.user.uid + '/images/' + this.contentName;
    this.storeImage(uploadPath, this.image).subscribe((snapshot) => {
      let image = {
        url: snapshot.downloadURL,
        name: this.contentName
      }
      this.uploaded.emit(image);
      this.loader.dismiss();
    });
  }

  storeImage(path, obj) {
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
    this.recording = true;
    this.file.createFile(this.file.tempDirectory, this.contentName, true).then(() => {
      const audio: MediaObject = this.media.create(this.file.tempDirectory.replace(/^file:\/\//, '') + this.contentName);
      this.audio = audio;
      this.audio.startRecord();
      window.setTimeout(() => {
        if (this.recording) this.uploadAudio();
      }, 10000);
    }, (error) => {
      this.events.publish("getAudioCanceled");
      this.loader.dismiss();
    });
    this.catchUploadTimeout();
  }

  uploadAudio() {
    this.recording = false;
    this.loader = this.loadingCtrl.create({ spinner: 'bubbles', content: 'Please Wait..' });
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
      this.uploaded.emit(audio);
      this.loader.dismiss();
    }, (error) => {
      this.events.publish("getAudioCanceled");
      this.loader.dismiss();
    });
  }

  storeAudio() {
    return Observable.create((observer) => {
      const filePath = `${this.file.tempDirectory}` + this.contentName;
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

  catchUploadTimeout() {
    setTimeout(() => {
      this.loader.dismiss();
      this.resetUpload();
      this.events.publish("timeout");
    },
    5000);
  }
}