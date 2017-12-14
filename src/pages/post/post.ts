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
  postComment: any;
  comments: any[] = [];
  form: {
    comment?: string
  } = {};
  submitted = false;
  refreshing = false

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public session: SessionProvider,
    public firebase: FirebaseProvider
  ) {
  }

  ionViewDidLoad() {
    this.loadPost('');
  }

  loadPost(refresh) {
    this.startRefresh(refresh);
    this.postID = this.navParams.get('id');
    console.log("Loading post");
    console.log("Post id is" + this.postID);
    return this.makeProfileRequests().first().subscribe(() => {
      console.log("Finished profile requests");
      this.post = [];
      return this.requestPost().first().subscribe((post) => {
        this.post = post;
        return this.checkIfUserLikedPost(this.post, this.uid).first().subscribe((liker) => {
          this.markPostLike(liker);
          console.log("About to make comment requests");
          this.makeCommentsRequests();
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

  makeProfileRequests() {
    return Observable.create((observer) => {
      return this.requestUID().subscribe((uid) => {
        this.uid = uid;
        this.profile = [];
        return this.requestProfile().subscribe((profile) => {
          this.profile = profile
          observer.next();
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

  checkIfUserLikedPost(post, uid) {
    let path = 'posts/' + post.id + '/likers/';
    return this.firebase.query(path, 'uid', uid);
  }

  markPostLike(liker) {
    if (liker.length == 1) {
      this.likedPost = true;
    } else {
      this.likedPost = false;
    }
  }

  makeCommentsRequests() {
    console.log("Making comment requests")
    console.log(this.post.comments);
    if (this.post.comments) {
      this.requestComments().first().subscribe((comments) => {
        console.log("Got comments");
        console.log(comments);
        this.prepComments(comments);
      });
    }
  }

  requestComments() {
    console.log("Requesting comments");
    let path = 'posts/' + this.post.id + '/comments/';
    console.log("Path is " + path);
    return this.firebase.orderList(path, 'rawTime');
  }

  prepComments(comments) {
    this.comments = [];
    comments.forEach((comment) => {
      if (comment.likers) {
        this.checkIfUserLikedComment(comment, this.uid).first().subscribe((liker) => {
          this.markLikedComment(liker, comment).first().subscribe((comment) => {
            this.checkIfCommentMine(comment).first().subscribe((comment) => {
              this.comments.push(comment);
            });
          });
        });
      } else {
        this.checkIfCommentMine(comment).first().subscribe((comment) => {
          this.comments.push(comment);
        });
      }
    });
  }

  checkIfUserLikedComment(comment, uid) {
    let path = 'posts/' + this.post.id + '/comments/' + comment.id + '/likers/';
    return this.firebase.query(path, 'uid', uid);
  }

  markLikedComment(liked, comment) {
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

  togglePostLike() {
    if (this.likedPost) {
      this.checkIfUserLikedPost(this.post, this.uid).first().subscribe((liker) => {
        this.removePostLikerObject(liker).then(() => {
          this.unlikePost();
        });
      });
    } else {
      this.likePost().then(() => {
        this.pushPostLikerObject();
      });
    }
  }

  removePostLikerObject(liker) {
    let path = 'posts/' + this.post.id + '/likers/' + liker[0].$key
    return this.firebase.removeObject(path);
  }

  unlikePost() {
    this.likedPost = false;
    let liked = true;
    if (this.post.likeCount == 1) {
      let liked = false;
    }
    let likeCount = --this.post.likeCount;
    let post = {
      "liked": liked,
      "likeCount": likeCount
    }
    let path = 'posts/' + this.post.id;
    return this.firebase.updateObject(path, post);
  }

  pushPostLikerObject() {
    let path = 'posts/' + this.post.id + '/likers/';
    let likerObject = {
      "post": this.post.id,
      "uid": this.uid
    }
    return this.firebase.push(path, likerObject);
  }

  likePost() {
    this.likedPost = true;
    let likeCount = ++this.post.likeCount;
    let liked = true;
    let post = {
      "likeCount": likeCount,
      "liked": liked
    }
    let path = 'posts/' + this.post.id;
    return this.firebase.updateObject(path, post);
  }

  submit(form) {
    this.submitted = true;    
    if (form.comment) {
      this.submitted = false
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
        "content": this.form.comment,
        "post": this.post.id,
        "uid": this.uid,
        "mine": true,
        "userLiked": false,
      }
      this.addCommentToPost().then((newCommentProps) => {
        this.postComment.id = newCommentProps.key;
        this.addIDToComment().then(() => {
          this.comments.push(this.postComment);
          this.incrementPostCommentCount();
          this.form.comment = null;
          this.postComment = null;
        });
      });
    }
  }

  addCommentToPost() {
    let path = '/posts/' + this.post.id + '/comments';
    return this.firebase.push(path, this.postComment);
  }

  addIDToComment() {
    let path = '/posts/' + this.post.id + '/comments/' + this.postComment.id;
    return this.firebase.updateObject(path, this.postComment);
  }

  incrementPostCommentCount() {
    this.post.commentCount++;
    let path = '/posts/' + this.post.id + '/commentCount'
    this.firebase.setObject(path, this.post.commentCount);
  }

  toggleCommentLike(comment) {
    if (comment.userLiked) {
      this.checkIfUserLikedComment(comment, this.uid).first().subscribe((liker) => {
        this.unlikeComment(comment).then(() => {
          this.removeCommentLikerObject(liker);
        })
      });
    } else {
      console.log("User did not already like this comment");
      this.pushCommentLikerObject(comment).then(() => {
        this.likeComment(comment);
      })
    }
  }

  removeCommentLikerObject(liker) {
    let path = 'posts/' + this.post.id + '/comments/' + liker[0].comment + '/likers/' + liker[0].$key;
    return this.firebase.removeObject(path);
  }

  unlikeComment(comment) {
    if (comment.likeCount == 1) {
      comment.liked = false;
    }
    comment.userLiked = false;
    comment.likeCount--;
    let path = 'posts/' + this.post.id + '/comments/' + comment.id;
    return this.firebase.setObject(path, comment);
  }

  pushCommentLikerObject(comment) {
    let path = 'posts/' + this.post.id + '/comments/' + comment.id + '/likers/';
    console.log("Path is " + path);
    let likerObject = {
      "comment": comment.id,
      "uid": this.uid
    }
    return this.firebase.push(path, likerObject);
  }

  likeComment(comment) {
    console.log("About to like comment");
    comment.likeCount++;
    if (!comment.liked) {
      comment.liked = true;
    }
    comment.userLiked = true;
    let path = 'posts/' + this.post.id + '/comments/' + comment.id;
    console.log(comment);
    console.log("Path is " + path);
    return this.firebase.updateObject(path, comment);
  }

  deleteComment(comment) {
    console.log(this.comments);
    console.log("Deleting comment");
    console.log(comment);
    let path = '/posts/' + this.post.id + '/comments/' + comment.id;
    this.comments = this.comments.filter(item => item !== comment);
    console.log(this.comments);
    console.log("Path is " + path);
    this.firebase.removeObject(path).then(() => {
      console.log("Removed object");
      this.decrementPostCommentCount().then(() => {
      });
    });
  }

  decrementPostCommentCount() {
    this.post.commentCount--;
    let path = '/posts/' + this.post.id + '/commentCount'
    return this.firebase.setObject(path, this.post.commentCount);
  }
}
