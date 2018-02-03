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

  }
}