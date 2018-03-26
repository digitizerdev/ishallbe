import { Component, Input } from '@angular/core';

import moment from 'moment';
import { Observable } from 'rxjs';

import { FirebaseProvider } from '../../providers/firebase/firebase';

import { Like } from '../../../test-data/likes/model';

@Component({
  selector: 'post-footer',
  templateUrl: 'post-footer.html'
})
export class PostFooterComponent {
  @Input('postDoc') post;

  constructor(
    private firebase: FirebaseProvider
  ) {
    console.log('Hello PostFooterComponent Component');
  }

  ngAfterViewInit() {
    console.log(this.post);
  }

  addLike() {
    console.log("Add like clicked");
    this.post.liked = true;
    ++this.post.likeCount;
    let type = this.setPostType();
    let postLike = {
      postId: this.post.id,
      pin: type.pin,
      statement: type.statement,
      goal: type.goal
    }
    this.addPostLike(postLike).subscribe(() => {
      this.updatePost();
    });
  }

  setPostType() {
    console.log("Setting Post Type");
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
    console.log(type);
    return type;
  }

  addPostLike(postLike) {
    return Observable.create((observer) => {
      console.log("Adding post like");
      console.log(postLike);
      return this.buildPostLike(postLike).subscribe((like) => {
        let postLikePath = this.post.collection + "/" + this.post.id + "/likes/" + this.firebase.user.uid;
        console.log("Post Like Path is " + postLikePath);
        this.firebase.afs.doc(postLikePath).set(like).then(() => {
          observer.next();
        });
      });
    });
  }

  buildPostLike(postLike) {
    return Observable.create((observer) => {
      console.log("Building Post Like");
      console.log(postLike);
      let displayTimestamp = moment().format('MMM D YYYY h:mmA');
      let timestamp = moment().unix();
      let id = this.firebase.afs.createId();
      let like: Like = {
        id: id,
        postId: postLike.postId,
        pin: postLike.pin,
        statement: postLike.statement,
        goal: postLike.goal,
        displayTimestamp: displayTimestamp,
        timestamp: timestamp,
        uid: this.firebase.uid,
        name: this.firebase.user.name,
        face: this.firebase.user.photo
      }
      console.log("Post Like Built");
      console.log(like);
      observer.next(like);
    });
  }

  updatePost() {
    console.log("Updating Post");
    let likePath = this.post.collection + '/' + this.post.id;
    this.firebase.afs.doc(likePath).update({
      likeCount: this.post.likeCount
    });
  }

  removeLike() {
    console.log("Remove like clicked");
    --this.post.likeCount;
    this.post.liked = false;
    this.removePostLike().subscribe(() => {
      this.updatePost();
    })
  }

  removePostLike() {
    console.log("Removing Post Like");
    return Observable.create((observer) => {
      let postLikePath = this.post.collection + "/" + this.post.id + "/likes/" + this.firebase.user.uid;
      console.log("Post Like Path is " + postLikePath);
      return this.firebase.afs.doc(postLikePath).delete().then(() => {
        observer.next();
      })
    });
  }
}
