import { Component } from '@angular/core';

import { IonicPage, Events, ActionSheetController } from 'ionic-angular';


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
  statementImage: string; 
  imageRetrievalMethod: string; 
  submitted = false;
  loadingImage = false;
  imageReady = false;

  constructor(
    private events: Events,
    private actionSheetCtrl: ActionSheetController,
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

  setImage(imageUrl) {
    console.log("Load Imagee triggered");
    console.log(imageUrl);
    this.statementImage = imageUrl;
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
}