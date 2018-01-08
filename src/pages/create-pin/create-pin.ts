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

  title: string;
  uid: any;
  profile: any;
  pinForm: {
    title?: string,
    description?: string,
    url?: string,
    youtubeEmbedLink?: string
  } = {};
  monday = false;
  tuesday: any;
  submitted = false;
  rawTime: any;
  day: any;
  date: any;
  dayOfWeek: any;
  displayTime: any;
  imageMethod: any;
  cameraOptions: any;
  cropperInstance: any;
  image: any;
  imageURL: any;
  selectedDay: any;
  formTitle: any;

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
    this.loadProfile();
    this.selectedDay = this.navParams.get('selectedDay');
    this.timeStampPage();
    this.setPinTitle();
    if (this.dayOfWeek == 'Monday') { this.createVideoPin() } else {
      if (this.dayOfWeek == 'Tuesday') { this.createMusicPin() } else {
        this.createTextPin();
      } 
    }
  }

  timeStampPage() {
    console.log("Day is " + this.selectedDay);
    this.dayOfWeek = moment(this.selectedDay).format('dddd');
    console.log("Day of week is " + this.dayOfWeek);
    this.displayTime = moment(this.selectedDay).format('MMM d YYYY');
    console.log("Display time is " + this.displayTime);
    this.date = moment(this.selectedDay).format('YYYYMMDD');
    console.log("This date is " + this.date);
  }

  setPinTitle() {
    if (this.dayOfWeek == 'Monday') {
      this.formTitle = "Motivational Monday";
      this.monday = true }
    if (this.dayOfWeek == 'Tuesday') {
      this.formTitle = "Tuesday's Tune of the Day" 
      this.tuesday = true; }
    if (this.dayOfWeek == 'Wednesday') this.formTitle = "Wise Words Wednesday";
    if (this.dayOfWeek == 'Thursday') this.formTitle = "Treat Yourself Thursday";
    if (this.dayOfWeek == 'Friday') this.formTitle = "Faith Over Fear Friday";
    if (this.dayOfWeek == 'Saturday') this.formTitle = "Happy Saturday!";
    let form = {
      title: this.formTitle,
      content: "",
      url: "",
      youtubeEmbedLink: ""
    }
    this.pinForm = form;
    console.log("Pin form title is " + this.formTitle);
    console.log("Updated pin form is " );
    console.log(this.pinForm);
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


  createVideoPin() {
    console.log("Creating video pin");
    console.log("Day is " + this.dayOfWeek);
  }

  createMusicPin() {
    console.log("Creating music pin");
    console.log("Day is " + this.dayOfWeek);
  }

  createTextPin() {
    console.log("Creating text pin");
    console.log("Day is " + this.dayOfWeek);
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
