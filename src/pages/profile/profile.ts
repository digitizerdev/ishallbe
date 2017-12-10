import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ProfileManagerPage } from '../profile-manager/profile-manager';
import { StatementPage } from '../statement/statement';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { SessionProvider } from '../../providers/session/session';
import { ProfileManagerComponent } from '../../components/profile-manager/profile-manager';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  title: any;
  owner = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
  }

  pushStatementPage() {
    this.navCtrl.push(StatementPage);
  }

  pushProfileManagerPage() {
    this.navCtrl.push(ProfileManagerPage);
  }

}
