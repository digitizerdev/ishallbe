import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ActionSheetController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';

import { ProfilePage } from '../profile/profile';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  photo: any;
  submitted = false;
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
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
    public storage: Storage,    
    public firebase: FirebaseProvider,
  ) {
  }

  ionViewDidLoad() {
    this.photo = this.navParams.get('photo');
    this.loadProfile();
  }

  loadProfile() {
    return this.requestUID().then((uid) => {
      this.uid = uid;
      return this.requestProfile().subscribe((profile) => {
        this.profile = profile;
        if (this.photo) this.profile.photo = this.photo;
        this.loaded = true;
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
    this.editProfileForm = form;
    this.profile.email = form.email;
    let loading = this.loadingCtrl.create({ content: 'Please Wait..' });
    loading.present();
    this.requestProfileUpdate().then(() => {
      this.updateUserPosts().subscribe(() => {
        loading.dismiss();
        this.navCtrl.setRoot(ProfilePage);
      });
    }).catch((error) => { this.errorHandler(error) });      
  }

  requestProfileUpdate() {
    if ( this.profile.instagram  || this.profile.twitter || this.profile.linkedIn ) {
      this.profile.social = true;
    } else this.profile.social = null;
    let path = '/users/' + this.uid;
    return this.firebase.object(path).update(this.profile)
  }

  updateUserPosts() {
    return Observable.create((observer) => {
     return this.firebase.queriedList('/posts/', 'uid', this.uid).subscribe((posts) => {
        posts.forEach((post) => {
          post.face = this.profile.photo
          post.name = this.profile.name;
          let path = '/posts/' + post.id;
          this.firebase.object(path).update(post);
        });
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

  pushPhotoPage() {
  }

}