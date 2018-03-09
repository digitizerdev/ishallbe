import { Component } from '@angular/core';

import { IonicPage, ActionSheetController } from 'ionic-angular';


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
  imageLoaded = false;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatementCreatorPage');
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
    this.imageLoaded = true;
  }
}