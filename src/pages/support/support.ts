import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-support',
  templateUrl: 'support.html',
})
export class SupportPage {
  submitted = false;
  email: { subject?: string, message?: string } = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SupportPage');
  }

  logForm(subject, message) {
    this.email.subject = subject;
    this.email.message = message;
  }
}
