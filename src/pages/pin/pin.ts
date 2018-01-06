import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

import { ProfilePage } from '../profile/profile';

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

  commentForm: {
    comment?: string
  } = {};
  comments: any;
  likedPin: any;
  submitted: any;
  refreshing: any;
  loaded: any;
  loading: any;
  uid: any;
  profile: any;
  pinID: string;
  pin: any;
  pinComment: any;
  title: any;
  mine: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private youtube: YoutubeVideoPlayer,
    public storage: Storage,
    public firebase: FirebaseProvider
  ) {
  }

  ionViewDidEnter() {
    this.setFlags();
    this.comments = [];
    this.loadProfile().subscribe(() => {
      this.loadPin('');
    });
  }

  setFlags() {
    this.loaded = false;    
    this.likedPin = false;
    this.submitted = false;
    this.refreshing = false;
  }


  loadProfile() {
    return Observable.create((observer) => {
      return this.requestUID().then((uid) => {
        this.uid = uid;
        this.profile = [];
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
    return this.firebase.object(path);
  }

  loadPin(refresh) {
    this.setFlags();
    this.startRefresh(refresh);
    this.pinID = this.navParams.get('id');
    this.pin = [];
    this.requestPin().subscribe((pin) => {
      if (!this.loaded) {
        this.pin = pin;
        this.checkIfPinMine();                        
        this.title = pin.displayTime;
        this.presentPin(refresh);
      }
    });
  }
  startRefresh(refresh) {
    if (refresh) {
      this.refreshing = true;
    }
  }

  requestPin() {
    let path = '/pins/' + this.pinID;
    return this.firebase.object(path)
  }

  checkIfPinMine() {
    console.log("Checking if this pin is mine");
    if (this.uid == this.pin.uid) {
      console.log("This pin is mine");
      this.mine = true;
    }
  }

  removePin() {
    let path = '/pins/' + this.pin.id
    this.firebase.object(path).remove().then(() => {
      this.navCtrl.setRoot(ProfilePage);
    });
  }

  presentPin(refresh) {
    this.loaded = true;
    this.endRefresh(refresh);
    this.requestPinUserLikerObject().subscribe((liker) => {
      this.markPinLike(liker[0]);
      this.requestComments();
    });
  }

  requestPinUserLikerObject() {
    let path = 'pins/' + this.pin.id + '/likers/';
    return this.firebase.queriedList(path, 'uid', this.uid);
  }

  markPinLike(liker) {
    if (liker) {
      this.likedPin = true;
    } else {
      this.likedPin = false;
    }
  }

  endRefresh(refresh) {
    if (refresh) {
      refresh.complete();
    }
  }

  requestComments() {
    if (this.pin.comments) {
      this.pin.comments = [];                    
      this.comments = [];
      let path = 'pins/' + this.pin.id + '/comments/';
      this.firebase.orderedList(path, 'rawTime').subscribe((comments) => {
        this.pushComments(comments);
      });
    }
  }

  pushComments(comments) {
    comments.forEach((comment) => {
      if (comment.likers) {
        this.requestCommentUserLikerObject(comment).subscribe((liker) => {
          this.markCommentLike(liker[0], comment);
        });
      } else {
        comment.userLiked = false;
        this.markCommentMine(comment);
      }
    });
  }

  requestCommentUserLikerObject(comment) {
    let path = 'pins/' + this.pin.id + '/comments/' + comment.id + '/likers/';
    return this.firebase.queriedList(path, 'uid', this.uid);
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
      if (this.pin.likeCount == 0) {
        this.pin.liked = false;
      }
      this.unlikePin().subscribe(() => {
        this.requestPinUserLikerObject().subscribe((liker) => {
          this.removePinLikerObject(liker[0]).then(() => {
          });
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
    return Observable.create((observer) => {
      this.likedPin = false;
      this.pin.likeCount--;
      let pin = {
        "likeCount": this.pin.likeCount,
        "liked": this.pin.liked
      }
      let path = 'pins/' + this.pin.id;
      return this.firebase.object(path).update(pin).then(() => {
        observer.next();
      });
    });
  }

  likePin() {
    return Observable.create((observer) => {
      this.likedPin = true;
      this.pin.likeCount++;
      this.pin.liked = true;
      let pin = {
        "likeCount": this.pin.likeCount,
        "liked": this.pin.liked
      }
      let path = 'pins/' + this.pin.id;
      return this.firebase.object(path).update(pin).then((obj) => {
        observer.next(obj)
      });
    });
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

  submit(commentForm) {
    this.submitted = true;
    if (commentForm.comment) {
      this.prepComment(commentForm).subscribe(() => {
        this.publishComment().subscribe(() => {
          this.comments.push(this.pinComment);
          commentForm.comment = null;
          this.pinComment = null;
        });
      });
    }
  }

  prepComment(commentForm) {
    return Observable.create((observer) => {
      let path = '/pins/' + this.pin.id + '/comments/'
      let time = moment().format('MMMM D h:mma')
      let rawTime = moment().format('YYYYMMDDHHMMSS');
      this.pinComment = {
        "name": this.profile.name,
        "face": this.profile.photo,
        "liked": false,
        "likeCount": 0,
        "time": time,
        "rawTime": rawTime,
        "content": commentForm.comment,
        "pin": this.pin.id,
        "uid": this.uid,
        "mine": true,
        "userLiked": false,
      }
      observer.next();
    });
  }

  publishComment() {
    return Observable.create((observer) => {
      return this.addCommentToPin().then((newCommentProps) => {
        this.pinComment.id = newCommentProps.key;
        return this.addIDToComment().then(() => {
          return this.incrementPinCommentCount().then(() => {
            this.submitted = false;
            observer.next();
          });
        });
      });
    });
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
    return this.firebase.object(path).set(this.pin.commentCount);
  }

  toggleCommentLike(comment) {
    if (comment.userLiked) {
      if (comment.likeCount == 0) {
        comment.liked = false;
      }        
      this.unlikeComment(comment).subscribe(() => {
        this.requestCommentUserLikerObject(comment).subscribe((liker) => {
          this.removeCommentLikerObject(liker[0]).then(() => {
            comment.userLiked = false;
          });
        });
      });
    } else {
      this.likeComment(comment).subscribe(() => {
        this.pushCommentLikerObject(comment).then((liker) => {
          this.addIDToCommentLike(liker.key, comment);
          comment.userLiked = true;          
        });
      });
    }
  }

  unlikeComment(comment) {
    return Observable.create((observer) => {
      comment.likeCount--;      
      let myComment = {
        likeCount: comment.likeCount
      }
      let path = 'pins/' + this.pin.id + '/comments/' + comment.id;
      return this.firebase.object(path).update(myComment).then(() => {
        observer.next();
      });
    });
  }

  removeCommentLikerObject(liker) {
    let path = 'pins/' + this.pin.id + '/comments/' + liker.comment + '/likers/' + liker.id;
    return this.firebase.object(path).remove();
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
    return Observable.create((observer) => {
      comment.likeCount++;
      if (!comment.liked) {
        comment.liked = true;
      }
      let path = 'pins/' + this.pin.id + '/comments/' + comment.id;
      return this.firebase.object(path).update(comment).then(() => {
        observer.next();
      });
    });
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
  viewProfile(uid) {
    this.navCtrl.push(ProfilePage, { uid: uid })
  }

  openLink(url) {
    open(url)
  }

  playYoutube(id) {
    console.log("Playing youtube");
    console.log("ID is " + id);
    this.youtube.openVideo(id);
  }
}