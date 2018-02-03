import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase';

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

  statementForm: {
    title?: string,
    description?: string
  } = {};
  submitted = false;
  rawTime: any;
  uid: any;
  profile: any;
  statement: any;
  imageMethod: any;
  cameraOptions: any;
  sourceType: any;
  cropperInstance: any;
  image: any;
  imageURL: any;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private storage: Storage,
    private firebase: FirebaseProvider
  ) {
  }

  ionViewDidLoad() {
  }
}