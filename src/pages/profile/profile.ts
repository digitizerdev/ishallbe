import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { HomePage } from '../home/home';
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

  profile: any;

  constructor(
    public navCtrl: NavController, 
    public firebase: FirebaseProvider,
    public session: SessionProvider,
    public navParams: NavParams
  ) {
    this.requestUID();
  }

  pushStatementPage() {
    this.navCtrl.push(StatementPage);
  }

  pushProfileManagerPage() {
    this.navCtrl.push(ProfileManagerPage);
  }

  requestUID() {
    this.session.uid().subscribe((uid)=>{
      this.loadProfile(uid);
    })
  }

  loadProfile(uid) {
    this.requestProfile(uid).subscribe((profile) => {
      this.profile = profile;
      if (!profile.bio) {
        this.addStandardBio(profile);
      }
    })
  }

  requestProfile(uid) {
    let path = '/users/' + uid;
    return this.firebase.object(path)
  }

  addStandardBio(noBioProfile) {
    let profile = {
      uid: noBioProfile.uid,
      name: noBioProfile.name,
      email: noBioProfile.email,
      photo: noBioProfile.photo,
      blocked: noBioProfile.blocked,
      role: noBioProfile.role,
      bio: 'Improving Every Day'
    }
    this.profile = profile;
    let path = '/users/' + noBioProfile.uid;
    this.firebase.setObject(path, profile);
  }

  setRootHomePage() {
    this.navCtrl.setRoot(HomePage);
  }

}
