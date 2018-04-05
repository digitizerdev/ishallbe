import { Component, Input } from '@angular/core';

import moment from 'moment';
import { Observable } from 'rxjs';

import { FirebaseProvider } from '../../providers/firebase/firebase';

import { Like } from '../../../test-data/likes/model';
import { Notification } from '../../../test-data/notifications/model';

@Component({
  selector: 'post-footer',
  templateUrl: 'post-footer.html'
})
export class PostFooterComponent {
  @Input('postDoc') postDoc;
  post: any;
  postLike: any;
  notificationRef: any;
  liked = false;
  loaded = false;

  constructor(
    private firebase: FirebaseProvider
  ) { }

  ngAfterViewInit() {
    let postPath = this.postDoc.collection + "/" + this.postDoc.id;
    let postFooter = this.firebase.afs.doc(postPath);
    postFooter.valueChanges().subscribe((post) => {
      this.post = post;
    });
    this.checkUserPostLike().subscribe((liked) => {
      if (liked) this.liked = true;
      else this.liked = false;
    });
  }

  checkUserPostLike() {
    return Observable.create((observer) => {
      let postLikePath = this.postDoc.collection + "/" + this.postDoc.id + "/likes/" + this.firebase.user.uid;
      let postLike = this.firebase.afs.doc(postLikePath).valueChanges();
      postLike.subscribe((like) => {
        if (like) observer.next(true);
        else observer.next(false);
      });
    });
  }

  toggleLike() {
    if (!this.liked) this.addLike();
    else this.removeLike();
  }

  addLike() {
    this.liked = true;
    ++this.post.likeCount;
    let type = this.setPostType();
    this.postLike = {
      postId: this.post.id,
      pin: type.pin,
      statement: type.statement,
      goal: type.goal
    }
    this.addPostLike(this.postLike).subscribe(() => {
      this.updatePost();
      if (this.post.uid !== this.firebase.user.uid)
        this.sendNotification();
    });
  }

  setPostType() {
    let type = {
      pin: false,
      statement: false,
      goal: false
    }
    switch (this.post.collection) {
      case 'pins': type.pin = true;
        break;
      case 'statements': type.statement = true;
        break;
      case 'goals': type.goal = true;
    }
    return type;
  }

  addPostLike(postLike) {
    return Observable.create((observer) => {
      return this.buildPostLike(postLike).subscribe((like) => {
        let postLikePath = this.post.collection + "/" + this.post.id + "/likes/" + this.firebase.user.uid;
        this.firebase.afs.doc(postLikePath).set(like).then(() => {
          observer.next();
        });
      });
    });
  }

  buildPostLike(postLike) {
    return Observable.create((observer) => {
      let displayTimestamp = moment().format('MMM D YYYY h:mmA');
      let timestamp = moment().unix();
      let id = this.firebase.afs.createId();
      let like: Like = {
        id: id,
        postId: postLike.postId,
        pin: postLike.pin,
        statement: postLike.statement,
        goal: postLike.goal,
        comment: false,
        displayTimestamp: displayTimestamp,
        timestamp: timestamp,
        uid: this.firebase.user.uid,
        name: this.firebase.user.name,
        face: this.firebase.user.photo
      }
      observer.next(like);
    });
  }

  updatePost() {
    let likePath = this.post.collection + '/' + this.post.id;
    this.firebase.afs.doc(likePath).update({
      likeCount: this.post.likeCount
    });
  }

  removeLike() {
    this.liked = false;
    --this.post.likeCount;
    this.removePostLike().subscribe(() => {
      this.updatePost();
      if (this.post.uid !== this.firebase.user.uid)
        this.removeNotification();
    })
  }

  removePostLike() {
    return Observable.create((observer) => {
      let postLikePath = this.post.collection + "/" + this.post.id + "/likes/" + this.firebase.user.uid;
      return this.firebase.afs.doc(postLikePath).delete().then(() => {
        observer.next();
      })
    });
  }

  sendNotification() {
    console.log("Sending Notification");
    let description = ""
    if (this.postLike.pin)
      description = "liked your pin"
    if (this.postLike.statement)
      description = "liked your statement"
    if (this.postLike.goal)
      description = "liked your goal"
    console.log(description);
    this.buildNotification(description).subscribe((notification) => {
      let notificationPath = "notifications/" + notification.id;
      console.log("Notification path is " + notificationPath);
      this.firebase.afs.doc(notificationPath).set(notification);
    });
  }

  buildNotification(description) {
    console.log("Building Notification");
    return Observable.create((observer) => {
      let id = this.firebase.afs.createId();
      let displayTimestamp = moment().format('MMM DD YYYY');
      let timestamp = moment().unix();
      let pinLike = false;
      let statementLike = false;
      let goalLike = false;
      if (this.postLike.pin) pinLike = true;
      if (this.postLike.statement) statementLike = true;
      if (this.postLike.goal) goalLike = true;
      let notification: Notification = {
        id: id,
        uid: this.firebase.user.uid,
        name: this.firebase.user.name,
        face: this.firebase.user.photo,
        description: description,
        read: false,
        collection: this.post.collection,
        docId: this.post.id,
        receiverUid: this.post.uid,
        message: false,
        pinLike: pinLike,
        pinComment: false,
        pinCommentLike: false,
        statementLike: statementLike,
        statementComment: false,
        statementCommentLike: false,
        goalLike: goalLike,
        goalComment: false,
        goalCommentLike: false,
        reminder: false,
        displayTimestamp: displayTimestamp,
        timestamp: timestamp
      }
      console.log("Notification Built");
      console.log(notification);
      observer.next(notification);
    });
  }

  removeNotification() {
    console.log("Removing Notification");
    let type = this.setPostType();
    console.log("Type is ");
    console.log(type);
    this.notificationRef = this.firebase.afs.collection("notifications", ref => ref.
      where("docId", "==", this.post.id).
      where("pinLike", "==", type.pin).
      where("statementLike", "==", type.statement).
      where("goalLike", "==", type.goal));
    this.notificationRef.valueChanges().subscribe((notifications) => {
      console.log("Got notifications");
      console.log(notifications);
      if (notifications.length > 0) {
        let notificationPath = "notifications/" + notifications[0].id;
        console.log("Notification path is " + notificationPath);
        this.firebase.afs.doc(notificationPath).delete();
      }
    });
  }
}
