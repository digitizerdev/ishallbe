import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Moment, lang } from 'moment';
import { Observable } from 'rxjs/Observable';
import moment from 'moment';

import { ProfilePage } from '../profile/profile';
import { PostPage } from '../post/post';
import { UserPage } from '../user/user';
import { LoginPage } from '../login/login';
import { StatementPage } from '../statement/statement';
import { PinPage } from '../pin/pin';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  pins: any[] = [];
  posts: any[] = [];
  uid: any;
  refreshing: any;
  feedTimestamp: any;
  saturday: any;
  sunday: any;
  pinsQuery: any;
  postsQuery: any;
  loader: any;
  pinsLoaded: any;
  postLimit: any;
  postsLoaded: any;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private firebase: FirebaseProvider,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private storage: Storage,
  ) {
  }

  ionViewDidLoad() {
    console.log("View entered");
    this.pinsLoaded = false;
    this.postLimit = 1;
    this.postsLoaded = false;
    console.log("Posts are ");
    console.log(this.posts);
    console.log("Pins loaded: " + this.pinsLoaded);
    console.log("Post limit: " + this.postLimit);
    console.log("Posts loaded: " + this.postsLoaded);
    this.requestUID().then((uid) => {
      this.uid = uid;
      this.loadHome();
    });
  }

  requestUID() {
    return this.storage.ready().then(() => {
      return this.storage.get('uid');
    });
  }

  refreshPage(refresh) {
    this.posts = [];
    this.pins = [];
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  loadHome() {
    this.checkIfProfileBlocked();
    this.startLoader();
    this.timestampFeed().subscribe(() => {
      this.setWeekend();
      this.loadPins();        
      this.posts = [];
      if (this.postsLoaded || this.postLimit > 1) {
        console.log("Setting post limit to 25")
        this.postLimit = 25;
        this.postsLoaded = true;
      }
      this.loadPosts();
    });
  }

  startLoader() {
    this.loader = this.loadingCtrl.create({
      content: 'Loading...'
    });
  }

  timestampFeed() {
    return Observable.create((observer) => {
      let time = moment().format('MMMM D h:mma')
      let date = moment().format('YYYYMMDD');
      let day = moment().format('dddd');
      let dayNumberString = moment().format('d');
      let dayNumber = parseInt(dayNumberString);
      this.feedTimestamp = { time: time, date: date, day: day, dayNumber: dayNumber }
      observer.next()
    });
  }

  setWeekend() {
    if (this.feedTimestamp.day == 'Saturday') { this.saturday = true; }
    if (this.feedTimestamp.day == 'Sunday') { this.sunday = true; }
  }

  loadPins() {
    if (!this.pinsLoaded) {
      this.pins = [];      
      this.preparePinsRequest().subscribe((queryParameters) => {
        this.pinsQuery = queryParameters;
        this.requestPins().subscribe((pins) => {
          this.pinsLoaded = true;
          this.presentPins(pins);
        });
      });
    }
  }

  preparePinsRequest() {
    return Observable.create((observer) => {
      let queryParameters = {
        path: '/pins/',
        orderByValue: 'date',
        limitToLast: this.feedTimestamp.dayNumber
      }
      observer.next(queryParameters)
    });
  }

  requestPins() {
    if (this.pinsLoaded) {
      return this.firebase.list('/pins/')      
    } else {
      return this.firebase.list('/pins/').take(1);
    }
  }

  presentPins(pins) {
    this.pins = [];
    pins.forEach((pin) => {
      this.requestPinUserLikerObject(pin).subscribe((liker) => {
        if (liker[0]) {
          pin.userLiked = true;
        } else {
          pin.userLiked = false;
        }
        this.pins.push(pin);
      });
    });
  }

  requestPinUserLikerObject(pin) {
    let path = 'pins/' + pin.id + '/likers/';
    return this.firebase.queriedList(path, 'uid', this.uid);
  }

  togglePinLike(pin) {
    if (pin.userLiked) {
      this.requestPinUserLikerObject(pin).subscribe((liker) => {
        this.removePinLikerObject(liker[0], pin).then(() => {
          if (pin.likeCount == 1) {
            this.unflagPinLike(pin);
          }
          this.unlikePin(pin);
        });
      });
    } else {
      this.likePin(pin).subscribe(() => {
        this.pushPinLikerObject(pin).then((pinLikeProps) => {
          let pinLikerID = pinLikeProps.key;
          this.addIDToPinLikerObject(pinLikerID, pin);
        });
      });
    }
  }

  removePinLikerObject(liker, pin) {
    let path = 'pins/' + pin.id + '/likers/' + liker.id;
    return this.firebase.object(path).remove();
  }

  unlikePin(myPin) {
    myPin.userLiked = false;
    let likeCount = --myPin.likeCount;
    let pin = {
      "likeCount": likeCount
    }
    let path = 'pins/' + myPin.id;
    return this.firebase.object(path).update(pin);
  }

  unflagPinLike(myPin) {
    let pin = {
      "liked": false,
    }
    let path = 'pins/' + myPin.id;
    return this.firebase.object(path).update(pin);
  }

  pushPinLikerObject(myPin) {
    let path = 'pins/' + myPin.id + '/likers/';
    let likerObject = {
      "pin": myPin.id,
      "uid": this.uid
    }
    return this.firebase.list(path).push(likerObject);
  }

  addIDToPinLikerObject(pinLikerID, myPin) {
    let path = '/pins/' + myPin.id + '/likers/' + pinLikerID;
    let liker = {
      id: pinLikerID
    }
    return this.firebase.object(path).update(liker);
  }

  likePin(myPin) {
    return Observable.create((observer) => {
      myPin.liked = true;
      myPin.userLiked = true;
      let likeCount = ++myPin.likeCount;
      let liked = true;
      let pin = {
        "likeCount": likeCount,
        "liked": liked
      }
      let path = 'pins/' + myPin.id;
      return this.firebase.object(path).update(pin).then((obj) => {
        observer.next(obj)
      });
    });
  }

  checkIfProfileBlocked() {
    this.requestProfile().subscribe((profile) => {
      if (profile.blocked) {
        this.handleBlocked();
      }
    });
  }

  loadPosts() {
    this.preparePostsRequest().subscribe((queryParameters) => {
      this.postsQuery = queryParameters
      this.requestPosts().subscribe((posts) => {
        if (this.postLimit == 25) {
          console.log("Reversing posts");
          posts.reverse();
        }
        console.log("Presenting posts");
        console.log(posts)
        this.presentPosts(posts);
      });
    });
  }

  requestPosts() {
    return this.firebase.limitedList(this.postsQuery)
  }

  preparePostsRequest() {
    return Observable.create((observer) => {
      let queryParameters = {
        path: '/posts/',
        orderByValue: 'rawTime',
        limitToLast: this.postLimit,
      }
      observer.next(queryParameters)
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

  requestProfile() {
    let path = '/users/' + this.uid;
    return this.firebase.object(path);
  }

  handleBlocked() {
    this.navCtrl.setRoot(LoginPage);
    this.presentBlocked();
  }

  presentBlocked() {
    let alert = this.alertCtrl.create({
      title: 'Fail',
      message: 'This account has been blocked',
      buttons: [
        {
          text: 'Okay',
        }
      ]
    });
    alert.present();
  }

  presentPosts(posts) {
    this.posts = [];
    console.log("Posts array before push");
    console.log(this.posts);
    posts.forEach((post) => {
      this.requestPostUserLikerObject(post).subscribe((liker) => {
        if (liker[0]) {
          post.userLiked = true;
        } else {
          post.userLiked = false;
        }
        console.log("Pushing post");
        console.log(post);
        this.posts.push(post);
      });
    });
    this.endLoader();
  }

  requestPostUserLikerObject(post) {
    let path = 'posts/' + post.id + '/likers/';
    return this.firebase.queriedList(path, 'uid', this.uid);
  }

  endLoader() {
    this.loader.dismiss();
  }

  togglePostLike(post) {
    if (post.userLiked) {
      this.requestPostUserLikerObject(post).subscribe((liker) => {
        this.removePostLikerObject(liker[0], post).then(() => {
          if (post.likeCount == 1) {
            this.unflagPostLike(post);
            post.liked = false;
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

  removePostLikerObject(liker, post) {
    let path = 'posts/' + post.id + '/likers/' + liker.id;
    return this.firebase.object(path).remove();
  }

  unlikePost(myPost) {
    myPost.userLiked = false;
    let likeCount = --myPost.likeCount;
    let post = {
      "likeCount": likeCount
    }
    let path = 'posts/' + myPost.id;
    return this.firebase.object(path).update(post);
  }

  unflagPostLike(myPost) {
    let post = {
      "liked": false,
    }
    let path = 'posts/' + myPost.id;
    return this.firebase.object(path).update(post);
  }

  pushPostLikerObject(myPost) {
    let path = 'posts/' + myPost.id + '/likers/';
    let likerObject = {
      "post": myPost.id,
      "uid": this.uid
    }
    return this.firebase.list(path).push(likerObject);
  }

  addIDToPostLikerObject(postLikerID, myPost) {
    let path = '/posts/' + myPost.id + '/likers/' + postLikerID;
    let liker = {
      id: postLikerID
    }
    return this.firebase.object(path).update(liker);
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
      return this.firebase.object(path).update(post).then((obj) => {
        observer.next(obj)
      });
    });
  }

  viewPost(postID) {
    this.navCtrl.push(PostPage, { id: postID })
  }

  viewPin(pinID) {
    this.navCtrl.push(PinPage, { id: pinID });
  }

  goToProfilePage() {
    this.navCtrl.setRoot(ProfilePage);
  }

  viewUser(uid) {
    this.navCtrl.push(UserPage, { uid: uid })
  }

  openLink(url) {
    open(url)
  }

  goToStatementPage() {
    this.navCtrl.setRoot(StatementPage);
  }

  doInfinite(infiniteScroll) {
    console.log("Infinite scroll triggered");
    console.log("Post limit: " + this.postLimit)
    this.postLimit++;
    this.preparePostsRequest().subscribe((queryParameters) => {
      this.postsQuery = queryParameters;
      this.requestPosts().subscribe((posts) => {
        if (posts.length < this.postLimit) {
          this.postsLoaded = true;
        } else {
          this.presentNextPost(posts[0]);
          infiniteScroll.complete();
        }
      });
    });
  }

  presentNextPost(post) {
    this.requestPostUserLikerObject(post).subscribe((liker) => {
      if (liker[0]) {
        post.userLiked = true;
      } else {
        post.userLiked = false;
      }
      this.posts.push(post);
    });
  }
}
