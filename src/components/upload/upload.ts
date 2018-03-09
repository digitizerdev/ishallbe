import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';

import { LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';

import { Observable } from 'rxjs/Observable';

import firebase from 'firebase';
import { FirebaseProvider } from '../../providers/firebase/firebase';

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
  audioName: string;
  contentBlob: any;
  gettingImage = false;
  imageCropped = false;
  recording = false;

  constructor(
    private loadingCtrl: LoadingController,
    private camera: Camera,
    private media: Media,
    private file: File,
    private firebase: FirebaseProvider
  ) {
    console.log("Hello Upload Component");
  }

  ngOnInit() {
    console.log("Content type is " + this.contentType);
    this.audioName = moment().format('YYYYMMDDhhmmss');
    this.audioName = this.audioName + ".m4a";
    console.log("Audio name is " + this.audioName);
    if (this.contentType == "audio") this.getAudio();
    else this.getImage();
  }

  getImage() {
    this.gettingImage= true;
    if (this.contentType == "camera") this.sourceType = this.camera.PictureSourceType.CAMERA;
    if (this.contentType == "library") this.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
    this.camera.getPicture(this.getCameraOptions()).then((image) => {
      this.imageElement.nativeElement.src = image;
      this.cropImage();
    }).catch((error) => { 
      console.error(error)
      this.uploaded.emit("canceled");
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
    let loading = this.loadingCtrl.create({ content: 'Please Wait..' });
    loading.present();
    this.image = this.cropperInstance.getCroppedCanvas({ width: 1000, height: 1000 }).toDataURL('image/jpeg');
    let uploadPath = 'content/' + this.firebase.user.uid + '/images/profile/';
    console.log("Upload path is " + uploadPath);
    this.storeImage(uploadPath, this.image).subscribe((snapshot) => {
      console.log("Finished storing media");
      console.log(snapshot);
      let content = snapshot.downloadURL;
      this.uploaded.emit(content);
      loading.dismiss();
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
    console.log("Started Recording");
    this.recording = true;
    this.file.createFile(this.file.tempDirectory, this.audioName, true).then(() => {
      const audio: MediaObject = this.media.create(this.file.tempDirectory.replace(/^file:\/\//, '') + this.audioName);
      console.log("Audio assigned to constant audio media object");
      console.log(audio);
      this.audio = audio;
      console.log("Audio assigned to this.audio media object");
      console.log(this.audio);
      this.audio.startRecord();
      window.setTimeout(() => {
        if (this.recording) this.uploadAudio();
      }, 10000);
    });
  }

  uploadAudio() {
    console.log("Uploading record");
    this.recording = false;
    let loading = this.loadingCtrl.create({ content: 'Please Wait..' });
    loading.present();
    this.audio.stopRecord();
    this.storeAudio().subscribe((downloadURL) => {
      console.log("Finished storing record");
      console.log("Download URL is " + downloadURL);
      let audio = {
        url: downloadURL,
        name: this.audioName
      }
      this.uploaded.emit(audio);
      loading.dismiss();

    });
  }

  storeAudio() {
    return Observable.create((observer) => {
      console.log('Saving record');
      const filePath = `${this.file.tempDirectory}{audioName}`;
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
            var storageRef = firebase.storage().ref('content/' + this.firebase.user.uid + this.audioName);
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
}