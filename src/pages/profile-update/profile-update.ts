import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ActionSheetController } from 'ionic-angular';
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
  profileForm: {
    name?: string,
    bio?: string,
    instagram?: string,
    twitter?: string,
    linkedin?: string
  } = {};
  submitted = false;
  loaded = false;
  updatingProfilePhoto = false;
  imageRetrievalMethod = "default";

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
        console.log("Edit profile form is");
        console.log(this.profileForm);
      });
    })
  }


  loadProfileForm() {
    return Observable.create((observer: any) => {
      this.profileForm.linkedin = this.user.social.linkedin;
      this.profileForm.instagram = this.user.social.instagram;
      this.profileForm.twitter = this.user.social.twitter;
      this.profileForm.name = this.user.name;
      this.profileForm.bio = this.user.bio
      observer.next();
    });
  }

  populateEmptySocialFields() {
    return Observable.create((observer: any) => {
      if (!this.profileForm.linkedin) this.profileForm.linkedin = "https://linkedin.com/in/";
      else this.profileForm.linkedin = this.user.social.linkedin;
      if (!this.profileForm.instagram) this.profileForm.instagram = "https://instagram.com/";
      else this.profileForm.instagram = this.user.social.instagram;
      if (!this.profileForm.twitter) this.profileForm.twitter = "https://twitter.com/";
      else this.profileForm.twitter = this.user.social.twitter;
      observer.next();
    });
  }

  submit() {
    let loading = this.loadingCtrl.create({ content: 'Please Wait..' });
    loading.present();
    this.submitted = true;
    this.clearEmptySocialFields().subscribe(() => {
      this.loadProfile().subscribe(() => {
        this.updateUser().then(() => {
          loading.dismiss();
          this.navCtrl.setRoot(ProfilePage);
        });
      });
    });
  }

  loadProfile() {
    return Observable.create((observer: any) => {
      console.log("Loading form");
      console.log(this.profileForm);
      this.user.name = this.profileForm.name;
      this.user.social = {
        linkedin: this.profileForm.linkedin,
        twitter: this.profileForm.twitter,
        instagram: this.profileForm.instagram
      };
      this.user.bio = this.profileForm.bio;
      observer.next();
    });
  }

  clearEmptySocialFields() {
    return Observable.create((observer: any) => {
      if (this.profileForm.linkedin == "https://linkedin.com/in/") this.profileForm.linkedin = "";
      if (this.profileForm.instagram == "https://instagram.com/") this.profileForm.instagram = "";
      if (this.profileForm.twitter == "https://twitter.com/") this.profileForm.twitter = "";
      observer.next();
    });
  }

  updateUser() {
    let path = "users/" + this.user.uid;
    return this.firebase.afs.doc(path).update(this.user);
  }

  updateProfilePhoto() {
    console.log("Update profile photo clicked");
    this.askForImageRetrievalMethod();
  }

  askForImageRetrievalMethod() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            console.log("Chose Camera");
            this.imageRetrievalMethod = "camera";
            this.updatingProfilePhoto = true;
          }
        },
        {
          text: 'Library',
          handler: () => {
            console.log("Chose Library");
            this.imageRetrievalMethod = "library";
            this.updatingProfilePhoto = true;
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("Canceled asking for image retrieval method");
          }
        }
      ]
    });
    actionSheet.present();
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
