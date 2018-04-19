import { Component } from '@angular/core';

import { IonicPage, NavController, AlertController, LoadingController, Events, ActionSheetController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import moment from 'moment';

import { HomePage } from '../home/home';

import { FirebaseProvider } from '../../providers/firebase/firebase';

import { Statement } from '../../../test-data/statements/model';

@IonicPage()
@Component({
  selector: 'page-statement-creator',
  templateUrl: 'statement-creator.html',
})
export class StatementCreatorPage {
  
  createStatementForm: {
    title?: string;
    description?: string,
  } = {};
  statementImageUrl = "";
  statementName = "";
  statementId: string;
  imageRetrievalMethod: string;
  timestamp: number;
  displayTimestamp: string;
  postDate: number;
  displayPostDate: string;
  submitted = false;
  loadingImage = false;
  imageReady = false;
  private = false;
  
  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private events: Events,
    private loadingCtrl: LoadingController,
    private actionSheetCtrl: ActionSheetController,
    private firebase: FirebaseProvider
  ) {
  }

  ionViewDidLoad() {
    this.timestampPage();
    this.listenForCanceledUpload();
  }

  timestampPage() {
    this.postDate = parseInt(moment().format("YYYYMMDD"));
    this.displayPostDate = moment().format('MMM DD YYYY');
    this.timestamp = moment().unix();
    this.displayTimestamp = moment().format('L');
  }

  loadImage() {
    this.askForImageRetrievalMethod();
  }

  askForImageRetrievalMethod() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            if (this.imageReady) this.redoImageLoad();
            this.imageRetrievalMethod = "camera";
            this.loadingImage = true;
          }
        },
        {
          text: 'Library',
          handler: () => {
            if (this.imageReady) this.redoImageLoad();
            this.imageRetrievalMethod = "library";
            this.loadingImage = true;
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

  setImage(image) {
    this.statementImageUrl = image.url;
    this.statementName = image.name;
    this.loadingImage = false;
    this.imageReady = true;
  }

  submit(form) {
    this.submitted = true;
    if (form.valid) {
      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'Loading...'
      });
      loading.present();
      this.buildStatement(form).subscribe((statement) => {
        this.createStatement(statement).then(() => {
          this.navCtrl.setRoot(HomePage);
          loading.dismiss();
        });
      });
    }
  }

  buildStatement(form) {
    return Observable.create((observer) => {
      this.statementId = this.firebase.afs.createId();
      let statement: Statement = {
        id: this.statementId,
        title: form.title,
        description: form.description,
        commentCount: 0,
        likeCount: 0,
        reported: false,
        private: this.private,
        url: this.statementImageUrl,
        filename: this.statementName,
        collection: "statements",
        displayPostDate: this.displayPostDate,
        postDate: this.postDate,
        displayTimestamp: this.displayTimestamp,
        timestamp: this.timestamp,
        uid: this.firebase.user.uid,
        name: this.firebase.user.name,
        face: this.firebase.user.photo
      }
      observer.next(statement);
    });
  }

  createStatement(statement) {
    let statementPath = "/statements/" + this.statementId;
    return this.firebase.afs.doc(statementPath).set(statement);
  }

  listenForCanceledUpload() {
    this.events.subscribe('getImageCanceled', () => {
      this.statementImageUrl = null;
      this.imageReady = false;
      this.loadingImage = false;
    });
  }

  listenForUploadTimeout() {
    this.events.subscribe('timeout', () => {
      this.statementImageUrl = null;
      this.imageReady = false;
      this.loadingImage = false;
      let alert = this.alertCtrl.create({
        title: 'Upload Timeout',
        subTitle: 'Please Try Again',
        buttons: ['OK']
      });
      alert.present();
    });
  }

  redoImageLoad() {
    this.statementImageUrl = null;
    this.imageReady = false;
    this.events.publish('redoUpload', this.imageRetrievalMethod, this.statementName);
  }
  
  makePrivate() {
    this.private = true;
  }

  makePublic() {
    this.private = false;
  }
}