import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';

import Cropper from 'cropperjs';
import moment from 'moment';

import { ProfilePage } from '../profile/profile';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  @ViewChild('imageSrc') imageElement: ElementRef;

  rawTime: any;
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
  photo: any;
  loaded: any;
  imageMethod: any;
  cameraOptions: any;
  sourceType: any;
  cropperInstance: any;
  image: any;
  uploadingPhoto = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
    public camera: Camera,
    public storage: Storage,    
    public firebase: FirebaseProvider,
  ) {
  }

  ionViewDidLoad() {
    this.rawTime = moment().format('YYYYMMDDmmss');
    this.loadProfile();
  }

  loadProfile() {
    return this.requestUID().then((uid) => {
      this.uid = uid;
      return this.requestProfile().subscribe((profile) => {
        this.photo = profile.photo;
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

  askForImageRetrievalMethod() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            this.sourceType = this.camera.PictureSourceType.CAMERA;
            this.getPicture();
          }
        },
        {
          text: 'Library',
          handler: () => {
            this.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY
            this.getPicture();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("Cancel clicked");
          }
        }
      ]
    });
    actionSheet.present();
  }

  getPicture() {
    this.camera.getPicture(this.getCameraOptions()).then((image) => {
      this.imageElement.nativeElement.src = image;
    });
  }

  getCameraOptions() {
    let cameraOpts: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.sourceType,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: false,
      correctOrientation: true
    }
    return cameraOpts;
  }

  cropImage() {
    this.cropperInstance = new Cropper(this.imageElement.nativeElement, {
      aspectRatio: 3 / 3,
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

  uploadPhoto() {
    this.uploadingPhoto = true;
    let loading = this.loadingCtrl.create({  content: 'Please Wait..' });
    loading.present();
    this.cropImage();
    this.image = this.cropperInstance.getCroppedCanvas({ width: 500, height: 500 }).toDataURL('image/jpeg');
    let path = 'content/' + this.uid + '/images/' + this.rawTime;
    this.store(path, this.image).subscribe((snapshot) => {
      this.photo = snapshot.downloadURL;
      this.uploadingPhoto = false;
      loading.dismiss();
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

  submit(form) {
    this.submitted = true;
    this.editProfileForm = form;
    this.profile.email = form.email;
    let loading = this.loadingCtrl.create({  content: 'Please Wait..' });
    loading.present();
    this.requestProfileUpdate().then(() => {
      this.updateUserPosts().subscribe(() => {
        loading.dismiss();
        this.navCtrl.pop();
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
          post.face = this.photo;
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
  
}
