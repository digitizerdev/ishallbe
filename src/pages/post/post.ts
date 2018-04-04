import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import moment from 'moment';
import { Observable } from 'rxjs';

import { FirebaseProvider } from '../../providers/firebase/firebase';

import { Comment } from '../../../test-data/comments/model';
import { Like } from '../../../test-data/likes/model';

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {
  id: string;
  collection: string;
  postPath: string;
  postDoc: any;
  commentsCol: any;
  comments: any;
  post: any;
  video: any;
  newComment: string;
  postManagerMenu = false;
  mine = false;
  audio = false;
  reported = false;
  private = false;
  loaded = false;
  commentsLoaded = false;
  editor = false;
  deleting = false;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private firebase: FirebaseProvider
  ) {
  }

  ionViewDidLoad() {
    console.log("Loaded Post Page");
    this.id = this.navParams.get("id");
    console.log("Post Id is " + this.id);
    this.collection = this.navParams.get("type");
    console.log("Post type is " + this.collection);
    this.loadPost();
    this.loadComments();
  }

  loadPost() {
    console.log("Loading Post");
    this.postPath = this.collection + '/' + this.id;
    console.log("Post path is " + this.postPath);
    this.postDoc = this.firebase.afs.doc(this.postPath);
    this.postDoc.valueChanges().subscribe((post) => {
      console.log("Got Post on Post Page");
      console.log(post);
      let date = moment.unix(post.timestamp);
      post.displayTimestamp = moment(date).fromNow();
      if (post.uid == this.firebase.afa.auth.currentUser.uid) this.mine = true;
      if (post.day == 'Monday') this.video = post.link;
      if (this.collection == 'goals' && post.url) this.audio = true;
      this.editor = this.firebase.user.editor;
      this.private = post.private;
      this.reported = post.reported;
      this.post = post;
      this.loaded = true;
    });
  }

  loadComments() {
    console.log("Loading Comments");
    this.comments = [];
    let commentsPath = this.postPath + '/comments';
    console.log("Comments path is " + commentsPath);
    this.commentsCol = this.firebase.afs.collection(commentsPath, ref => ref.
      orderBy('timestamp', 'asc'));
    this.commentsCol.valueChanges().subscribe((comments) => {
      this.comments = [];
      console.log("Got comments");
      console.log(comments);
      this.setComments(comments);
    });
  }

  setComments(comments) {
    this.comments = [];
    comments.forEach((comment) => {
      this.checkUserCommentLike(comment).subscribe((liked) => {
        console.log("Liked: " + liked);
        if (liked) comment.liked = true;
        let date = moment.unix(comment.timestamp);
        comment.displayTimestamp = moment(date).fromNow();
        if (comment.uid == this.firebase.user.uid) comment.mine = true;
        console.log("Pushing Comment");
        console.log(comment);
        this.comments.push(comment);
      })
    });
    this.commentsLoaded = true;
  }

  checkUserCommentLike(comment) {
    console.log("Checking User Comment Like");
    return Observable.create((observer) => {
      let commentLikePath = this.post.collection + "/" + this.post.id + "/comments/" + comment.id + "/likes/" + this.firebase.user.uid;
      console.log("Comment like path is " + commentLikePath);
      let commentLike = this.firebase.afs.doc(commentLikePath).valueChanges();
      commentLike.subscribe((like) => {
        if (like) observer.next(true);
        else observer.next(false);
      });
    });
  }
  
  togglePostManagerMenu() {
    this.postManagerMenu = !this.postManagerMenu;
  }

  toggleReported() {
    console.log("Reporting Post");
    let action = 'report';
    if (this.reported) action = 'unreport';
    this.confirm(action).subscribe((confirmed) => {
      if (confirmed) {
        this.reported = !this.reported;
        this.firebase.afs.doc(this.postPath).update({ reported: this.reported });
      }
    });
  }

  togglePrivacy() {
    console.log("Toggling Privacy");
    console.log("Post private: " + this.private);
    this.private = !this.private;
    this.firebase.afs.doc(this.postPath).update({ private: this.private }).then(() => {
      this.navCtrl.pop();
    });
  }

  deletePost() {
    console.log("Deleting Post");
    this.deleting = true;
    this.confirm('delete').subscribe((confirmed) => {
      if (confirmed) {
        this.firebase.afs.doc(this.postPath).delete().then(() => {
          this.navCtrl.pop();
        });
      }
    });
  }

  confirm(action) {
    console.log("Confirming");
    return Observable.create((observer: any) => {
      let message = "Are you sure you want to " + action + " this post?";
      let alert = this.alertCtrl.create({
        title: 'Hold It!',
        message: message,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              observer.next(false);
            }
          },
          {
            text: 'Confirm',
            handler: () => {
              observer.next(true);
            }
          }
        ]
      });
      alert.present();
    });
  }

  sendComment(comment) {
    console.log("Sending Comment");
    console.log(comment);
    this.buildComment(comment).subscribe((comment) => {
      this.setComment(comment);
    });
  }

  buildComment(newComment) {
    console.log("Building Comment");
    return Observable.create((observer) => {
      let commentId = this.firebase.afs.createId();
      let pin = false;
      let goal = false;
      let statement = false;
      if (this.collection == 'pins') pin = true;
      if (this.collection == 'goals') goal = true;
      if (this.collection == 'statements') statement = true;
      let displayTimestamp = moment().format('MMM D YYYY');
      let timestamp = moment().unix();
      const comment: Comment = {
        id: commentId,
        pin: pin,
        goal: goal,
        statement: statement,
        collectionId: this.post.id,
        description: newComment,
        liked: false,
        likeCount: 0,
        displayTimestamp: displayTimestamp,
        timestamp: timestamp,
        uid: this.firebase.user.uid,
        name: this.firebase.user.name,
        face: this.firebase.user.photo
      }
      console.log("Comment Built");
      console.log(comment);
      observer.next(comment);
    });
  }
  
  setComment(comment) {
    console.log("Setting Comment");
    let newCommentPath = this.post.collection + '/' + this.post.id + '/comments/' + comment.id;
    console.log("New Comment Path is " + newCommentPath);
    this.firebase.afs.doc(newCommentPath).set(comment);
    this.addToCommentCount();
    this.newComment = "";
  }

  addToCommentCount() {
    console.log("Adding to comment count");
    console.log("Post path is " + this.postPath);
    let commentCount = ++this.post.commentCount;
    console.log("New comment count is " + commentCount);
    this.firebase.afs.doc(this.postPath).update({ commentCount: commentCount });
  }

  deleteComment(comment) {
    console.log("Deleting Comment");
    console.log(comment);
    let commentPath = this.post.collection + "/" + this.post.id + "/comments/" + comment.id;
    console.log("Comment path is " + commentPath);
    this.firebase.afs.doc(commentPath).delete();
    this.subtractFromCommentCount();
  }

  subtractFromCommentCount() {
    console.log("Subtracting to comment count");
    console.log("Post path is " + this.postPath);
    let commentCount = --this.post.commentCount;
    console.log("New comment count is " + commentCount);
    this.firebase.afs.doc(this.postPath).update({ commentCount: commentCount });
  }

  addCommentLike(comment) {
    console.log("Adding Comment Like");
    comment.liked = true;
    let commentLikePath = this.post.collection + "/" + this.post.id + "/comments/" + comment.id + "/likes/" + this.firebase.user.uid;
    console.log("Comment like path is " + commentLikePath);
    this.buildCommentLike().subscribe((like) => {
      this.firebase.afs.doc(commentLikePath).set(like);
      this.addToCommentLikeCount(comment);
    });
  }

  buildCommentLike() {
    return Observable.create((observer) => {
      let displayTimestamp = moment().format('MMM D YYYY h:mmA');
      let timestamp = moment().unix();
      let id = this.firebase.afs.createId();
      let like: Like = {
        id: id,
        postId: this.post.id,
        pin: false,
        statement: false,
        goal: false,
        comment: true,
        displayTimestamp: displayTimestamp,
        timestamp: timestamp,
        uid: this.firebase.user.uid,
        name: this.firebase.user.name,
        face: this.firebase.user.photo
      }
      console.log("Like Built");
      console.log(like);
      observer.next(like);
    });
  }

  removeCommentLike(comment) {
    console.log("Removing Comment Like");
    comment.liked = false;
    let commentLikePath = this.post.collection + "/" + this.post.id + "/comments/" + comment.id + "/likes/" + this.firebase.user.uid;
    console.log("Comment like path is " + commentLikePath);
    this.firebase.afs.doc(commentLikePath).delete();
    this.subtractFromCommentLikeCount(comment);
  }

  addToCommentLikeCount(comment) {
    console.log("Adding to comment like count");
    let commentLikeCountPath = this.post.collection + "/" + this.post.id + "/comments/" + comment.id;
    console.log("Comment like count path is " + commentLikeCountPath);
    let commentLikeCount = ++comment.likeCount;
    this.firebase.afs.doc(commentLikeCountPath).update({ likeCount: commentLikeCount });
  }

  subtractFromCommentLikeCount(comment) {
    console.log("Subtracting from comment like count");
    let commentLikeCountPath = this.post.collection + "/" + this.post.id + "/comments/" + comment.id;
    console.log("Comment like count path is " + commentLikeCountPath);
    let commentLikeCount = --comment.likeCount;
    this.firebase.afs.doc(commentLikeCountPath).update({ likeCount: commentLikeCount });
  }
}