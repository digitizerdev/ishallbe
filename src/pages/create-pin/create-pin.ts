import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ActionSheetController, Platform } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import Cropper from 'cropperjs';
import moment from 'moment';
import firebase from 'firebase';

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
    content?: string,
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
  pin: any;
  short = false;

  constructor(
    private platform: Platform,
    private navCtrl: NavController,
    private navParams: NavParams,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
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
    if (this.dayOfWeek == 'Monday') {
      this.getPicture();
      this.monday = true
    } else { if (this.dayOfWeek == 'Tuesday') this.tuesday = true }
  }

  timeStampPage() {
    console.log("Day is " + this.selectedDay);
    this.dayOfWeek = moment(this.selectedDay).format('dddd');
    console.log("Day of week is " + this.dayOfWeek);
    this.displayTime = moment(this.selectedDay).format('ll');
    console.log("Display time is " + this.displayTime);
    this.date = moment(this.selectedDay).format('l');
    console.log("This date is " + this.date);
    this.rawTime = moment().format('YYYYMMDDmmss');
    console.log("Raw time is " + this.rawTime);
  }

  setPinTitle() {
    if (this.dayOfWeek == 'Monday') this.formTitle = "Motivational Monday"
    if (this.dayOfWeek == 'Tuesday') this.formTitle = "Tuesday's Tune of the Day"
    if (this.dayOfWeek == 'Wednesday') this.formTitle = "Wise Words Wednesday";
    if (this.dayOfWeek == 'Thursday') this.formTitle = "Treat Yourself Thursday";
    if (this.dayOfWeek == 'Friday') this.formTitle = "Faith Over Fear Friday";
    if (this.dayOfWeek == 'Saturday') this.formTitle = "Happy Saturday!";
    let form = { title: this.formTitle, content: "", url: "", youtubeEmbedLink: "" }
    this.pinForm = form;
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

  getPicture() {
    this.camera.getPicture(this.getCameraOptions()).then((image) => {
      this.imageElement.nativeElement.src = image;
      this.cropImage();
    }).catch((error) => {
      console.log("Error getting picture");
      console.log(error);
      if (this.platform.is('cordova')) {
        console.log("This is not a cordova platform")
        this.navCtrl.setRoot(PinsManagerPage);
      }
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
      aspectRatio: 3 / 2,
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
    this.pinForm = pinForm;
    if (this.monday && (!pinForm.title || !pinForm.youtubeEmbedLink)) {
      this.errorHandler();
    } else {
      if (this.tuesday && (!pinForm.title || !pinForm.content || !pinForm.url)) {
        this.errorHandler();
      } else {
        if (!pinForm.title || !pinForm.content) {
          this.errorHandler();
        } else this.forkDayToCreatePin();
      }
    }
  }

  forkDayToCreatePin() {
    if (this.monday) { this.createMondayPin() } else {
      if (this.tuesday) { this.createTuesdayPin() } else {
        this.createOtherPin();
      }
    }
  }

  createMondayPin() {
    let loading = this.loadingCtrl.create({ content: 'Please Wait..' });
    loading.present();
    this.uploadPhoto().subscribe(() => {
      this.buildMondayPin().subscribe(() => {
        console.log("This pin is " );
        console.log(this.pin);
        this.firebase.list('pins').push(this.pin).then((token) => {
          this.addIDToPin(token).then(() => {
            loading.dismiss();
            this.navCtrl.setRoot(PinsManagerPage);
          });
        })
      });
    });
  }

  uploadPhoto() {
    return Observable.create((observer) => {
      this.image = this.cropperInstance
        .getCroppedCanvas({ width: 480, height: 320 }).toDataURL('image/jpeg');
      let path = 'content/' + this.uid + '/images/' + this.rawTime;
      return this.store(path, this.image).subscribe((snapshot) => {
        this.imageURL = snapshot.downloadURL;
        observer.next();
      });
    });
  }

  store(path, obj) {
    return Observable.create((observer) => {
      let myPath = firebase.storage().ref(path);
      return myPath.putString(obj, 'data_url', { contentType: 'image/jpeg' }).
        then(function (snapshot) {
          observer.next(snapshot);
        }).catch((error: any) => {
          observer.next(error);
        });
    });
  }

  buildMondayPin() {
    return Observable.create((observer) => {
      this.pin = {
        commentCount: 0,
        date: this.date,
        day: this.day,
        displayTime: this.displayTime,
        monday: true,
        face: this.profile.photo,
        image: true,
        video: true,
        likeCount: 0,
        liked: false,
        name: this.profile.name,
        rawTime: this.rawTime,
        title: this.pinForm.title,
        uid: this.uid,
        url: this.imageURL,
        youtubeEmbedLink: this.pinForm.youtubeEmbedLink,
        startTime: this.selectedDay,
        endTime: this.selectedDay,
        allDay: true
      }
      observer.next();
    });
  }

  createTuesdayPin() {
    let loading = this.loadingCtrl.create({ content: 'Please Wait..' });
    loading.present();
    this.buildTuesdayPin().subscribe(() => {
      console.log("This pin is " );
      console.log(this.pin);
      this.firebase.list('pins').push(this.pin).then((token) => {
        this.addIDToPin(token).then(() => {
          loading.dismiss();
          this.navCtrl.setRoot(PinsManagerPage);
        });
      })
    });
  }

  buildTuesdayPin() {
    if (this.pinForm.content.length < 150 ) this.short = true;
    return Observable.create((observer) => {
      this.pin = {
        short: this.short,
        commentCount: 0,
        content: this.pinForm.content,
        date: this.date,
        day: this.day,
        displayTime: this.displayTime,
        tuesday: true,
        face: this.profile.photo,
        text: true,
        likeCount: 0,
        liked: false,
        name: this.profile.name,
        rawTime: this.rawTime,
        title: this.pinForm.title,
        uid: this.uid,
        url: this.pinForm.url,
        startTime: this.selectedDay,
        endTime: this.selectedDay,
        allDay: true
      }
      observer.next();
    });
  }

  createOtherPin() {
    let loading = this.loadingCtrl.create({ content: 'Please Wait..' });
    loading.present();
    this.buildOtherPin().subscribe(() => {
      console.log("This pin is " );
      console.log(this.pin);
      this.firebase.list('pins').push(this.pin).then((token) => {
        this.addIDToPin(token).then(() => {
          loading.dismiss();
          this.navCtrl.setRoot(PinsManagerPage);
        });
      })
    });
  }

  buildOtherPin() {
    if (this.pinForm.content.length < 150 ) this.short = true;
    return Observable.create((observer) => {
      this.pin = {
        short: this.short,
        commentCount: 0,
        content: this.pinForm.content,
        date: this.date,
        day: this.day,
        displayTime: this.displayTime,
        face: this.profile.photo,
        text: true,
        likeCount: 0,
        liked: false,
        name: this.profile.name,
        rawTime: this.rawTime,
        title: this.pinForm.title,
        uid: this.uid,
        startTime: this.selectedDay,
        endTime: this.selectedDay,
        allDay: true
      }
      observer.next();
    });
  }

  addIDToPin(token) {
    let path = 'pins/' + token.key;
    let post = {
      id: token.key
    }
    return this.firebase.object(path).update(post)
  }

  errorHandler() {
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: "Please fill out all fields",
      buttons: ['OK']
    });
    alert.present();
  }
}
