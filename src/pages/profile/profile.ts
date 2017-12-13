import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
import { ProfileManagerPage } from '../profile-manager/profile-manager';
import { StatementPage } from '../statement/statement';
import { PostPage } from '../post/post';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { SessionProvider } from '../../providers/session/session';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profile: any;
  posts: any;

  constructor(
    public navCtrl: NavController, 
    public firebase: FirebaseProvider,
    public session: SessionProvider,
    public navParams: NavParams
  ) {
    this.loadProfile();
  }

  loadProfile() {
    return this.requestUID().subscribe((uid) => {
      return this.requestProfile(uid).subscribe((profile) => {
        this.syncProfile(profile);
        return this.loadUserPosts(profile.uid).subscribe((userPosts)=> {
          this.posts = userPosts;
        })
      })

    });
  }

  syncProfile(profile) {
    this.profile = profile;
    if (!profile.bio) {
      this.addStandardBio(profile);
    }
  }

  requestUID() {
    return this.session.uid();
  }

  requestProfile(uid) {
    return this.firebase.profile(uid);
  }

  loadUserPosts(uid) {
    let path = '/posts/'
    return this.firebase.query(path, 'uid', uid);
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

  pushStatementPage() {
    this.navCtrl.push(StatementPage);
  }

  pushProfileManagerPage() {
    this.navCtrl.push(ProfileManagerPage);
  }

  viewPost(postID) {
    this.navCtrl.push(PostPage, {id: postID})    
  }

}
