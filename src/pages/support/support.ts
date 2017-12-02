import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-support',
  templateUrl: 'support.html',
})
export class SupportPage {
  submitted = false;
  form = { 
    subject: null, 
    message: null 
  };
  email: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SupportPage');
  }

  logForm() {
    this.email = {
      to: 'ishallbe17@gmail.com',
      subject: this.form.subject,
      body: this.form.message,
      isHtml: true
    };
  }

}
