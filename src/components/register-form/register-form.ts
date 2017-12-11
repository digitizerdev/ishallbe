import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

import { HomePage } from '../../pages/home/home';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { SessionProvider } from '../../providers/session/session';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/first';

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
    this.profile.name = form.name;
    this.profile.email = form.email;
    this.profile.photo = "https://ishallbe.co/wp-content/uploads/2017/09/generic-profile.png"
    this.profile.blocked = false;
    this.profile.role = 'contributor';
    this.submitted = true;
  }

  startLoader() {
    this.loader = this.loadingCtrl.create({
      content: 'Please Wait..'
    });
  }

  makeRequests(form) {
    return this.requestAccountCreation(form).then((token) => {
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
      subTitle: 'Your registration is complete',
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
