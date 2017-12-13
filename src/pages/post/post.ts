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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public session: SessionProvider,
    public firebase: FirebaseProvider
  ) {
  }

  ionViewDidLoad() {
    this.postID = this.navParams.get('id');
    this.makeRequests(this.postID).subscribe((profile) => {
      console.log("Got profile");
      console.log(profile);
      this.checkIfUserLikedPost().subscribe(() => {
        console.log("About to make comment requests")
        this.makeCommentRequests();
      })
    })
  }

  makeRequests(postID) {
    return Observable.create((observer) => {
      return this.requestUID().subscribe((uid) => {
        this.uid = uid;
        return this.requestProfile().subscribe((profile) => {
          this.profile = profile
          return this.requestPost().subscribe((post) => {
            this.postComment = null;
            this.post = post
            observer.next(profile);
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
    console.log("Checking if user liked post");
    return Observable.create((observer) => {
      let path = 'posts/' + this.post.id + '/likers/';
      return this.firebase.query(path, 'uid', this.uid).subscribe((likedPost) => {
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
      console.log("Make comment requests triggered");
      console.log("Post comments: " + this.post.comments);
      if (this.post.comments) {
        return this.requestComments().subscribe((comments) => {
          console.log("Got comments");
          console.log(comments);
          this.prepComments(comments);
        });
      }
  }

  requestComments() {
    console.log("Request comments triggered")
    let path = 'posts/' + this.post.id + '/comments/';
    return this.firebase.orderList(path, 'rawTime');
  }

  prepComments(comments) {
    console.log("Prep comments triggered");
    console.log(comments);
    this.comments = [];
    comments.forEach((comment) => {
      console.log("For each comment");
      console.log(comment);
      if (comment.likers) {
        console.log("Comment likers: " + comment.likers);
        console.log("STARTED!!!!");        
        this.checkIfUserLikedComment(comment, this.uid).subscribe((liked) => {
          this.markLiked(liked, comment).subscribe((comment) => {
            this.checkIfCommentMine(comment).subscribe((comment) => {
              console.log("Pushing comment");
              console.log(comment);
              this.comments.push(comment);
            });
          });
          console.log("FINISHED!!!!")
        });
      } else {
        this.checkIfCommentMine(comment).subscribe((comment) => {
          console.log("Pushing comment");
          console.log(comment);
          this.comments.push(comment);
        });
      }
    });
  }

  checkIfUserLikedComment(comment, uid) {
    let path = 'posts/' + this.post.id + '/comments/' + comment.$key + '/likers/';
    return this.firebase.query(path, 'uid', uid);
  }

  markLiked(liked, comment) {
    return Observable.create((observer) => {
      if (liked.length == 1) {
        console.log("This user liked ");
        comment.userLiked = true;
        console.log(comment);
      } else {
        console.log("This user did not like");
        comment.userLiked = false;
        console.log(comment);
      }
      observer.next(comment)
    });
  }

  checkIfCommentMine(comment) {
    return Observable.create((observer) => {
      console.log("Check if comment mine triggered");
      if (comment.uid == this.uid) {
        comment.mine = true;
      } else {
        comment.mine = false;
      }
      observer.next(comment)
    });
  }

  toggleCommentLike(comment) {
    console.log("Toggle comment like triggered");
    if (comment.userLiked) {
      this.checkIfUserLikedComment(comment, this.uid).subscribe((likerObject) => {
        this.removeCommentLikerObject(likerObject).then(() => {
          this.unlikeComment(comment).then(() => {
            comment.userLiked = false;
          });
        });
      });
    } else {
      this.pushCommentLikerObject(comment).then(() => {
        this.likeComment(comment).then(() => {
        })
      })
    }
  }

  removeCommentLikerObject(liker) {
    let path = 'posts/' + this.post.id + '/comments/' + liker.comment + '/likers/' + liker.$key;
    return this.firebase.removeObject(path);
  }

  unlikeComment(comment) {
    comment.userLiked = null;
    if (comment.likeCount == 1) {
      comment.liked = false;
    }
    comment.likeCount--;
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
    comment.userLiked = true;
    if (!comment.liked) {
      comment.liked = true;
    }
    let path = 'posts/' + this.post.id + '/comments/' + comment.$key;
    return this.firebase.setObject(path, this.post);
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
    console.log(this.postComment);
    this.addCommentToPost().then(() => {
      console.log("Finished adding comment to post");
      this.incrementPostCommentCount();
      this.templateComment.content = null;
    })
  }

  addCommentToPost() {
    console.log("Adding comment to post");
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
    console.log("Increment Post Comment Count triggered");
    this.post.commentCount++;
    let path = '/posts/' + this.post.id + '/commentCount'
    this.firebase.setObject(path, this.post.commentCount);
  }

  decrementPostCommentCount() {
    this.post.commentCount--;
    let path = '/posts/' + this.post.id + '/commentCount'
    this.firebase.setObject(path, this.post.commentCount);
  }

}
