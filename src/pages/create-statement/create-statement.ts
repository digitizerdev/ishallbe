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
  loader: any;
  imageMethod: any;
  cameraOptions: any;
  sourceType: any;
  cropperInstance: any;
  image: any;
  imageURL: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
    public camera: Camera,
    public storage: Storage,
    public firebase: FirebaseProvider
  ) {
  }

  ionViewDidLoad() {
    this.rawTime = moment().format('YYYYMMDDmmss');
    this.loadProfile();
    this.askForImageRetrievalMethod();
  }

  loadProfile() {
    this.requestUID().then((uid) => {
      this.uid = uid;
      this.requestProfile().subscribe((profile) => {
        this.profile = profile;
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
    return this.firebase.object(path)
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
            this.setRootHomePage();
          }
        }
      ]
    });

    actionSheet.present();
  }

  getPicture() {
    this.camera.getPicture(this.getCameraOptions()).then((image) => {
      this.imageElement.nativeElement.src = image;
      this.cropImage();
    }).catch((error) => {
      this.setRootHomePage();
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

  submit(statementForm) {
    if (!this.imageURL) {
      this.setRootHomePage();
    }
    this.submitted = true;
    this.startLoader();
    this.statementForm = statementForm;
    if (statementForm.valid) {
      return this.publish(statementForm).subscribe((token) => {
        this.addIDToPost(token).then(() => {
          this.loader.dismiss();
           this.setRootHomePage();         
        });
      });
    }
  }

  startLoader() {
    this.loader = this.loadingCtrl.create({
      content: 'Please Wait..'
    });
    this.loader.present();
  }
  
  publish(statementForm) {
    return Observable.create((observer) => {
      return this.uploadPhoto().subscribe(() => {
        return this.buildStatement().subscribe(() => {
          return this.firebase.list('posts').push(this.statement).then((token) => {
            observer.next(token);
          });
        });
      })
    });
  }

  uploadPhoto() {
    return Observable.create((observer) => {
      this.image = this.cropperInstance
        .getCroppedCanvas({ width: 500, height: 500 }).toDataURL('image/jpeg');
      let path = 'content/' + this.uid + '/images/' + this.rawTime;
      return this.store(path, this.image).subscribe((snapshot) => {
        this.imageURL = snapshot.downloadURL;
        observer.next();
      });
    });
  }

  buildStatement() {
    return Observable.create((observer) => {
      let time = moment().format('MMMM D h:mma')
      let date = moment().format('YYYYMMDD');
      let day = moment().format('dddd');
      this.statement = {
        commentCount: 0,
        content: this.statementForm.description,
        date: date,
        face: this.profile.photo,
        flagged: false,
        image: true,
        likeCount: 0,
        liked: false,
        name: this.profile.name,
        onFeed: true,
        postType: 'image',
        rawTime: this.rawTime,
        time: time,
        title: this.statementForm.title,
        uid: this.uid,
        url: this.imageURL
      }
      observer.next();
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

  addIDToPost(token) {
    let path = 'posts/' + token.key;
    let post = {
      id: token.key
    }
    return this.firebase.object(path).update(post)
  }

  setRootHomePage() {
    this.navCtrl.setRoot(HomePage);
  }

}
