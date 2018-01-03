import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { EditProfilePage } from '../edit-profile/edit-profile';
import { PostPage } from '../post/post';
import { AccountPage } from '../account/account';

import { FirebaseProvider } from '../../providers/firebase/firebase';

import { Observable } from 'rxjs/Observable';
import { PACKAGE_ROOT_URL } from '@angular/core/src/application_tokens';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profile: any;
  posts: any[] = [];
  postsQuery: any;
  postLimit: any;
  loaded: any;
  postsLoaded: any;
  uid: any;
  mine: any;
  instagram: any;
  twitter: any;
  linkedin: any;
  refreshing: any;

  constructor(
    public navCtrl: NavController,
    public firebase: FirebaseProvider,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public storage: Storage
  ) {
  }

  ionViewDidLoad() {
    this.postLimit = 1;
    this.loadUID().subscribe(() => {
      this.loadProfile();
    });
  }

  loadProfile() {
    this.requestProfile().subscribe((profile) => {
      this.profile = profile;
      this.checkIfMyProfile();
      this.syncProfile();
      this.loadUserPosts().subscribe((posts) => {
        this.loaded = true;
        posts.reverse();
        this.presentPosts(posts);
      });
    });
  }

  refreshPage(refresh) {
    this.refreshing = true;
    this.posts = [];
    this.firebase.profileID = this.uid;
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  ionViewDidLeave() {
    if (!this.refreshing) {
      this.firebase.profileID = null;
    }
  }

  loadUID() {
    return Observable.create((observer) => {
      this.uid = this.navParams.get('uid')
      if (this.uid) {
        observer.next();
      } else {
        this.uid = this.firebase.profileID;
        if (this.uid) {
          observer.next();
        } else {
          return this.requestUID().then((uid) => {
            this.uid = uid;
            observer.next();
          });
        }
      }
    });
  }

  checkIfMyProfile() {
    this.requestUID().then((uid) => {
      if (this.uid == uid) this.mine = true;
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

  syncProfile() {
    if (this.profile.photo == 'https://ishallbe.co/wp-content/uploads/2017/09/generic-profile.png') {
      this.profile.photo = 'assets/img/default-profile.png';
    }
    if (!this.profile.bio) {
      this.addStandardBio();
    }
    this.instagram = this.profile.instagram;
    this.twitter = this.profile.twitter;
    this.linkedin = this.profile.linkedin;
  }

  addStandardBio() {
    let profile = {
      uid: this.profile.uid,
      name: this.profile.name,
      email: this.profile.email,
      photo: this.profile.photo,
      blocked: this.profile.blocked,
      role: this.profile.role,
      bio: 'Improving Every Day'
    }
    this.profile = profile;
    let path = '/users/' + this.profile.uid;
    this.firebase.object(path).update(profile);
  }

  loadUserPosts() {
    let path = '/posts/'
    return this.firebase.queriedLimitedList(path, 'uid', this.uid, this.postLimit);
  }

  presentPosts(posts) {
    this.posts = [];
    posts.forEach((post) => {
      this.requestPostUserLikerObject(post).subscribe((liker) => {
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

  doInfinite(infiniteScroll) {
    this.postLimit++;
    this.loadUserPosts().subscribe((posts) => {
      if (posts.length < this.postLimit) {
        this.postsLoaded = true;
      } else {
        this.presentNextPost(posts[0]);
        infiniteScroll.complete();
      }
    });
  }

  presentNextPost(post) {
    this.requestPostUserLikerObject(post).subscribe((liker) => {
      if (liker[0]) {
        post.userLiked = true;
      } else {
        post.userLiked = false;
      }
      this.posts.push(post);
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

  pushEditProfilePage() {
    this.navCtrl.setRoot(EditProfilePage);
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
    this.navCtrl.push(PostPage, { id: postID })
  }

  openSocial(socialNetwork) {
    if (socialNetwork == 'instagram') {
      let instagramLink = 'https://instagram.com/' + this.instagram;
      open(instagramLink);
    }
    if (socialNetwork == 'twitter') {
      let twitterLink = 'https://twitter.com/' + this.twitter;
      open(twitterLink);
    }
    if (socialNetwork == 'linkedin') {
      let linkedinLink = 'https://linkedin.com/in/' + this.linkedin;
      open(linkedinLink);
    }
  }

}
