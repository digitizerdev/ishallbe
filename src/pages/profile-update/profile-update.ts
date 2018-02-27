import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { ProfilePage } from '../profile/profile';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-profile-update',
  templateUrl: 'profile-update.html',
})
export class ProfileUpdatePage {

  user: any;
  photo: any;
  editProfileForm: {
    name?: string,
    bio?: string,
    instagram?: string,
    twitter?: string,
    linkedin?: string
  } = {};
  submitted = false;
  loaded = false;
  updatingProfilePhoto = false;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private firebase: FirebaseProvider
  ) {
  }

  ionViewDidLoad() {
    this.photo = this.navParams.get('photo');
    this.user = this.firebase.user;
    if (this.photo) this.user.photo = this.photo;
      this.loadProfileForm().subscribe(() => {
        this.loaded = true;
      })
  }


  loadProfileForm() {
    return Observable.create((observer: any) => {
      if (!this.user.social) {
        this.editProfileForm.instagram = "";
        this.editProfileForm.twitter = "";
        this.editProfileForm.linkedin = "";
      } else {
        this.editProfileForm.instagram = this.user.social.instagram;
        this.editProfileForm.twitter = this.user.social.twitter;
        this.editProfileForm.linkedin = this.user.social.linkedin;
      }
      this.editProfileForm.name = this.user.name;
      this.editProfileForm.bio = this.user.bio
      observer.next();
    });
  }

  submit(form) {
    this.submitted = true;
    this.editProfileForm = form;
    let loading = this.loadingCtrl.create({ content: 'Please Wait..' });
    loading.present();
    this.updateUser().then(() => {
        loading.dismiss();
        this.navCtrl.setRoot(ProfilePage);
      });
  }

  updateUser() {
      this.user.name = this.editProfileForm.name;
      this.user.social = {
        linkedin: this.editProfileForm.linkedin,
        twitter: this.editProfileForm.twitter,
        instagram: this.editProfileForm.instagram
      };
      this.user.bio = this.editProfileForm.bio;
      let path = "users/" + this.user.uid;
      return this.firebase.afs.doc(path).update(this.user);
  }

  updateProfilePhoto() {
    console.log("Update profile photo clicked");
    this.updatingProfilePhoto = true;
  }

  errorHandler(error) {
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: error.message,
      buttons: ['OK']
    });
    alert.present();
  }

}
