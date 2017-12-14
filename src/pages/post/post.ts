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
    return this.makeProfileRequests().first().subscribe(() => {
      this.post = [];
      return this.requestPost().first().subscribe((post) => {
        this.post = post;
        return this.checkIfUserLikedPost().first().subscribe((liker) => {
          this.markPostLike(liker);
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

  checkIfUserLikedPost() {
    let path = 'posts/' + this.post.id + '/likers/';
    return this.firebase.query(path, 'uid', this.uid);
  }

  markPostLike(liker) {
    if (liker) {
      this.likedPost = true;
    } else {
      this.likedPost = false;
    }
  }

  makeCommentsRequests() {
    if (this.post.comments) {
      let path = 'posts/' + this.post.id + '/comments/';      
      this.firebase.orderList(path, 'rawTime').subscribe((comments) => {
        this.prepComments(comments);
      });
    }
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
      this.checkIfUserLikedPost().first().subscribe((liker) => {
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
    let likerObject = {
      "comment": comment.id,
      "uid": this.uid
    }
    return this.firebase.push(path, likerObject);
  }

  likeComment(comment) {
    comment.likeCount++;
    if (!comment.liked) {
      comment.liked = true;
    }
    comment.userLiked = true;
    let path = 'posts/' + this.post.id + '/comments/' + comment.id;
    return this.firebase.updateObject(path, comment);
  }

  deleteComment(comment) {
    let path = '/posts/' + this.post.id + '/comments/' + comment.id;
    this.comments = this.comments.filter(item => item !== comment);
    this.firebase.removeObject(path).then(() => {
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
