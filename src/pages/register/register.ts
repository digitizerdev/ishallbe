import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';

import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  registerForm: {
    name?: string
    email?: string,
    password?: string
  } = {};
  submitted = false;
  loader: any;
  uid: any;
  profile: any;

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private firebase: FirebaseProvider,
    private storage: Storage
  ) {
  }


  submit(registerForm) {
    this.submitted = true;
    if(registerForm.valid) {
      this.presentEULA().subscribe((accepted) => {
        if (accepted) {
          this.prepareRequest(registerForm)
          this.makeRequests(registerForm).then(() => {
            this.confirmDelivery();
          }).catch((error) => {
            this.errorHandler(error);
          });
        }
      });
    }    
  }

  presentEULA() {
    return Observable.create((observer:any) => {                  
    let alert = this.alertCtrl.create({
      title: 'Accept Terms of Service',
      message: 'Please confirm to continue',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            observer.next(false);
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            observer.next(true);
          }
        }
      ]
    });
    alert.present();
    });
  }


  prepareRequest(registerForm) {
    this.buildData(registerForm);
    this.startLoader();
  }

  buildData(registerForm) {
    this.registerForm = registerForm;
    this.profile = {
      name: registerForm.name,
      email: registerForm.email,
      photo: "assets/img/default-profile.png",
      role: 'contributor',
      blocked: false,
      uid: "default"
    }
  }

  startLoader() {
    this.loader = this.loadingCtrl.create({
      content: 'Please Wait..'
    });
  }

  makeRequests(registerForm) {
    return this.requestAccountCreation(registerForm).then((token) => {
      this.uid = token.uid
      this.profile.uid = token.uid
      return this.requestProfileCreation().then(() => {
      }, (error) => { throw error });
    }, (error) => { throw error });
  }

  requestAccountCreation(registerForm) {
    return this.firebase.register(registerForm);
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
      title: '',
      subTitle: 'Registered',
      buttons: ['OK']
    });
    alert.present();
  }

  startSession() {
    let uid = this.uid;
    this.storage.set('uid', uid);
    this.storage.set('session', true);
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

  setRootLoginPage() {
    this.navCtrl.setRoot(LoginPage);
  }

}
