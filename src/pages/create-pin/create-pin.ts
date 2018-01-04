import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import Cropper from 'cropperjs';
import moment from 'moment';

import { PinsManagerPage } from '../pins-manager/pins-manager';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-create-pin',
  templateUrl: 'create-pin.html',
})
export class CreatePinPage {
  @ViewChild('imageSrc') imageElement: ElementRef;

  uid: any;
  profile: any;
  pinForm: {
    title?: string,
    description?: string,
    url?: string
  } = {};
  monday = false;
  url = false;
  submitted = false;
  rawTime: any;
  day: any;
  date: any;
  dayOfWeek: any;
  daySelected = false;
  loader: any;
  imageMethod: any;
  cameraOptions: any;
  cropperInstance: any;
  image: any;
  imageURL: any;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private actionSheetCtrl: ActionSheetController,
    private loadingCtrl: LoadingController,
    private camera: Camera,
    private storage: Storage,
    private firebase: FirebaseProvider
  ) {
  }

  ionViewDidLoad() {
    this.timeStampPage();
    this.loadProfile();
    this.askForDayOfWeek();
  }

  timeStampPage() {
    let rawTimeString = moment().format('YYYYMMDDmmss');
    this.rawTime = parseInt(rawTimeString);
    this.day = moment().format('dddd');
    let dateString = moment().format('YYYYMMDD');
    this.date = parseInt(dateString);
  }

  loadProfile() {
    this.requestUID().then((uid) => {
      this.uid = uid;
      this.requestProfile().subscribe((profile) => {
        this.profile = profile;
      });
    });
  }

  requestUID() {
    return this.storage.ready().then(() => {
      return this.storage.get(('uid'));
    });
  }

  requestProfile() {
    let path = '/users/' + this.uid;
    return this.firebase.object(path)
  }

  askForDayOfWeek() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Monday',
          handler: () => {
            this.monday = true;
            this.url = true;
            this.dayOfWeek = 'Monday';
            this.daySelected = true;
            this.createImagePin();
          }
        },
        {
          text: 'Tuesday',
          handler: () => {
            this.url = true;
            this.dayOfWeek = 'Tuesday'
            this.daySelected = true;
            this.createMusicPin();
          }
        },
        {
          text: 'Wednesday',
          handler: () => {
            this.dayOfWeek = 'Wednesday'
            this.daySelected = true;
            this.createTextPin();
          }
        },
        {
          text: 'Thursday',
          handler: () => {
            this.dayOfWeek = 'Thursday'
            this.daySelected = true;
            this.createTextPin();
          }
        },
        {
          text: 'Friday',
          handler: () => {
            this.dayOfWeek = 'Friday'
            this.daySelected = true;
            this.createTextPin();
          }
        },
        {
          text: 'Saturday',
          handler: () => {
            this.dayOfWeek = 'Saturday'
            this.daySelected = true;
            this.createTextPin();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    actionSheet.present();
  }

  findNextSelectedDay() {
    console.log("Finding next selected day");
    console.log("The current date is " + this.date);
    for (let x = 1; x++; x < 8) {
      let day = moment().add(x, 'days').calendar();
      console.log("Next day is " + day);
      if (day == this.dayOfWeek) {
        console.log("Found next " + this.dayOfWeek);
      }
    }
  }

  createImagePin() {
    console.log("Creating image pin");
    console.log("Day is " + this.dayOfWeek);
    this.findNextSelectedDay();
  }

  createMusicPin() {
    console.log("Creating music pin");
    console.log("Day is " + this.dayOfWeek);
    this.findNextSelectedDay();
  }

  createTextPin() {
    console.log("Creating text pin");
    console.log("Day is " + this.dayOfWeek);
    this.findNextSelectedDay();
  }

  getPicture() {
    this.camera.getPicture(this.getCameraOptions()).then((image) => {
      this.imageElement.nativeElement.src = image;
      this.cropImage();
    }).catch((error) => {
      this.navCtrl.setRoot(PinsManagerPage);
    });
  }

  getCameraOptions() {
    let cameraOpts: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
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

  submit(pinForm) {
    this.submitted = true;
    if (pinForm.valid) {

    }
  }
}
