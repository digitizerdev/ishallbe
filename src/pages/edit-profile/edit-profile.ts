import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';

import { ProfilePage } from '../profile/profile';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

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
    this.loadUser().subscribe((user) => {
      this.user = user;
      if (this.photo) this.user.photo = this.photo;
      this.loadProfileForm().subscribe(() => {
        this.loaded = true;
      })
    });
  }

  loadUser() {
    return Observable.create((observer: any) => {
      let user = this.firebase.loadUser();
      user.valueChanges().subscribe((user) => {
        observer.next(user);
      });
    });
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
      this.updateUserCollaborations().subscribe(() => {
        loading.dismiss();
        this.navCtrl.setRoot(ProfilePage);
      });
    }).catch((error) => { this.errorHandler(error) });
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

  updateUserCollaborations() {
    return Observable.create((observer) => {
      let path = 'users/' + this.user.uid + "/collaborations";
      let userCollaborations = this.firebase.afs.collection(path);
      let count = 0;
      userCollaborations.valueChanges().subscribe((myCollaborations) => {
        if (myCollaborations.length > 0) {
          myCollaborations.forEach((collaboration) => {
            return this.updateCollaborator(collaboration).subscribe(() => {
              count++;
              if (count == myCollaborations.length) observer.next();
            });
          });
        } else observer.next();
      });
    });
  }

  updateCollaborator(collaboration) {
    return Observable.create((observer) => {
      let collaborator = {
        name: this.user.name,
        photo: this.user.photo,
      }
      let path = "collaborations/" + collaboration.collaborationId + "/collaborators/" + this.user.uid;
      return this.firebase.afs.doc(path).update(collaborator).then(() => {
        observer.next();
      });
    });
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
