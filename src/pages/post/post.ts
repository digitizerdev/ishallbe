import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { ProfilePage } from '../profile/profile';
import { HomePage } from '../home/home';

import { FirebaseProvider } from '../../providers/firebase/firebase';

import moment from 'moment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import { Storage } from '@ionic/storage/es2015/storage';

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {

  commentForm: {
    comment?: string
  } = {};
  comments: any;
  likedPost: any;
  submitted: any;
  refreshing: any;
  loaded: any;
  loading: any;
  uid: any;
  profile: any;
  postID: string;
  post: any;
  postComment: any;
  mine: any;
  flagged = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public storage: Storage,
    public firebase: FirebaseProvider
  ) {
  }

  ionViewDidEnter() {
    this.setFlags();
    this.comments = [];
    this.loadProfile().subscribe(() => {
      this.loadPost('');
    });
  }

  setFlags() {
    this.loaded = false;
    this.likedPost = false;
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

  loadPost(refresh) {
    this.setFlags();
    this.startRefresh(refresh);
    this.postID = this.navParams.get('id');
    this.post = [];
    this.requestPost().subscribe((post) => {
      this.post = post;
      this.checkIfPostMine();
      this.presentPost(refresh);
    });
  } 
  
  startRefresh(refresh) {
        if(refresh) {
          this.refreshing = true;
        }
      }

  requestPost() {
        let path = '/posts/' + this.postID;
        return this.firebase.object(path)
      }

  requestFlaggedPost() {
        let path = 'flagged/posts/' + this.postID;
        return this.firebase.object(path)
      }

  checkIfPostMine() {
        if(this.uid == this.post.uid) {
          this.mine = true;
        }
      }

  removePost() {
        let path = '/posts/' + this.post.id
    this.firebase.object(path).remove().then(() => {
          this.navCtrl.setRoot(ProfilePage);
        });
      }

  presentPost(refresh) {
        this.loaded = true;
        this.endRefresh(refresh);
        this.requestPostUserLikerObject().subscribe((liker) => {
          this.markPostLike(liker[0]);
          this.requestComments();
        });
      }

  requestPostUserLikerObject() {
        let path = 'posts/' + this.post.id + '/likers/';
        return this.firebase.queriedList(path, 'uid', this.uid);
      }

  markPostLike(liker) {
        if(liker) {
          this.likedPost = true;
        } else {
          this.likedPost = false;
        }
      }

  endRefresh(refresh) {
        if(refresh) {
          refresh.complete();
        }
      }

  requestComments() {
        if(this.post.comments) {
          this.post.comments = [];
          this.comments = [];
          let path = 'posts/' + this.post.id + '/comments/';
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
        let path = 'posts/' + this.post.id + '/comments/' + comment.id + '/likers/';
        return this.firebase.queriedList(path, 'uid', this.uid);
      }

  markCommentLike(liker, comment) {
        if(liker) {
          comment.userLiked = true;
        } else {
          comment.userLiked = false;
        }
    this.markCommentMine(comment);
      }

  markCommentMine(comment) {
        if(comment.uid == this.uid) {
          comment.mine = true;
        } else {
          comment.mine = false;
        }
    this.comments.push(comment);
      }

  togglePostLike() {
        if(this.likedPost) {
          if (this.post.likeCount == 0) {
            this.post.liked = false;
          }
          this.unlikePost().subscribe(() => {
            this.requestPostUserLikerObject().subscribe((liker) => {
              this.removePostLikerObject(liker[0]).then(() => {
              });
            });
          });
        } else {
          this.likePost().subscribe(() => {
            this.pushPostLikerObject().then((postLikeProps) => {
              let postLikerID = postLikeProps.key;
              this.addIDToPostLikerObject(postLikerID);
            });
          });
        }
      }

  removePostLikerObject(liker) {
        let path = 'posts/' + this.post.id + '/likers/' + liker.id;
        return this.firebase.object(path).remove();
      }

  unlikePost() {
        return Observable.create((observer) => {
          this.likedPost = false;
          this.post.likeCount--;
          let post = {
            "likeCount": this.post.likeCount,
            "liked": this.post.liked
          }
          let path = 'posts/' + this.post.id;
          return this.firebase.object(path).update(post).then(() => {
            observer.next();
          });
        });
      }

  likePost() {
        return Observable.create((observer) => {
          this.likedPost = true;
          this.post.likeCount++;
          this.post.liked = true;
          let post = {
            "likeCount": this.post.likeCount,
            "liked": this.post.liked
          }
          let path = 'posts/' + this.post.id;
          return this.firebase.object(path).update(post).then((obj) => {
            observer.next(obj)
          });
        });
      }

  pushPostLikerObject() {
        let path = 'posts/' + this.post.id + '/likers/';
        let likerObject = {
          "post": this.post.id,
          "uid": this.uid
        }
    return this.firebase.list(path).push(likerObject);
      }

  addIDToPostLikerObject(postLikerID) {
        let path = '/posts/' + this.post.id + '/likers/' + postLikerID;
        let liker = {
          id: postLikerID
        }
    return this.firebase.object(path).update(liker);
      }

  submit(commentForm) {
        this.submitted = true;
        if(commentForm.comment) {
          this.prepComment(commentForm).subscribe(() => {
            this.publishComment().subscribe(() => {
              this.comments.push(this.postComment);
              commentForm.comment = null;
              this.postComment = null;
            });
          });
        }
      }

  prepComment(commentForm) {
        return Observable.create((observer) => {
          let path = '/posts/' + this.post.id + '/comments/'
          let time = moment().format('MMMM D h:mma')
          let rawTime = moment().format('YYYYMMDDHHMMSS');
          this.postComment = {
            "name": this.profile.name,
            "face": this.profile.photo,
            "liked": false,
            "likeCount": 0,
            "time": time,
            "rawTime": rawTime,
            "content": commentForm.comment,
            "post": this.post.id,
            "uid": this.uid,
            "mine": true,
            "userLiked": false,
          }
          observer.next();
        });
      }

  publishComment() {
        return Observable.create((observer) => {
          return this.addCommentToPost().then((newCommentProps) => {
            this.postComment.id = newCommentProps.key;
            return this.addIDToComment().then(() => {
              return this.incrementPostCommentCount().then(() => {
                this.submitted = false;
                observer.next();
              });
            });
          });
        });
      }

  addCommentToPost() {
        let path = '/posts/' + this.post.id + '/comments';
        return this.firebase.list(path).push(this.postComment);
      }

  addIDToComment() {
        let path = '/posts/' + this.post.id + '/comments/' + this.postComment.id;
        return this.firebase.object(path).update(this.postComment);
      }

  incrementPostCommentCount() {
        this.post.commentCount++;
        let path = '/posts/' + this.post.id + '/commentCount'
    return this.firebase.object(path).set(this.post.commentCount);
      }

  toggleCommentLike(comment) {
        if(comment.userLiked) {
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
          let path = 'posts/' + this.post.id + '/comments/' + comment.id;
          return this.firebase.object(path).update(myComment).then(() => {
            observer.next();
          });
        });
      }

  removeCommentLikerObject(liker) {
        let path = 'posts/' + this.post.id + '/comments/' + liker.comment + '/likers/' + liker.id;
        return this.firebase.object(path).remove();
      }

  pushCommentLikerObject(comment) {
        let path = 'posts/' + this.post.id + '/comments/' + comment.id + '/likers/';
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
          let path = 'posts/' + this.post.id + '/comments/' + comment.id;
          return this.firebase.object(path).update(comment).then(() => {
            observer.next();
          });
        });
      }

  addIDToCommentLike(commentLikerID, comment) {
        let path = '/posts/' + this.post.id + '/comments/' + comment.id + '/likers/' + commentLikerID;
        let likerObject = {
          id: commentLikerID
        }
    return this.firebase.object(path).update(likerObject);
      }

  deleteComment(comment) {
        let path = '/posts/' + this.post.id + '/comments/' + comment.id;
        this.comments = this.comments.filter(item => item !== comment);
        this.firebase.object(path).remove().then(() => {
          this.decrementPostCommentCount().then(() => {
          });
        });
      }

  decrementPostCommentCount() {
        this.post.commentCount--;
        let path = '/posts/' + this.post.id + '/commentCount'
    return this.firebase.object(path).set(this.post.commentCount);
      }

  reportPost() {
        let alert = this.alertCtrl.create({
          title: 'Hold It!',
          message: 'Do you really want to report this post?',
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
                this.post;
                this.removeFromFeed().then(() => {
                  this.flagPost().then((token) => {
                    this.addIDToFlaggedPost(token).then(() => {
                      this.navCtrl.setRoot(HomePage);
                    });
                  });
                });
              }
            }
          ]
        });
        alert.present();
      }

  flagPost() {
        let path = "/flagged/posts"
    this.post.flagged = true;
        this.post.onFeed = false;
        return this.firebase.list(path).push(this.post);
      }

  removeFromFeed() {
        let path = "/posts/" + this.post.id;
        return this.firebase.object(path).remove();
      }

  addIDToFlaggedPost(token) {
        let path = 'flagged/posts/' + token.key;
        let post = {
          flaggedID: token.key
        }
    return this.firebase.object(path).update(post)
      }

  viewProfile(uid) {
        this.navCtrl.push(ProfilePage, { uid: uid })
      }

  openLink(url) {
        open(url)
      }
}