import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { SessionProvider } from '../../providers/session/session';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

@Component({
  selector: 'account-email-form',
  templateUrl: 'account-email-form.html'
})
export class AccountEmailFormComponent {

  form: {
    email?: string,
  } = {};
  submitted = false;
  error: any;
  profile: {
    email?: string,
    uid?: string,
    blocked?: boolean,
    name?: string,
    role?: string,
    photo?: string
  }

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public firebase: FirebaseProvider,
    public session: SessionProvider
  ) {
    this.requestUID();
  }

  submit(form) {
    this.form = form;
    this.submitted = true;
    this.request(form.email);
  }

  requestUID() {
    this.session.uid().subscribe((uid) => {
      this.loadProfile(uid);
    });
  }

  loadProfile(uid) {
    this.requestProfile(uid).subscribe((profile) => {
      this.profile = profile;
    });
  }

  requestProfile(uid) {
    let path = '/users/' + uid;
    return this.firebase.object(path)
  }

  request(email) {
    this.firebase.updateAccountEmail(email)
      .subscribe(() => {
        this.profile.email = email;
        this.updateProfile(this.profile);
      }, (error) => {
        this.errorHandler(error);
      })
  }

  updateProfile(profile) {
    let path = '/users/' + profile.uid;
    this.firebase.updateObject(path, profile).subscribe(() => {
      this.confirm();
    })
  }

  confirm() {
    this.confirmAlert();
  }

  confirmAlert() {
    let alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: 'You successfully updated your email',
      buttons: ['OK']
    });
    alert.present();
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
