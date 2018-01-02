import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase';

import { PostPage } from '../post/post';
import { HomePage } from '../home/home';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { CreateStatementPage } from '../create-statement/create-statement';

@IonicPage()
@Component({
  selector: 'page-statements',
  templateUrl: 'statements.html',
})
export class StatementsPage {

  uid: any;
  profile: any;
  loaded = false;
  posts: any;
  noUserStatements: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public firebase: FirebaseProvider
  ) {
  }

  ionViewDidLoad() {
    this.loadProfile().subscribe(() => {
      this.loadUserPosts().subscribe((posts) => {
        console.log("All loaded");
        console.log(posts);
        if (posts.length == 0) {
          this.noUserStatements = true;
        }
        this.loaded = true;
        console.log("Loaded: " + this.loaded);
        console.log("Posts: " + this.posts);
        this.presentPosts(posts);
      });
    })
  }

  loadProfile() {
    return Observable.create((observer) => {
      return this.requestUID().then((uid) => {
        this.uid = uid;
        return this.requestProfile().subscribe((profile) => {
          this.profile = profile;
          observer.next();
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
    return this.firebase.object(path)
  }

  loadUserPosts() {
    let path = '/posts/'
    console.log("Path is " + path);
    console.log("UID is " + this.uid);
    return this.firebase.queriedList(path, 'uid', this.uid);
  }

  presentPosts(posts) {
    posts.reverse();
    this.posts = [];
    posts.forEach((post) => {
      this.requestPostUserLikerObject(post).subscribe((liker) => {
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
    return this.firebase.queriedList(path, 'uid', this.uid);
  }

  togglePostLike(post) {
    if (post.userLiked) {
      this.requestPostUserLikerObject(post).subscribe((liker) => {
        this.removePostLikerObject(liker[0], post).then(() => {
          if (post.likeCount == 1) {
            this.unflagPostLike(post);
            post.liked = false;
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
    return this.firebase.object(path).remove();
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

  viewPost(postID) {
    this.navCtrl.push(PostPage, { id: postID })
  }

  setRootHomePage() {
    this.navCtrl.setRoot(HomePage);
  }

  pushCreateStatementPage() {
    this.navCtrl.push(CreateStatementPage);
  }
}

