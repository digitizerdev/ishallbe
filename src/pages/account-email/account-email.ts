import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-account-email',
  templateUrl: 'account-email.html',
})
export class AccountEmailPage {

  updateEmailForm: {
    email?: string;
  } = {};
  submitted = false;
  loader: any;
  title = 'Update Email';
  uid: any;
  profile: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public alertCtrl: AlertController,
    public firebase: FirebaseProvider
  ) {
  }

  ionViewDidEnter() {
    this.loadAccount();
  }

  loadAccount() {
    this.requestUID().then((uid) => {
      this.uid = uid;
      this.requestProfile().subscribe((profile) => {
        this.profile = profile;
      });
    });
  }

  requestUID() {
    return this.storage.ready().then(() => {
      return this.storage.get(('uid'));      
    });
  }

  requestProfile() {
    let path = '/users/' + this.uid;
    return this.firebase.object(path)
  } 

  submit(updateEmailForm) {
    this.submitted = true;
    if (updateEmailForm.valid) {
      this.startLoader();
      return this.updateEmail(updateEmailForm).subscribe(() => {
        return this.updateProfile().then(() => {
          this.confirmDelivery();   
        });
      });
    }    
  }

  startLoader() {
    this.loader = this.loadingCtrl.create({
      content: 'Please Wait..'
    });
    this.loader.present();
  }

  updateEmail(updateEmailForm) {
    return Observable.create((observer) => {
      return this.firebase.account().updateEmail(updateEmailForm.email).then(()=> {
        this.profile.email = updateEmailForm.email;        
        observer.next();
      }, (error) => { this.errorHandler(error); });
    });
  }

  updateProfile() {
    let path = '/users/' + this.uid;
    return this.firebase.object(path).update(this.profile);
  }

  confirmDelivery() {
    this.endLoader();
    this.presentConfirmationAlert();
    this.popToAccountPage();
  }

  endLoader() {
    this.loader.dismiss();
  }

  presentConfirmationAlert() {
    let alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: 'Your email has been updated',
      buttons: ['OK']
    });
    alert.present();
  }

  popToAccountPage() {
    this.navCtrl.pop();
  }

  errorHandler(error) {
    this.endLoader();
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: error.message,
      buttons: ['OK']
    });
    alert.present();
  }

}
