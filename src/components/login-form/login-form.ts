import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';

import { HomePage } from '../../pages/home/home';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { SessionProvider } from '../../providers/session/session';

@Component({
  selector: 'login-form',
  templateUrl: 'login-form.html'
})
export class LoginFormComponent {

  form: { 
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
  };
  uid: any;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public firebase: FirebaseProvider,
    public session: SessionProvider
  ) { }

  submit(form) {
    this.prepareRequest(form)
    this.makeRequests(form).then((profile) => {
      this.profile = profile;
      this.confirmDelivery(profile);
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
    this.submitted = true;
  }

  startLoader() {
    this.loader = this.loadingCtrl.create({
      content: 'Please Wait..'
    });
  }

  makeRequests(form) {
    return this.requestAuthentication(form).then((token) => {
      this.uid = token.uid;
      return this.requestProfile(token.uid).subscribe((profile) => {
        return profile
      }, (error) => { throw error });
    }, (error) => { throw error });
  }

  requestAuthentication(form) {
    return this.firebase.afa.auth.signInWithEmailAndPassword(form.email, form.password);
  }

  requestProfile(uid) {
    return this.firebase.profile(uid);
  }

  confirmDelivery(profile) {
    this.endLoader();
    this.presentConfirmationAlert();
    this.startSession(profile);        
    this.setRootHomePage();
  }

  endLoader() {
    this.loader.dismiss();
  }

  presentConfirmationAlert() {
    let alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: 'Authenticated',
      buttons: ['OK']
    });
    alert.present();
  }

  startSession(profile) {
    let uid = this.uid;
    this.session.start(uid);
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
