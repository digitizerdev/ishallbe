import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Observable } from 'rxjs/Observable';

import { PasswordResetPage } from '../password-reset/password-reset';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  login: {
    email?: string, 
    password?: string
  } = {};  
  submitted = false;
  uid: any;

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private firebase: FirebaseProvider
  ) {
  }

  submit(loginForm) {
    this.submitted = true;
    if (loginForm.valid) {
      let loading = this.loadingCtrl.create({ content: 'Please Wait..' });
      loading.present();
      return this.authenticate(loginForm).subscribe((token) => {  
        this.navCtrl.setRoot(HomePage);
        loading.dismiss();
      }, error => { this.errorHandler(error); loading.dismiss(); 
    })};    
  }

  authenticate(loginForm) {
    return Observable.create((observer) => {
      return this.firebase.afa.auth.signInWithEmailAndPassword(loginForm.email, loginForm.password).then((token)=> {
        this.uid = token.uid;              
        observer.next(token);
      }, (error) => {
        observer.error(error);
      });
    });
  }

  errorHandler(error) {
    this.firebase.afa.auth.signOut(); 
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: error.message,
      buttons: ['OK']
    });
    alert.present();
  }

  setRootSignupPage() {
    console.log("About to set root to Signup Page");
    this.navCtrl.setRoot(SignupPage).catch((error) => {
      console.log("Error");
      console.log(error);
    });
  }

  setRootPasswordResetPage() {
    this.navCtrl.setRoot(PasswordResetPage);
  }

}
