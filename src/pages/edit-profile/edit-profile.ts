import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';

import { PhotoPage } from '../photo/photo';
import { ProfilePage } from '../profile/profile';

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
  title = 'Profile';
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
    public storage: Storage,    
    public firebase: FirebaseProvider,
  ) {
  }

  ionViewDidLoad() {
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
      this.updateUserPosts();
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
    this.loader.present();
  }

  requestProfileUpdate() {
    if ( this.profile.instagram  || this.profile.twitter || this.profile.linkedIn ) {
      this.profile.social = true;
    } else this.profile.social = null;
    let path = '/users/' + this.uid;
    return this.firebase.object(path).update(this.profile)
  }

  updateUserPosts() {
    this.firebase.queriedList('/posts/', 'uid', this.uid).subscribe((posts) => {
      posts.forEach((post) => {
        post.face = this.profile.photo;
        post.name = this.profile.name;
        let path = '/posts/' + post.id;
        this.firebase.object(path).update(post);
      });
      this.confirmDelivery();
    });
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
    this.navCtrl.setRoot(ProfilePage);
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
