import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { SessionProvider } from '../../providers/session/session';

import moment from 'moment';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {

  uid: any;
  profile: any;
  postID: string;
  post: any;
  likedPost = false;
  postLikerKey: any;
  commentsLoaded = false;
  postComment: any;
  comments: any[] = [];
  templateComment = {
    content: ''
  }
  requestCount = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public session: SessionProvider,
    public firebase: FirebaseProvider
  ) {
  }

  ionViewDidLoad() {
    this.postID = this.navParams.get('id');
    this.makeRequests(this.postID).first().subscribe(() => {
      this.checkIfUserLikedPost().first().subscribe(() => {
        this.makeCommentRequests();
      })
    })
  }

  makeRequests(postID) {
    this.requestCount++;
    return Observable.create((observer) => {
      return this.requestUID().subscribe((uid) => {
        this.uid = uid;
        this.profile = [];
        return this.requestProfile().subscribe((profile) => {
          this.profile = profile
          this.post = [];
          return this.requestPost().subscribe((post) => {
            this.postComment = null;
            this.post = post
            observer.next();
          });
        });
      });
    });
  }

  requestUID() {
    return this.session.uid();
  }

  requestProfile() {
    let uid = this.uid;
    return this.firebase.profile(uid);
  }

  requestPost() {
    let path = '/posts/' + this.postID;
    return this.firebase.object(path);
  }

  checkIfUserLikedPost() {
    return Observable.create((observer) => {
      let path = 'posts/' + this.post.id + '/likers/';
      return this.firebase.query(path, 'uid', this.uid).first().subscribe((likedPost) => {
        if (likedPost.length == 1) {
          this.postLikerKey = likedPost[0].$key;
          this.likedPost = true;
        }
        observer.next();
      });
    });
  }

  toggleLike() {
    if (this.likedPost) {
      this.removeLikerObject().then(() => {
        this.unlikePost();
      });
    } else {
      this.pushLikerObject().then(() => {
        this.likePost();
      });
    }
  }

  removeLikerObject() {
    let path = 'posts/' + this.post.id + '/likers/' + this.postLikerKey;
    return this.firebase.removeObject(path);
  }

  unlikePost() {
    this.likedPost = false;
    if (this.post.likeCount == 1) {
      this.post.liked = false;
    }
    this.post.likeCount--;
    let path = 'posts/' + this.post.id;
    return this.firebase.setObject(path, this.post);
  }

  pushLikerObject() {
    let path = 'posts/' + this.post.id + '/likers/';
    let likerObject = {
      "post": this.post.id,
      "uid": this.uid
    }
    return this.firebase.push(path, likerObject);
  }

  likePost() {
    this.post.likeCount++;
    if (!this.post.liked) {
      this.post.liked = true;
    }
    let path = 'posts/' + this.post.id;
    return this.firebase.setObject(path, this.post);
  }

  makeCommentRequests() {
      if (this.post.comments) {
        return this.requestComments().subscribe((comments) => {
          this.prepComments(comments);
        });
      }
  }

  requestComments() {
    let path = 'posts/' + this.post.id + '/comments/';
    return this.firebase.orderList(path, 'rawTime');
  }

  prepComments(comments) {
    this.comments = [];
    comments.forEach((comment) => {
      if (comment.likers) {
        this.checkIfUserLikerObject(comment, this.uid).subscribe((liked) => {
          this.markLiked(liked, comment).subscribe((comment) => {
            this.checkIfCommentMine(comment).subscribe((comment) => {
              this.comments.push(comment);
            });
          });
        });
      } else {
        this.checkIfCommentMine(comment).subscribe((comment) => {
          this.comments.push(comment);
        });
      }
    });
  }

  checkIfUserLikerObject(comment, uid) {
    let path = 'posts/' + this.post.id + '/comments/' + comment.$key + '/likers/';
    return this.firebase.query(path, 'uid', uid);
  }

  markLiked(liked, comment) {
    return Observable.create((observer) => {
      if (liked.length == 1) {
        comment.userLiked = true;
      } else {
        comment.userLiked = false;
      }
      observer.next(comment)
    });
  }

  checkIfCommentMine(comment) {
    return Observable.create((observer) => {
      if (comment.uid == this.uid) {
        comment.mine = true;
      } else {
        comment.mine = false;
      }
      observer.next(comment)
    });
  }

  addComment() {
    let path = '/posts/' + this.post.id + '/comments/'
    let time = moment().format('MMM Do, YYYY h:mm A');
    let rawTime = moment().format('HHmmss');
    this.postComment = {
      "name": this.profile.name,
      "face": this.profile.photo,
      "liked": false,
      "likeCount": 0,
      "time": time,
      "rawTime": rawTime,
      "content": this.templateComment.content,
      "post": this.post.id,
      "uid": this.uid,
      "mine": true,
      "userLiked": false
    };
    this.addCommentToPost().then(() => {
      this.incrementPostCommentCount();
      this.templateComment.content = null;
    })
  }

  addCommentToPost() {
    let path = '/posts/' + this.post.id + '/comments';
    return this.firebase.push(path, this.postComment);
  }

  deleteComment(comment) {
    this.comments.splice(comment);
    let path = '/posts/' + this.post.id + '/comments/' + comment.$key;
    this.firebase.removeObject(path);
    this.decrementPostCommentCount();
  }

  incrementPostCommentCount() {
    this.post.commentCount++;
    let path = '/posts/' + this.post.id + '/commentCount'
    this.firebase.setObject(path, this.post.commentCount);
  }

  decrementPostCommentCount() {
    this.post.commentCount--;
    let path = '/posts/' + this.post.id + '/commentCount'
    this.firebase.setObject(path, this.post.commentCount);
  }

  toggleCommentLike(comment) {
    console.log("Toggled comment like");
    if (comment.userLiked) {
      console.log("User already liked this comment");
      console.log(comment);
      console.log("My uid is " + this.uid);
      console.log("Checking for liker object");
      this.checkIfUserLikerObject(comment, this.uid).first().subscribe((liker) => {
        console.log("Got liker object");
        console.log(liker);
        console.log("Let's remove comment liker object");
        this.unlikeComment(comment).then(()=> {
          this.removeCommentLikerObject(liker).then(() => {
            console.log("Removed comment liker object");
            console.log("Let's unlike");
          });
        })        
      });
    } else {
      console.log("User hasn't liked this comment")
      this.pushCommentLikerObject(comment).then(() => {
        this.likeComment(comment)        
      })
    }
  }

  removeCommentLikerObject(liker) {
    console.log("Removing comment liker object")
    let path = 'posts/' + this.post.id + '/comments/' + liker[0].comment + '/likers/' + liker[0].$key;
    console.log("Path is " + path);
    return this.firebase.removeObject(path);
  }

  unlikeComment(comment) {
    if (comment.likeCount == 1) {
      comment.liked = false;
    }
    comment.userLiked = null;
    comment.likeCount--;
    console.log(comment);
    let path = 'posts/' + this.post.id + '/comments/' + comment.$key;
    return this.firebase.setObject(path, comment);
  }

  pushCommentLikerObject(comment) {
    let path = 'posts/' + this.post.id + '/comments/' + comment.$key + '/likers/'
    let likerObject = {
      "comment": comment.$key,
      "uid": this.uid
    }
    return this.firebase.push(path, likerObject);
  }

  likeComment(comment) {
    comment.likeCount++;
    if (!comment.liked) {
      comment.liked = true;
    }
   let path = 'posts/' + this.post.id + '/comments/' + comment.$key;
    return this.firebase.updateObject(path, comment);
  }

}
