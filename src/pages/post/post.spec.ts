import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, Events, NavController, NavParams } from 'ionic-angular';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../environments/environment';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';

import { HeaderComponent } from '../../components/header/header';

import { PostPage } from './post';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { SessionProvider } from '../../providers/session/session';

import { } from 'jasmine';

import {
  FirebaseProviderMock,
  SessionProviderMock,
  NavMock,
  StorageMock,
  AngularFireDatabaseMock,
  AngularFireAuthMock
} from '../../../test-config/mocks-ionic';

let fixture;
let component;
let session: SessionProvider;
let sessionSpy;
let firebase: FirebaseProvider;
let firebaseSpy;

describe('PostPage', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostPage], 
      imports: [
        IonicModule.forRoot(PostPage),
        AngularFireModule.initializeApp(environment.firebase)                        
      ],
      providers: [
        { provide: FirebaseProvider, useClass: FirebaseProviderMock },
        { provide: SessionProvider, useClass: SessionProviderMock },
        { provide: Storage, useClass: StorageMock },
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavMock },
        { provide: AngularFireDatabase, useClass: AngularFireDatabaseMock },
        { provide: AngularFireAuth, useClass: AngularFireAuthMock },       
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostPage);
    component = fixture.componentInstance;
    session = fixture.componentRef.injector.get(SessionProvider);    
    firebase = fixture.componentRef.injector.get(FirebaseProvider);
  });

  afterEach(() => {
    fixture.destroy();
    component = null;
    session = null;
    sessionSpy = null;
    firebase = null;
    firebaseSpy = null;
  });

  it('should be created', () => {
    expect(component instanceof PostPage).toBe(true);
  });

  it('should be initialized', () => {
    expect(component.uid).toBeUndefined();
    expect(component.profile).toBeUndefined();
    expect(component.postID).toBeUndefined();
    expect(component.post).toBeUndefined();
    expect(component.likedPost).toBeFalsy();
    expect(component.postLikerKey).toBeUndefined();
    expect(component.commentsLoaded).toBeFalsy();
    expect(component.postComment).toBeUndefined();
    expect(component.comments).toBeDefined();
    expect(component.templateComment).toBeDefined();    
  });

  it('should request uid from Session Provider', () => {
    spyOn(session, 'uid').and.returnValue({ subscribe: () => { } });
    component.requestUID();
    fixture.detectChanges();
    expect(session.uid).toHaveBeenCalled();
  });

  it('should request profile from Firebase Provider', () => {
    spyOn(firebase, 'profile').and.returnValue({ subscribe: () => { } });
    component.requestProfile();
    fixture.detectChanges();
    expect(firebase.profile).toHaveBeenCalled();
  });

  it('should request post from Firebase Provider', () => {
    spyOn(firebase, 'object').and.returnValue({ subscribe: () => { } });
    component.requestPost();
    fixture.detectChanges();
    expect(firebase.object).toHaveBeenCalled();
  });

  it('should show if user liked post', () => {
    spyOn(firebase, 'query').and.returnValue({ subscribe: () => { } });    
    component.post = {
      "commentCount" : 0,
      "content" : "Portland Segway Tour",
      "date" : "20171211",
      "face" : "https://graph.facebook.com/10207699735370765/picture?type=large",
      "flagged" : false,
      "id" : "-L07ooCD3QF-zuM_FZPd",
      "image" : true,
      "likeCount" : 1,
      "liked" : true,
      "likers" : {
        "-L0AFJRSe1hle_oknuJ-" : {
          "id" : "-L0AFJRSe1hle_oknuJ-",
          "post" : "-L07ooCD3QF-zuM_FZPd",
          "time" : "100417",
          "uid" : "testUID"
        },
      },
      "name" : "Troy DC Thompson",
      "onFeed" : true,
      "postType" : "image",
      "time" : -20171211104453,
      "title" : "I Shall Be Adventurous ",
      "uid" : "testUID",
      "url" : "https://firebasestorage.googleapis.com/v0/b/ishallbe-de9a3.appspot.com/o/content%2F3yYMHPq3fpZfupL38tKJlNGPcpo2%2Fimages%2Fstatement?alt=media&token=286d74d7-57d3-48d0-9d35-9483bf37ef1e"
    }
    component.uid = 'testUID';
    component.checkIfUserLikedPost();
    fixture.detectChanges();
    expect(firebase.query).toHaveBeenCalled();
  });

  it('should request comments from Firebase Provider', () => {
    spyOn(firebase, 'orderList').and.returnValue({ subscribe: () => { } });
    this.post.id('testPostID');
    component.requestComments();
    fixture.detectChanges();
    expect(firebase.orderList).toHaveBeenCalled();
  })

  it('should push like object when post liked if not already liked', () => {
    spyOn(firebase, 'push').and.returnValue({ subscribe: () => { } }); 
    component.post = {
      "commentCount" : 0,
      "content" : "Portland Segway Tour",
      "date" : "20171211",
      "face" : "https://graph.facebook.com/10207699735370765/picture?type=large",
      "flagged" : false,
      "id" : "-L07ooCD3QF-zuM_FZPd",
      "image" : true,
      "likeCount" : 0,
      "liked" : false,
      "name" : "Troy DC Thompson",
      "onFeed" : true,
      "postType" : "image",
      "time" : -20171211104453,
      "title" : "I Shall Be Adventurous ",
      "uid" : "testUID",
      "url" : "https://firebasestorage.googleapis.com/v0/b/ishallbe-de9a3.appspot.com/o/content%2F3yYMHPq3fpZfupL38tKJlNGPcpo2%2Fimages%2Fstatement?alt=media&token=286d74d7-57d3-48d0-9d35-9483bf37ef1e"
    }
    component.pushLikerObject('testUID');
    expect(firebase.push).toHaveBeenCalled();
  });

  it('should like post', () => {
    spyOn(firebase, 'setObject').and.returnValue({ subscribe: () => { } });
    component.uid = 'testUID';
    component.post = {
      "commentCount" : 0,
      "content" : "Portland Segway Tour",
      "date" : "20171211",
      "face" : "https://graph.facebook.com/10207699735370765/picture?type=large",
      "flagged" : false,
      "id" : "-L07ooCD3QF-zuM_FZPd",
      "image" : true,
      "likeCount" : 0,
      "liked" : false,
      "name" : "Troy DC Thompson",
      "onFeed" : true,
      "postType" : "image",
      "time" : -20171211104453,
      "title" : "I Shall Be Adventurous ",
      "uid" : "testUID",
      "url" : "https://firebasestorage.googleapis.com/v0/b/ishallbe-de9a3.appspot.com/o/content%2F3yYMHPq3fpZfupL38tKJlNGPcpo2%2Fimages%2Fstatement?alt=media&token=286d74d7-57d3-48d0-9d35-9483bf37ef1e"
    }
    component.likePost();
    expect(firebase.setObject).toHaveBeenCalled();
    expect(component.post.liked).toBeTruthy();
    expect(component.post.likeCount).toBe(1);    
  });

  it('should remove liker object on toggle if post already liked', () => {
    spyOn(firebase, 'removeObject').and.returnValue({ subscribe: () => { } }); 
    component.post = {
      "commentCount" : 0,
      "content" : "Portland Segway Tour",
      "date" : "20171211",
      "face" : "https://graph.facebook.com/10207699735370765/picture?type=large",
      "flagged" : false,
      "id" : "-L07ooCD3QF-zuM_FZPd",
      "image" : true,
      "likeCount" : 1,
      "liked" : true,
      "likers" : {
        "-L0AFJRSe1hle_oknuJ-" : {
          "id" : "-L0AFJRSe1hle_oknuJ-",
          "post" : "-L07ooCD3QF-zuM_FZPd",
          "time" : "100417",
          "uid" : "testUID"
        },
      },
      "name" : "Troy DC Thompson",
      "onFeed" : true,
      "postType" : "image",
      "time" : -20171211104453,
      "title" : "I Shall Be Adventurous ",
      "uid" : "testUID",
      "url" : "https://firebasestorage.googleapis.com/v0/b/ishallbe-de9a3.appspot.com/o/content%2F3yYMHPq3fpZfupL38tKJlNGPcpo2%2Fimages%2Fstatement?alt=media&token=286d74d7-57d3-48d0-9d35-9483bf37ef1e"
    }
    component.removeLikerObject();
    expect(firebase.removeObject).toHaveBeenCalled();
  });

  it('should unlike post', () => {
    spyOn(firebase, 'setObject').and.returnValue({ subscribe: () => { } });
    component.post = {
      "commentCount" : 0,
      "content" : "Portland Segway Tour",
      "date" : "20171211",
      "face" : "https://graph.facebook.com/10207699735370765/picture?type=large",
      "flagged" : false,
      "id" : "-L07ooCD3QF-zuM_FZPd",
      "image" : true,
      "likeCount" : 1,
      "liked" : true,
      "likers" : {
        "-L0AFJRSe1hle_oknuJ-" : {
          "id" : "-L0AFJRSe1hle_oknuJ-",
          "post" : "-L07ooCD3QF-zuM_FZPd",
          "time" : "100417",
          "uid" : "testUID"
        },
      },
      "name" : "Troy DC Thompson",
      "onFeed" : true,
      "postType" : "image",
      "time" : -20171211104453,
      "title" : "I Shall Be Adventurous ",
      "uid" : "testUID",
      "url" : "https://firebasestorage.googleapis.com/v0/b/ishallbe-de9a3.appspot.com/o/content%2F3yYMHPq3fpZfupL38tKJlNGPcpo2%2Fimages%2Fstatement?alt=media&token=286d74d7-57d3-48d0-9d35-9483bf37ef1e"
    }
    component.unlikePost();
    expect(firebase.setObject).toHaveBeenCalled();   
    expect(component.post.liked).toBeFalsy();
    expect(component.post.likeCount).toBe(0);   
  });

});
