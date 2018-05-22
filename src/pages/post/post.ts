import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import moment from 'moment';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/take';

import { ProfilePage } from '../profile/profile';
import { HomePage} from '../home/home';

import { FirebaseProvider } from '../../providers/firebase/firebase';

import { Comment } from '../../../test-data/comments/model';
import { Like } from '../../../test-data/likes/model';
import { Notification } from '../../../test-data/notifications/model';

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
  notificationRef: any;
  timestamp: number;
  postManagerMenu = false;
  mine = false;
  audio = false;
  reported = false;
  private = false;
  loaded = false;
  editor = false;
  deleting = false;
  commented = false;
  likedComment = false;
  commentsLoaded = false;
  postOpened = false;
  pastDue = false;
  dueIn24HoursOrLess = false;
  dueIn24HoursOrMore = false;
  commentForm: {
    description?: string
  } = {};

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private iab: InAppBrowser,
    private firebase: FirebaseProvider
  ) {
  }

  ionViewDidLoad() {
    this.id = this.navParams.get("id");
    this.collection = this.navParams.get("type");
    let opened = this.navParams.get("opened");
    this.postOpened = opened;
    this.loadPost();
    this.loadComments();
  }

  loadPost() {
    this.postPath = this.collection + '/' + this.id;
    this.postDoc = this.firebase.afs.doc(this.postPath);
    this.postDoc.valueChanges().subscribe((post) => {
      let date = moment.unix(post.timestamp);
      post.displayTimestamp = moment(date).fromNow();
      if (post.uid == this.firebase.afa.auth.currentUser.uid) this.mine = true;
      if (post.day == 'Monday') this.video = post.link;
      if (this.collection == 'goals' && post.url) this.audio = true;
      if (post.dueDate) {
        let dueDate = moment.unix(post.dueDate);
        post.displayDueDate = moment(dueDate).fromNow();
      }
      this.editor = this.firebase.user.editor;
      this.private = post.private;
      this.reported = post.reported;
      this.post = post;
      console.log(this.post);
      if (this.collection == 'goals') this.timestampGoal();
      this.loaded = true;
    });
  }

  timestampGoal() {
    this.timestamp = moment().unix();
    console.log("Timestamp is " + this.timestamp);
    console.log("Goal Due Date is " + this.post.dueDate);
    if (this.timestamp > this.post.dueDate) this.pastDue = true;
    if (this.timestamp + 86400 > this.post.dueDate && this.post.dueDate > this.timestamp) this.dueIn24HoursOrLess = true;
    if (this.post.dueDate > this.timestamp + 86400) this.dueIn24HoursOrMore = true;
    console.log("Past Due: " + this.pastDue);
    console.log("Due in 24 Hours or Less: " + this.dueIn24HoursOrLess);
    console.log("Due in 24 Hours or More: " + this.dueIn24HoursOrMore);
  }

  loadComments() {
    this.comments = [];
    let commentsPath = this.postPath + '/comments';
    this.commentsCol = this.firebase.afs.collection(commentsPath, ref => ref.
      orderBy('timestamp', 'asc'));
    this.commentsCol.valueChanges().subscribe((comments) => {
      if (!this.commentsLoaded) {
        this.setComments(comments);
        this.commentsLoaded = true;
      }
    });
  }

  setComments(comments) {
    this.comments = [];
    comments.forEach((comment) => {
      this.checkUserCommentLike(comment).subscribe((liked) => {
        if (liked) comment.liked = true;
        let date = moment.unix(comment.timestamp);
        comment.displayTimestamp = moment(date).fromNow();
        if (comment.uid == this.firebase.user.uid) comment.mine = true;
        if (!comment.pushed) this.comments.push(comment);
        comment.pushed = true;
      });
    });
  }

  checkUserCommentLike(comment) {
    return Observable.create((observer) => {
      let commentLikePath = this.post.collection + "/" + this.post.id + "/comments/" + comment.id + "/likes/" + this.firebase.user.uid;
      let commentLike = this.firebase.afs.doc(commentLikePath).valueChanges();
      commentLike.subscribe((like) => {
        if (like) observer.next(true);
        else observer.next(false);
      });
    });
  }

  markIncomplete() {
    this.firebase.afs.doc(this.postPath).update({ complete: false });
  }

  markComplete() {
    this.firebase.afs.doc(this.postPath).update({ complete: true });
  }

  togglePostManagerMenu() {
    this.postManagerMenu = !this.postManagerMenu;
  }

  toggleReported() {
    let action = 'report';
    if (this.reported) action = 'unreport';
    this.confirm(action).subscribe((confirmed) => {
      if (confirmed) {
        this.reported = !this.reported;
        this.navCtrl.setRoot(HomePage);
        this.firebase.afs.doc(this.postPath).update({ reported: this.reported });
      }
    });
  }

  togglePrivacy() {
    this.private = !this.private;
    this.navCtrl.setRoot(HomePage);
    this.firebase.afs.doc(this.postPath).update({ private: this.private });
  }

  deletePost() {
    this.deleting = true;
    this.confirm('delete').subscribe((confirmed) => {
      if (confirmed) {
        this.navCtrl.setRoot(HomePage);
        this.firebase.afs.doc(this.postPath).delete();
      }
    });
  }

  confirm(action) {
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

  submit(commentForm) {
    if (commentForm.description) {
      this.commented = true;
      this.buildComment(commentForm).subscribe((comment) => {
        commentForm.description = "";
        this.setComment(comment);
        if (this.post.uid !== this.firebase.user.uid) {
          comment.receiverUid = this.post.uid;
          this.sendNotification(comment);
        }
      });
    }
  }

  buildComment(commentForm) {
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
        description: commentForm.description,
        liked: false,
        likeCount: 0,
        displayTimestamp: displayTimestamp,
        timestamp: timestamp,
        uid: this.firebase.user.uid,
        name: this.firebase.user.name,
        face: this.firebase.user.photo
      }
      observer.next(comment);
    });
  }

  setComment(comment) {
    let newCommentPath = this.post.collection + '/' + this.post.id + '/comments/' + comment.id;
    this.firebase.afs.doc(newCommentPath).set(comment);
    comment.mine = true;
    let date = moment.unix(comment.timestamp);
    comment.displayTimestamp = moment(date).fromNow();
    this.comments.push(comment);
    this.addToCommentCount();
  }

  addToCommentCount() {
    let commentCount = ++this.post.commentCount;
    this.firebase.afs.doc(this.postPath).update({ commentCount: commentCount });
  }

  deleteComment(comment) {
    this.commented = true;
    this.commentsLoaded = false;
    let commentPath = this.post.collection + "/" + this.post.id + "/comments/" + comment.id;
    this.firebase.afs.doc(commentPath).delete();
    this.subtractFromCommentCount();
  }

  subtractFromCommentCount() {
    let commentCount = --this.post.commentCount;
    this.firebase.afs.doc(this.postPath).update({ commentCount: commentCount });
  }

  addCommentLike(comment) {
    comment.liked = true;
    this.likedComment = true;
    let commentLikePath = this.post.collection + "/" + this.post.id + "/comments/" + comment.id + "/likes/" + this.firebase.user.uid;
    this.buildCommentLike().subscribe((like) => {
      this.firebase.afs.doc(commentLikePath).set(like);
      this.addToCommentLikeCount(comment);
      if (comment.uid !== this.firebase.user.uid) {
        comment.receiverUid = comment.uid;
        this.sendNotification(comment);
      }
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
      observer.next(like);
    });
  }

  removeCommentLike(comment) {
    comment.liked = false;
    this.likedComment = true;
    let commentLikePath = this.post.collection + "/" + this.post.id + "/comments/" + comment.id + "/likes/" + this.firebase.user.uid;
    this.firebase.afs.doc(commentLikePath).delete();
    this.subtractFromCommentLikeCount(comment);
  }

  addToCommentLikeCount(comment) {
    let commentLikeCountPath = this.post.collection + "/" + this.post.id + "/comments/" + comment.id;
    let commentLikeCount = ++comment.likeCount;
    this.firebase.afs.doc(commentLikeCountPath).update({ likeCount: commentLikeCount });
  }

  subtractFromCommentLikeCount(comment) {
    let commentLikeCountPath = this.post.collection + "/" + this.post.id + "/comments/" + comment.id;
    let commentLikeCount = --comment.likeCount;
    this.firebase.afs.doc(commentLikeCountPath).update({ likeCount: commentLikeCount });
  }

  sendNotification(comment) {
    comment.notification = "";
    if (this.commented) comment.notification = "commented on your post";
    if (this.likedComment) comment.notification = "liked your comment";
    this.buildNotification(comment).subscribe((notification) => {
      let notificationPath = "notifications/" + notification.id;
      this.firebase.afs.doc(notificationPath).set(notification);
      this.commented = false;
      this.likedComment = false;
    });
  }

  buildNotification(comment) {
    return Observable.create((observer) => {
      let id = this.firebase.afs.createId();
      let displayTimestamp = moment().format('MMM DD YYYY');
      let timestamp = moment().unix();
      let notification: Notification = {
        id: id,
        uid: this.firebase.user.uid,
        name: this.firebase.user.name,
        face: this.firebase.user.photo,
        description: comment.notification,
        read: false,
        collection: this.post.collection,
        docId: this.post.id,
        receiverUid: comment.receiverUid,
        sendNow: false,
        message: false,
        pinLike: false,
        statementLike: false,
        goalLike: false,
        commentLike: this.likedComment,
        comment: this.commented,
        reminder: false,
        displayTimestamp: displayTimestamp,
        timestamp: timestamp
      }
      observer.next(notification);
    });
  }

  removeNotification() {
    let type = {
      comment: this.commented,
      likedComment: this.likedComment
    }
    this.notificationRef = this.firebase.afs.collection("notifications", ref => ref.
      where("docId", "==", this.post.id).
      where("comment", "==", type.comment).
      where("likedComment", "==", type.likedComment));
    this.notificationRef.valueChanges().subscribe((notifications) => {
      if (notifications.length > 0) {
        let notificationPath = "notifications/" + notifications[0].id;
        this.firebase.afs.doc(notificationPath).delete();
        this.commented = false;
        this.likedComment = false;
      }
    });
  }

  openLink(link) {
    this.iab.create(link, '_system');
  }

  viewUser(uid) {
    if (uid !== this.firebase.user.uid)
      this.navCtrl.push(ProfilePage, { uid: uid});
  }

}