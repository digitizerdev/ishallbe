import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, LoadingController, AlertController, ActionSheetController } from 'ionic-angular';

import { ProfilePage } from '../profile/profile';

import { FirebaseProvider } from '../../providers/firebase/firebase';

import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-profile-update',
  templateUrl: 'profile-update.html',
})
export class ProfileUpdatePage {

  user: any;
  photo: any;
  profileForm: {
    name?: string,
    bio?: string,
    instagram?: string,
    twitter?: string,
    linkedin?: string
  } = {};
  imageRetrievalMethod: string;
  submitted = false;
  loaded = false;
  updatingProfilePhoto = false;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController,
    private firebase: FirebaseProvider
  ) {
  }

  ionViewDidLoad() {
    this.photo = this.navParams.get('photo');
    this.user = this.firebase.user;
    if (this.photo) this.user.photo = this.photo;
    this.loadProfileForm().subscribe(() => {
      this.populateEmptySocialFields().subscribe(() => {
        this.loaded = true;
      });
    })
  }

  loadProfileForm() {
    return Observable.create((observer: any) => {
      this.profileForm.linkedin = this.user.linkedin;
      this.profileForm.instagram = this.user.instagram;
      this.profileForm.twitter = this.user.twitter;
      this.profileForm.name = this.user.name;
      this.profileForm.bio = this.user.bio
      observer.next();
    });
  }

  populateEmptySocialFields() {
    return Observable.create((observer: any) => {
      if (!this.profileForm.linkedin) this.profileForm.linkedin = "linkedin.com/in/";
      else this.profileForm.linkedin = this.user.linkedin;
      if (!this.profileForm.instagram) this.profileForm.instagram = "instagram.com/";
      else this.profileForm.instagram = this.user.instagram;
      if (!this.profileForm.twitter) this.profileForm.twitter = "twitter.com/";
      else this.profileForm.twitter = this.user.twitter;
      observer.next();
    });
  }

  submit() {
    let loading = this.loadingCtrl.create({ 
      spinner: 'bubbles',
      content: 'Loading...' });
    loading.present();
    this.submitted = true;
    this.loadProfile();
    this.updateUser().then(() => {
      loading.dismiss();
      this.navCtrl.setRoot(ProfilePage);
    });
  }

  loadProfile() {
    if (this.profileForm.linkedin == "linkedin.com/in/") this.user.linkedin = "";
    else this.user.linkedin = this.profileForm.linkedin;
    if (this.profileForm.instagram == "instagram.com/") this.user.instagram = "";
    else this.user.instagram = this.profileForm.instagram;
    if (this.profileForm.twitter == "twitter.com/") this.user.twitter = "";
    else this.user.twitter = this.profileForm.twitter;
    this.user.name = this.profileForm.name;
    this.user.bio = this.profileForm.bio;
  }

  updateUser() {
    let path = "users/" + this.user.uid;
    return this.firebase.afs.doc(path).update(this.user);
  }

  updateProfilePhoto() {
    this.askForImageRetrievalMethod();
  }

  askForImageRetrievalMethod() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            this.imageRetrievalMethod = "camera";
            this.updatingProfilePhoto = true;
          }
        },
        {
          text: 'Library',
          handler: () => {
            this.imageRetrievalMethod = "library";
            this.updatingProfilePhoto = true;
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }

  setProfilePhoto(content) {
    if (content == "canceled") {
      this.updatingProfilePhoto = false;
    } else {
      let loading = this.loadingCtrl.create({ 
        spinner: 'bubbles',
        content: 'Loading...' });
      loading.present();   
      this.user.photo = content.url;
      this.updateUser().then(() => {
        loading.dismiss();
        this.updatingProfilePhoto = false;
      });
    }
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
