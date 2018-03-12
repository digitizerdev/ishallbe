import { Component } from '@angular/core';

import { IonicPage, NavController, AlertController, Events, ActionSheetController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import moment from 'moment';

import { HomePage } from '../home/home';
 
import { FirebaseProvider } from '../../providers/firebase/firebase';

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
  statement: any;
  statementImageUrl: string; 
  statementName: string;
  imageRetrievalMethod: string; 
  timestamp: number;
  submitted = false;
  loadingImage = false;
  imageReady = false;

  constructor(
    private navCtrl: NavController, 
    private alertCtrl: AlertController,
    private events: Events,
    private actionSheetCtrl: ActionSheetController,
    private firebase: FirebaseProvider
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatementCreatorPage');
    let timestampString = moment().format('YYYYMMDDhhmmss');
    this.timestamp = parseInt(timestampString);
    this.listenForCanceledUpload();
  }

  loadImage() {
    console.log("Load image triggered");
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
            this.loadingImage = true;
          }
        },
        {
          text: 'Library',
          handler: () => {
            console.log("Chose Library");
            this.imageRetrievalMethod = "library";
            this.loadingImage = true;
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

  setImage(image) {
    console.log("Load Image triggered");
    console.log(image);
    this.statementImageUrl = image.url;
    this.statementName = image.name;
    this.loadingImage = false;
    this.imageReady = true;
  }

  submit(form) {
    this.submitted = true;
    console.log("Submitting Form");
    console.log(form);
    console.log("Image Ready: " + this.imageReady);
    if (!this.imageReady) this.displayNotReadyAlert();
    else {
      if (form.valid) {
        console.log("Ready to create firebase statement");
        this.buildStatement().subscribe(() => {
          this.createStatement().subscribe(() => {
            console.log("Statement created");
            this.navCtrl.setRoot(HomePage);
          });
        });
      }
    }
  }

  buildStatement() {
    console.log("Building Statement");
    return Observable.create((observer) => {
      this.statement = {
        title: this.createStatementForm.title,
        description: this.createStatementForm.description,
        commentCount: 0,
        likeCount: 0,
        private: false,
        url: this.statementImageUrl,
        filename: this.statementName,
        displayTimestamp: "",
        timestamp: this.timestamp,
        user: {
          uid: this.firebase.user.uid,
          name: this.firebase.user.name,
          photo: this.firebase.user.photo
        }
      }
      console.log("Statement Object is " );
      console.log(this.statement);
      observer.next();
    });
  }

  createStatement() {
    return Observable.create((observer) => {
      console.log("Creating Statement");
      return this.firebase.afs.collection("statements").add(this.statement).then((docData) => {
        console.log(docData);
        observer.next();
      }, (error) => {
        console.log("There was an error");
        console.error(error);
      });
    });
  }

  listenForCanceledUpload() {
    this.events.subscribe('getImageCanceled', (message) => {
      this.statementImageUrl = null;
      this.imageReady = false;
      this.loadingImage = false;
    });
  }
  
  displayNotReadyAlert() {
    console.log("Displaying Not Ready Alert");
    let alertMessage = "Please Add Image to Statement";
    let alert = this.alertCtrl.create({
      title: 'Almost There!',
      subTitle: alertMessage,
      buttons: ['OK']
    });
    alert.present();
  }
}