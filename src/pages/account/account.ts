import { Component, ViewChild, ElementRef } from '@angular/core';
import { Platform, NavController, NavParams, AlertController, ModalController, LoadingController, ViewController, ActionSheetController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/first';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  @ViewChild('imageSrc') imageElement: ElementRef;  
  
  constructor(
    public navCtrl: NavController,
  )   {
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad AccountPage');

  }

}
