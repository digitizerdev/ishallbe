import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';

import { PhotoPage } from '../photo/photo';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  submitted = false;
  loader: any;
  profile: any;
  uid: any;
  title = 'Edit Profile';
  editProfileForm: {
    name?: string,
    bio?: string,
    instagram?: string,
    twitter?: string,
    linkedin?: string
  } = {};
  loaded: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public firebase: FirebaseProvider,
    public storage: Storage    
  ) {
  }

  ionViewDidEnter() {
    this.loadProfile();
  }

  loadProfile() {
    return this.requestUID().then((uid) => {
      this.uid = uid;
      return this.requestProfile().subscribe((profile) => {
        this.loaded = true;
        this.profile = profile;
        this.editProfileForm = profile;
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
    return this.firebase.object(path);
  }

  submit(form) {
    this.submitted = true;
    this.prepareRequest(form)
    this.requestProfileUpdate().then(() => {
      this.confirmDelivery();
    }).catch((error) => {
      this.errorHandler(error);
    });      
  }

  prepareRequest(form) {
    this.buildData(form);
    this.startLoader();
  }

  buildData(form) {
    this.editProfileForm = form;
    this.profile.email = form.email;
  }

  startLoader() {
    this.loader = this.loadingCtrl.create({
      content: 'Please Wait..'
    });
  }

  requestProfileUpdate() {
    let path = '/users/' + this.uid;
    return this.firebase.object(path).update(this.profile)
  }

  confirmDelivery() {
    this.endLoader();
    this.presentConfirmationAlert();
    this.popToProfilePage();
  }

  endLoader() {
    this.loader.dismiss();
  }

  presentConfirmationAlert() {
    let alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: 'Your profile has been updated',
      buttons: ['OK']
    });
  }

  popToProfilePage() {
    this.navCtrl.pop();
  }

  errorHandler(error) {
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: error.message,
      buttons: ['OK']
    });
    alert.present();
  }

  pushPhotoPage() {
    this.navCtrl.push(PhotoPage);
  }
}
