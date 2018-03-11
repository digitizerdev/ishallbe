import { Component } from '@angular/core';

import { IonicPage, NavController, AlertController, Events, ActionSheetController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import moment from 'moment';

import { HomePage } from '../home/home';
 
import { FirebaseProvider } from '../../providers/firebase/firebase';

import { statement1 } from '../../../test-data/statements/mocks';

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
  statementImage: string; 
  statementName: string;
  imageRetrievalMethod: string; 
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
    this.statementImage = image.url;
    this.statementName = image.name;
    this.loadingImage = false;
    this.imageReady = true;
  }
  
  listenForCanceledUpload() {
    this.events.subscribe('getImageCanceled', (message) => {
      this.statementImage = null;
      this.imageReady = false;
      this.loadingImage = false;
    });
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
          this.createStatement().then((docData) => {
            console.log("Statement created");
            console.log(docData);
            this.navCtrl.setRoot(HomePage);
          }, (error) => {
            console.log("There was an error");
            console.error(error);
          });
        });
      }
    }
  }

  buildStatement() {
    console.log("Building Statement");
    return Observable.create((observer) => {
      this.statement = statement1
      this.statement.title = this.createStatementForm.title;
      this.statement.description = this.createStatementForm.description;
      this.statement.contentUrl = this.statementImage;
      this.statement.timestamp = this.statementName;
      this.statement.user.uid = this.firebase.user.uid;
      this.statement.user.name = this.firebase.user.name;
      this.statement.user.photo = this.firebase.user.photo;
      console.log("Statement Object is " );
      console.log(this.statement);
      observer.next();
    });
  }

  createStatement() {
    console.log("Creating Statement");
    return this.firebase.afs.collection("statements").add(this.statement);
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