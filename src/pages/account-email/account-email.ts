import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-account-email',
  templateUrl: 'account-email.html',
})
export class AccountEmailPage {

  updateEmailForm: {
    email?: string
  } = {};
  submitted = false;
  user: any;


  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private firebase: FirebaseProvider
  ) {
  }

  ionViewDidLoad() {
    this.loadUser();
  }

  loadUser() {
    let user = this.firebase.loadUser();
    user.valueChanges().subscribe((user) => {
      this.user = user;
    })
  }

  submit(updateEmailForm) {
    this.submitted = true;
    if (updateEmailForm.valid) {
      let loading = this.loadingCtrl.create({ content: 'Please Wait..' });
      loading.present();
      return this.updateEmail(updateEmailForm).subscribe(() => {
        return this.updateUser().then(() => {
          this.navCtrl.pop();
          loading.dismiss();
          this.presentConfirmationAlert();
        }, error => {
          this.errorHandler(error); loading.dismiss();
        });
      }, error => {
        this.errorHandler(error); loading.dismiss();
      })
    };
  }

  updateEmail(updateEmailForm) {
    return Observable.create((observer) => {
      return this.firebase.afa.auth.currentUser.updateEmail(updateEmailForm.email).then(() => {
        this.user.email = updateEmailForm.email;
        observer.next();
      }, (error) => { observer.error(error) });
    });
  }

  updateUser() {
    let path = '/users/' + this.user.uid
    return this.firebase.afs.doc(path).update(this.user);
  }

  presentConfirmationAlert() {
    let alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: 'Your email has been updated',
      buttons: ['OK']
    });
    alert.present();
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
