import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Observable } from 'rxjs/Observable';

import Cropper from 'cropperjs';
import moment from 'moment';

import { HomePage } from '../home/home';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-create-statement',
  templateUrl: 'create-statement.html',
})
export class CreateStatementPage {
  @ViewChild('imageSrc') imageElement: ElementRef;

  imageMethod: any;
  cameraOptions: any;
  sourceType: any;
  cropperInstance: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public camera: Camera,
    public firebase: FirebaseProvider
  ) {
  }

  ionViewDidLoad() {
    this.imageMethod = this.navParams.get('imageMethod');
    if (this.imageMethod = 'capture') { this.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY }
    else { this.sourceType = this.camera.PictureSourceType.CAMERA }
    this.camera.getPicture(this.getCameraOptions()).then((image) => {
      console.log("Got image")
      console.log(image);
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

}
