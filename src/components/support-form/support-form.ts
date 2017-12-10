import { Component } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer';
import { NavController, AlertController } from 'ionic-angular';

import { HomePage } from '../../pages/home/home';

@Component({
  selector: 'support-form',
  templateUrl: 'support-form.html'
})
export class SupportFormComponent {

  form: { 
    subject?: string, 
    body?: string
  } = {};
  submitted = false;
  error: any;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public emailComposer: EmailComposer
  ) {
  }

  submit(form) {
    this.form = form;
    this.submitted = true;
    this.send();
    this.setRootHomePage();    
  }

  send() {
    let email = {
      to: 'iShallBe17@gmail.com',
      subject: this.form.subject,
      body: this.form.body,
      isHtml: true
    };

    this.emailComposer.open(email)
    .catch((error)=>{
      this.errorHandler(error);
    });
  }

  setRootHomePage() {
    this.navCtrl.setRoot(HomePage);
  }

  errorHandler(error) {
    this.error = error;
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: error.message,
      buttons: ['OK']
    });
    alert.present();
  }

}
