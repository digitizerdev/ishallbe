import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

import { HomePage } from '../../pages/home/home';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { SessionProvider } from '../../providers/session/session';

@Component({
  selector: 'register-form',
  templateUrl: 'register-form.html'
})
export class RegisterFormComponent {

  form: { 
    name?: string,
    email?: string, 
    password?: string 
  } = {};
  submitted = false;
  loader: any;
  profile: {
    email?: string,
    uid?: string,
    blocked?: boolean,
    name?: string,
    role?: string,
    photo?: string
  }

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public firebase: FirebaseProvider,
    public session: SessionProvider
  ) { }

  submit(form) {

    this.prepareRequest(form)
    this.makeRequests(form).then(() => {
      this.confirmDelivery();
    }).catch((error) => {
      this.errorHandler(error);
    });
  }

  prepareRequest(form) {
    this.buildData(form);
    this.startLoader();
  }

  buildData(form) {
    this.form = form;
    this.profile = {
      name: form.name,
      email: form.email,
      photo: "https://ishallbe.co/wp-content/uploads/2017/09/generic-profile.png",
      role: 'contributor',
      blocked: false,
      uid: "default"
    }
    this.submitted = true;
  }

  startLoader() {
    this.loader = this.loadingCtrl.create({
      content: 'Please Wait..'
    });
  }

  makeRequests(form) {
    console.log("About to request account createion");
    console.log(form);
    return this.requestAccountCreation(form).then((token) => {
      console.log("Got token");
      console.log(token);
      this.profile.uid = token.uid
      return this.requestProfileCreation().then(() => {
      }, (error) => { throw error });
    }, (error) => { throw error });
  }

  requestAccountCreation(form) {
    return this.firebase.createAccount(form.email, form.password);
  }

  requestProfileCreation() {
    let path = '/users/' + this.profile.uid;
    return this.firebase.setObject(path, this.profile);    
  }

  confirmDelivery() {
    this.endLoader();
    this.presentConfirmationAlert();
    this.startSession();        
    this.setRootHomePage();
  }

  endLoader() {
    this.loader.dismiss();
  }

  presentConfirmationAlert() {
    let alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: 'Registration Complete',
      buttons: ['OK']
    });
    alert.present();
  }

  startSession() {
    let user = {
      "loggedIn": true,
      "role": 'contributor',
      "uid": this.profile.uid
    }
    this.session.start(user);
    this.setRootHomePage();
  }

  setRootHomePage() {
    this.navCtrl.setRoot(HomePage);
  }

  errorHandler(error) {
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: error.message,
      buttons: ['OK']
    });
    alert.present();
  }

}
