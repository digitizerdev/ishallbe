import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { HomePage } from '../home/home';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { CreateStatementPage } from '../create-statement/create-statement';
import { PostPage } from '../post/post';
import { AccountPage } from '../account/account';

import { FirebaseProvider } from '../../providers/firebase/firebase';

import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
  export class ProfilePage {

  profile: any;
  posts: any[] = [];
  uid: any;

  constructor(
    public navCtrl: NavController, 
    public firebase: FirebaseProvider,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public storage: Storage
  ) {
  }

  ionViewDidEnter() {
    this.loadProfile();
  }

  loadProfile() {
    return this.requestUID().then((uid) => {
      this.uid = uid;
      return this.requestProfile().subscribe((profile) => {
        console.log("Got Profile");
        console.log(profile);
        this.syncProfile(profile);
        return this.loadUserPosts(profile.uid).subscribe((userPosts)=> {
          this.presentPosts(userPosts);
        });
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
    return this.firebase.object(path);
  }

  syncProfile(profile) {
    this.profile = profile;    
    if (profile.photo == 'https://ishallbe.co/wp-content/uploads/2017/09/generic-profile.png') {
      profile.photo = 'assets/img/default-profile.png';
    }
    if (!profile.bio) {
      this.addStandardBio(profile);
    }
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
    this.firebase.object(path).set(profile);
  }

  loadUserPosts(uid) {
    let path = '/posts/'
    return this.firebase.queriedList(path, 'uid', uid);
  }

  presentPosts(posts) {
    this.posts = [];
    posts.forEach((post) => {
      this.requestPostUserLikerObject(post).first().subscribe((liker) => {
        if (liker[0]) {
          post.userLiked = true;
        } else {
          post.userLiked = false;
        }
        if (post.face == 'https://ishallbe.co/wp-content/uploads/2017/09/generic-profile.png') {
          post.face = 'assets/img/default-profile.png';
        }
        this.posts.push(post);
      });
    });
  }

  togglePostLike(post) {
    if (post.userLiked) {
      this.requestPostUserLikerObject(post).subscribe((liker) => {
        this.removePostLikerObject(liker[0], post).then(() => {
          if (post.likeCount == 1) {
            this.unflagPostLike(post);
          }
          this.unlikePost(post);
        });
      });
    } else {
      this.likePost(post).subscribe(() => {
        this.pushPostLikerObject(post).then((postLikeProps) => {
          let postLikerID = postLikeProps.key;
          this.addIDToPostLikerObject(postLikerID, post);
        });
      });
    }
  }

  requestPostUserLikerObject(post) {
    let path = 'posts/' + post.id + '/likers/';
    return this.firebase.queriedList(path, 'uid', this.uid);
  }

  removePostLikerObject(liker, post) {
    let path = 'posts/' + post.id + '/likers/' + liker.id;
    return this.firebase.object(path).remove();;
  }

  unlikePost(myPost) {
    myPost.userLiked = false;
    let likeCount = --myPost.likeCount;
    let post = {
      "likeCount": likeCount
    }
    let path = 'posts/' + myPost.id;
    return this.firebase.object(path).update(post);
  }

  unflagPostLike(myPost) {
    let post = {
      "liked": false,
    }
    let path = 'posts/' + myPost.id;
    return this.firebase.object(path).update(post);
  }

  pushPostLikerObject(myPost) {
    let path = 'posts/' + myPost.id + '/likers/';
    let likerObject = {
      "post": myPost.id,
      "uid": this.uid
    }
    return this.firebase.list(path).push(likerObject);
  }

  addIDToPostLikerObject(postLikerID, myPost) {
    let path = '/posts/' + myPost.id + '/likers/' + postLikerID;
    let liker = {
      id: postLikerID
    }
    return this.firebase.object(path).update(liker);
  }

  likePost(myPost) {
    return Observable.create((observer) => {
      myPost.liked = true;
      myPost.userLiked = true;
      let likeCount = ++myPost.likeCount;
      let liked = true;
      let post = {
        "likeCount": likeCount,
        "liked": liked
      }
      let path = 'posts/' + myPost.id;
      return this.firebase.object(path).update(post).then((obj) => {
        observer.next(obj)
      });
    });
  }

  setRootHomePage() {
    this.navCtrl.setRoot(HomePage);
  }

  pushCreateStatementPage() {
    this.navCtrl.push(CreateStatementPage);
  }

  pushEditProfilePage() {
    this.navCtrl.push(EditProfilePage);
  }

  flaggedMessage() {
    let alert = this.alertCtrl.create({
      title: 'Flagged Post',
      subTitle: 'Please contact support to address content',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  viewPost(postID) {
    this.navCtrl.push(PostPage, {id: postID})    
  }

  setRootAccountPage() {
    this.navCtrl.setRoot(AccountPage);
  }
}
