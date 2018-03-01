import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';

import { LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
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

  constructor(
    private loadingCtrl: LoadingController,
    private camera: Camera,
    private file: File,
    private firebase: FirebaseProvider
  ) {
    console.log("Hello Upload Component");
  }

  ngAfterViewInit() {
    console.log("Content type is " + this.contentType);
    this.setSourceType();
    this.getPicture();
  }

  setSourceType() {
    if (this.contentType == "camera") this.sourceType = this.camera.PictureSourceType.CAMERA;
    if (this.contentType == "library") this.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
  }

  getPicture() {
    this.camera.getPicture(this.getCameraOptions()).then((image) => {
      this.imageElement.nativeElement.src = image;
      this.cropImage();
    });
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

  upload() {
    let loading = this.loadingCtrl.create({ content: 'Please Wait..' });
    loading.present();
    this.image = this.cropperInstance.getCroppedCanvas({ width: 1000, height: 1000 }).toDataURL('image/jpeg');
    let uploadPath = 'content/' + this.firebase.user.uid + '/images/profile/';
    console.log("Upload path is " + uploadPath);
    this.store(uploadPath, this.image).subscribe((snapshot) => {
      console.log("Finished storing media");
      console.log(snapshot);
      let content = snapshot.downloadURL;
      this.uploaded.emit(content);
      loading.dismiss();
    });
  }

  store(path, obj) {
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
}

