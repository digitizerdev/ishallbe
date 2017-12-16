import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { ProfilePage } from '../profile/profile';
import { PostPage } from '../post/post';
import { UserPage } from '../user/user';
import { LoginPage } from '../login/login';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { SessionProvider } from '../../providers/session/session';

import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  posts: any[] = [];
  uid: any;
  refreshing: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebase: FirebaseProvider,
    public session: SessionProvider,
    public alertCtrl: AlertController
  ) {
  }

  ionViewDidEnter() {
    this.loadPosts('');
  }

  loadPosts(refresh) {
    this.startRefresh(refresh);
    return this.requestUID().subscribe((uid) => {
      this.uid = uid
      return this.requestProfile().subscribe((profile) => {
        console.log("Got profile");
        console.log(profile);
        if (profile.blocked) {
          console.log("This profile is blocked");
          this.handleBlocked();
        }
        return this.requestPosts().first().subscribe((posts) => {
          this.presentPosts(posts);
          this.endRefresh(refresh);
        });
      });
    });
  }

  startRefresh(refresh) {
    if (refresh) {
      this.refreshing = true;
    }
  }

  endRefresh(refresh) {
    if (refresh) {
      refresh.complete();
    }
  }

  requestUID() {
    return this.session.uid();
  }

  requestProfile() {
    let uid = this.uid;
    return this.firebase.profile(uid);
  }

  handleBlocked() {
    this.session.end();
    this.navCtrl.setRoot(LoginPage);
    this.presentBlocked();
  }

  presentBlocked() {
    let alert = this.alertCtrl.create({
      title: 'Fail',
      message: 'This account has been blocked',
      buttons: [
        {
          text: 'Okay',
        }
      ]
    });
    alert.present();
  }

  requestPosts() {
    let path = "/posts/"
    return this.firebase.orderList(path, 'rawTime');
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
        this.posts.push(post);
      });
    });
  }

  requestPostUserLikerObject(post) {
    let path = 'posts/' + post.id + '/likers/';
    return this.firebase.query(path, 'uid', this.uid);
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

  removePostLikerObject(liker, post) {
    let path = 'posts/' + post.id + '/likers/' + liker.id;
    return this.firebase.removeObject(path);
  }

  unlikePost(myPost) {
    myPost.userLiked = false;
    let likeCount = --myPost.likeCount;
    let post = {
      "likeCount": likeCount
    }
    let path = 'posts/' + myPost.id;
    return this.firebase.updateObject(path, post);
  }

  unflagPostLike(myPost) {
    let post = {
      "liked": false,
    }
    let path = 'posts/' + myPost.id;
    return this.firebase.updateObject(path, post);
  }

  pushPostLikerObject(myPost) {
    let path = 'posts/' + myPost.id + '/likers/';
    let likerObject = {
      "post": myPost.id,
      "uid": this.uid
    }
    return this.firebase.push(path, likerObject);
  }

  addIDToPostLikerObject(postLikerID, myPost) {
    let path = '/posts/' + myPost.id + '/likers/' + postLikerID;
    let liker = {
      id: postLikerID
    }
    return this.firebase.updateObject(path, liker);
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
      return this.firebase.updateObject(path, post).then((obj) => {
        observer.next(obj)
      });
    });
  }


  viewPost(postID) {
    this.navCtrl.push(PostPage, { id: postID })
  }

  goToProfilePage() {
    this.navCtrl.setRoot(ProfilePage);
  }

  viewUser(uid) {
    this.navCtrl.push(UserPage, { uid: uid })
  }

}
