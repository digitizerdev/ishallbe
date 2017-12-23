import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { UserPage } from '../user/user';

import { FirebaseProvider } from '../../providers/firebase/firebase';

import moment from 'moment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import { Storage } from '@ionic/storage/es2015/storage';

@IonicPage()
@Component({
  selector: 'page-pin',
  templateUrl: 'pin.html',
})
export class PinPage {

  uid: any;
  profile: any;
  pinID: string;
  pin: any;
  likedPin = false;
  pinComment: any;
  comments: any[] = [];
  form: {
    comment?: string
  } = {};
  submitted = false;
  refreshing = false

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public storage: Storage,
    public firebase: FirebaseProvider
  ) {
  }

  ionViewDidEnter() {
    this.loadPin('');
  }

  loadPin(refresh) {
    this.startRefresh(refresh);
    this.pinID = this.navParams.get('id');
    return this.makeProfileRequests().subscribe(() => {
      this.pin = [];
      return this.requestPin().first().subscribe((pin) => {
        this.pin = pin;
        this.presentPin();
        this.endRefresh(refresh);
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

  presentPin() {
    this.requestPinUserLikerObject().first().subscribe((liker) => {
      this.markPinLike(liker[0]);
      this.requestComments();
    });
  }

  makeProfileRequests() {
    return Observable.create((observer) => {
      return this.requestUID().then((uid) => {
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
    return this.storage.ready().then(() => {
      return this.storage.get(('uid'));
    });
  }

  requestProfile() {
    let path = '/users/' + this.uid;
    return this.firebase.object(path);
  }

  requestPin() {
    let path = '/pins/' + this.pinID;
    return this.firebase.object(path)
  }

  requestPinUserLikerObject() {
    let path = 'pins/' + this.pin.id + '/likers/';
    return this.firebase.query(path, 'uid', this.uid);
  }

  markPinLike(liker) {
    if (liker) {
      this.likedPin = true;
    } else {
      this.likedPin = false;
    }
  }

  requestComments() {
    if (this.pin.comments) {
      let path = 'pins/' + this.pin.id + '/comments/';
      this.firebase.orderList(path, 'rawTime').subscribe((comments) => {
        this.pushComments(comments);
      });
    }
  }

  pushComments(comments) {
    this.comments = [];
    comments.forEach((comment) => {
      if (comment.likers) {
        this.requestCommentUserLikerObject(comment).first().subscribe((liker) => {
          this.markCommentLike(liker[0], comment);
        });
      } else {
        this.markCommentMine(comment);
      }
    });
  }

  requestCommentUserLikerObject(comment) {
    let path = 'pins/' + this.pin.id + '/comments/' + comment.id + '/likers/';
    return this.firebase.query(path, 'uid', this.uid);
  }

  markCommentLike(liker, comment) {
    if (liker) {
      comment.userLiked = true;
    } else {
      comment.userLiked = false;
    }
    this.markCommentMine(comment);
  }

  markCommentMine(comment) {
    if (comment.uid == this.uid) {
      comment.mine = true;
    } else {
      comment.mine = false;
    }
    this.comments.push(comment);
  }

  togglePinLike() {
    if (this.likedPin) {
      this.requestPinUserLikerObject().subscribe((liker) => {
        this.removePinLikerObject(liker[0]).then(() => {
          if (this.pin.likeCount == 1) {
            this.unflagPinLike();
          }
          this.unlikePin();
        });
      });
    } else {
      this.likePin().subscribe(() => {
        this.pushPinLikerObject().then((pinLikeProps) => {
          let pinLikerID = pinLikeProps.key;
          this.addIDToPinLikerObject(pinLikerID);
        });
      });
    }
  }

  removePinLikerObject(liker) {
    let path = 'pins/' + this.pin.id + '/likers/' + liker.id;
    return this.firebase.object(path).remove();
  }

  unlikePin() {
    this.likedPin = false;
    let likeCount = --this.pin.likeCount;
    let pin = {
      "likeCount": likeCount
    }
    let path = 'pins/' + this.pin.id;
    return this.firebase.object(path).update(pin);
  }

  unflagPinLike() {
    let pin = {
      "liked": false,
    }
    let path = 'pins/' + this.pin.id;
    return this.firebase.object(path).update(pin);
  }

  pushPinLikerObject() {
    let path = 'pins/' + this.pin.id + '/likers/';
    let likerObject = {
      "pin": this.pin.id,
      "uid": this.uid
    }
    return this.firebase.list(path).push(likerObject);
  }

  addIDToPinLikerObject(pinLikerID) {
    let path = '/pins/' + this.pin.id + '/likers/' + pinLikerID;
    let liker = {
      id: pinLikerID
    }
    return this.firebase.object(path).update(liker);
  }

  likePin() {
    return Observable.create((observer) => {
      this.likedPin = true;
      let likeCount = ++this.pin.likeCount;
      let liked = true;
      let pin = {
        "likeCount": likeCount,
        "liked": liked
      }
      let path = 'pins/' + this.pin.id;
      return this.firebase.object(path).update(pin).then((obj) => {
        observer.next(obj)
      });
    });
  }

  submit(form) {
    this.submitted = true;
    if (form.comment) {
      this.submitted = false
      let path = '/pins/' + this.pin.id + '/comments/'
      let time = moment().format('MMM Do, YYYY h:mm A');
      let rawTime = moment().format('HHmmss');
      this.pinComment = {
        "name": this.profile.name,
        "face": this.profile.photo,
        "liked": false,
        "likeCount": 0,
        "time": time,
        "rawTime": rawTime,
        "content": this.form.comment,
        "pin": this.pin.id,
        "uid": this.uid,
        "mine": true,
        "userLiked": false,
      }
      this.addCommentToPin().then((newCommentProps) => {
        this.pinComment.id = newCommentProps.key;
        this.addIDToComment().then(() => {
          this.comments.push(this.pinComment);
          this.incrementPinCommentCount();
          this.form.comment = null;
          this.pinComment = null;
        });
      });
    }
  }

  addCommentToPin() {
    let path = '/pins/' + this.pin.id + '/comments';
    return this.firebase.list(path).push(this.pinComment);
  }

  addIDToComment() {
    let path = '/pins/' + this.pin.id + '/comments/' + this.pinComment.id;
    return this.firebase.object(path).update(this.pinComment);
  }

  incrementPinCommentCount() {
    this.pin.commentCount++;
    let path = '/pins/' + this.pin.id + '/commentCount'
    this.firebase.object(path).set(this.pin.commentCount);
  }

  toggleCommentLike(comment) {
    if (comment.userLiked) {
      this.requestCommentUserLikerObject(comment).subscribe((liker) => {
        this.removeCommentLikerObject(liker[0]).then(() => {
          this.unlikeComment(comment);
        });
      });
    } else {
      this.likeComment(comment).then(() => {
        this.pushCommentLikerObject(comment).then((liker) => {
          this.addIDToCommentLike(liker.key, comment);
        });
      });
    }
  }

  removeCommentLikerObject(liker) {
    let path = 'pins/' + this.pin.id + '/comments/' + liker.comment + '/likers/' + liker.id;
    return this.firebase.object(path).remove();
  }

  unlikeComment(comment) {
    if (comment.likeCount == 1) {
      comment.liked = false;
    }
    comment.userLiked = false;
    comment.likeCount--;
    let path = 'pins/' + this.pin.id + '/comments/' + comment.id;
    return this.firebase.object(path).set(comment);
  }

  pushCommentLikerObject(comment) {
    let path = 'pins/' + this.pin.id + '/comments/' + comment.id + '/likers/';
    let likerObject = {
      "comment": comment.id,
      "uid": this.uid
    }
    return this.firebase.list(path).push(likerObject);
  }

  likeComment(comment) {
    comment.likeCount++;
    if (!comment.liked) {
      comment.liked = true;
    }
    comment.userLiked = true;
    let path = 'pins/' + this.pin.id + '/comments/' + comment.id;
    return this.firebase.object(path).update(comment);
  }

  addIDToCommentLike(commentLikerID, comment) {
    let path = '/pins/' + this.pin.id + '/comments/' + comment.id + '/likers/' + commentLikerID;
    let likerObject = {
      id: commentLikerID
    }
    return this.firebase.object(path).update(likerObject);
  }

  deleteComment(comment) {
    let path = '/pins/' + this.pin.id + '/comments/' + comment.id;
    this.comments = this.comments.filter(item => item !== comment);
    this.firebase.object(path).remove().then(() => {
      this.decrementPinCommentCount().then(() => {
      });
    });
  }

  decrementPinCommentCount() {
    this.pin.commentCount--;
    let path = '/pins/' + this.pin.id + '/commentCount'
    return this.firebase.object(path).set(this.pin.commentCount);
  }

  reportPin() {
    let alert = this.alertCtrl.create({
      title: 'Hold It!',
      message: 'Do you really want to report this pin?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            this.flagPin().then(() => {
              this.removeFromFeed();
            });
          }
        }
      ]
    });
    alert.present();
  }

  flagPin() {
    let path = "/flagged/"
    return this.firebase.list(path).push(this.pin);
  }

  removeFromFeed() {
    let path = "/pins/" + this.pin.id;
    let pin = {
      flagged: true,
      onFeed: false
    }
    return this.firebase.object(path).update(pin)
  }
  viewUser(uid) {
    this.navCtrl.push(UserPage, { uid: uid })
  }

  openLink(url) {
    open(url)
  }

}
