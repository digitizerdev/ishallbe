import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { SessionProvider } from '../../providers/session/session';

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {

  postID: string;
  post: any;
  key: any;
  account:any;
  comments: any[] = [];
  likedComments: any[] = [];
  postLiked = false;
  postLikerKey: any;
  likerKey:any;
  postComment: any = {
    name: '',
    face: '',
    liked: false,
    likeCount: 0,
    time: '',
    rawTime: '',
    content: '',
    post: null,
    uid: ''
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public session: SessionProvider,
    public firebase: FirebaseProvider
  ) {
  }

  ionViewDidEnter() {
    this.postID = this.navParams.get('id');
    this.loadPost(this.postID).subscribe((post)=> {
      this.post = post      
    })
  }

  loadPost(postID) {
    let path = '/posts/' + postID;
    return this.firebase.object(path);
  }

}
