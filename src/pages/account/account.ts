import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';

import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { AccountEmailPage } from '../account-email/account-email';
import { AccountPasswordPage } from '../account-password/account-password';;
import { ProfilePage } from '../profile/profile';
import { SupportPage } from '../support/support';
import { PinsManagerPage } from '../pins-manager/pins-manager';
import { PostsManagerPage } from '../posts-manager/posts-manager';
import { UsersManagerPage } from '../users-manager/users-manager';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  title = 'Account';
  uid: any;
  role: any;
  name: any;
  email: any;
  editor: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public firebase: FirebaseProvider,
    public storage: Storage
  ) {
    this.loadAccount();
  }

  loadAccount() {
    this.requestUID().then((uid) => {
      this.uid = uid;
      this.requestProfile().subscribe((profile) => {
        this.name = profile.name;
        this.email = profile.email;
        if (profile.editor) this.editor = true;
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

  pushAccountEmailPage() {
    this.navCtrl.push(AccountEmailPage);
  }

  pushAccountPasswordPage() {
    this.navCtrl.push(AccountPasswordPage);
  }

  setRootProfilePage() {
    this.navCtrl.setRoot(ProfilePage);
  }

  logout() {
    this.firebase.logOut();
    this.storage.clear();
    this.setRootLoginPage();
  }

  setRootLoginPage() {
    this.navCtrl.setRoot(LoginPage);
  }

  setRootHomePage() {
    this.navCtrl.setRoot(HomePage);
  }

  pushSupportPage() {
    this.navCtrl.push(SupportPage);
  }

  pushManagerPage() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Manage Pins',
          handler: () => {
            this.navCtrl.push(PinsManagerPage);
          }
        },
        {
          text: 'Manage Posts',
          handler: () => {
            this.navCtrl.push(PostsManagerPage);
          }
        },
        {
          text: 'Manage Users',
          handler: () => {
            this.navCtrl.push(UsersManagerPage);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
 
    actionSheet.present();
  }

}
