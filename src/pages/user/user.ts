import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PostPage } from '../post/post';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { SessionProvider } from '../../providers/session/session';

import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  profile: any;
  uid: any;
  posts: any[] = [];
  myUID: any;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public firebase: FirebaseProvider,
    public session: SessionProvider
  ) {
  }

  ionViewDidEnter() {
    this.loadUser();
  }

  loadUser() {
    this.uid = this.navParams.get('uid'); 
    return this.requestUser().first().subscribe((user) => {
      this.profile = user;
      return this.requestUID().first().subscribe((uid) => {
        this.myUID = uid;
        return this.requestProfile().first().subscribe((profile) => {
          this.syncProfile(profile);
          return this.loadUserPosts(profile.uid).first().subscribe((userPosts)=> {
            this.presentPosts(userPosts);
          })
        })
      });
    });
  }

  requestUser() {
    let path = '/users/' + this.uid;    
    return this.firebase.object(path)
  }

  requestUID() {
    return this.session.uid();
  }

  requestProfile() {
    let uid = this.uid;
    return this.firebase.profile(uid);
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
    this.firebase.setObject(path, profile);
  }

  loadUserPosts(uid) {
    let path = '/posts/'
    return this.firebase.query(path, 'uid', uid);
  }

  presentPosts(posts) {
    console.log("Presenting posts");
    console.log(posts);
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
    return this.firebase.query(path, 'uid', this.myUID);
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
      "uid": this.myUID
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
    this.navCtrl.push(PostPage, {id: postID})    
  }
}
