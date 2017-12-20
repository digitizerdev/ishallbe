import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, Events, NavController, NavParams } from 'ionic-angular';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../environments/environment';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';

import { mockPost } from '../../../test-data/post/mocks'
import { PostPage } from './post';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { SessionProvider } from '../../providers/session/session';
import { NativeProvider } from '../../providers/native/native';
import { DigitalProvider } from '../../providers/digital/digital';

import { } from 'jasmine';

import {
  FirebaseProviderMock,
  SessionProviderMock,
  NativeProviderMock,
  DigitalProviderMock,
  NavMock,
  StorageMock,
  AngularFireDatabaseMock,
  AngularFireAuthMock
} from '../../../test-config/mocks-ionic';
import { ZipSubscriber } from 'rxjs/operator/zip';

let fixture;
let component;
let session: SessionProvider;
let sessionSpy;
let firebase: FirebaseProvider;
let firebaseSpy;
let native: NativeProvider;
let nativeSpy;
let digital: DigitalProvider;
let digitalSpy;

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
        { provide: NativeProvider, useClass: NativeProviderMock },
        { provide: DigitalProvider, useClass: DigitalProviderMock },
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
    native = fixture.componentRef.injector.get(NativeProvider);
    digital = fixture.componentRef.injector.get(DigitalProvider);
  });

  afterEach(() => {
    fixture.destroy();
    component = null;
    session = null;
    sessionSpy = null;
    firebase = null;
    firebaseSpy = null;
    native = null;
    nativeSpy = null;
    digital = null;
    digitalSpy = null;
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
    expect(component.postComment).toBeUndefined();
    expect(component.comments).toBeDefined();
    expect(component.form.comment).toBeUndefined();
    expect(component.submitted).toBeFalsy();
    expect(component.refreshing).toBeFalsy();
  });

  it('should request uid from Session Provider', () => {
    spyOn(session, 'uid').and.returnValue({ subscribe: () => { } });
    component.requestUID();
    expect(session.uid).toHaveBeenCalled();
  });

  it('should request profile from Firebase Provider', () => {
    spyOn(firebase, 'profile').and.returnValue({ subscribe: () => { } });
    component.requestProfile();
    expect(firebase.profile).toHaveBeenCalled();
  });

  it('should request post from Firebase Provider', () => {
    spyOn(firebase, 'object').and.returnValue({ subscribe: () => { } });
    component.requestPost();
    expect(firebase.object).toHaveBeenCalled();
  });

  it('should request Firebase Provider to check if user already liked post', () => {
    spyOn(firebase, 'query').and.returnValue({ subscribe: () => { } });
    component.post = mockPost.mature;
    component.uid = 'testUID'
    component.requestPostUserLikerObject();
    expect(firebase.query).toHaveBeenCalled();
  });

  it('should not mark post liked if user liker object not found', () => {
    component.markPostLike(mockPost.new.likers);
    expect(component.likedPost).toBeFalsy();
  });

  it('should mark post liked if user liker object found', () => {
    component.markPostLike(mockPost.mature.likers);
    expect(component.likedPost).toBeTruthy();
  });

  it('should not request post comments if no comment object found', () => {
    spyOn(firebase, 'orderList').and.returnValue({ subscribe: () => { } });
    component.post = mockPost.new;
    component.requestComments();
    expect(firebase.orderList).toHaveBeenCalledTimes(0);
  });

  it('should request post comments if comment object found', () => {
    spyOn(firebase, 'orderList').and.returnValue({ subscribe: () => { } });
    component.post = mockPost.mature;
    component.requestComments();
    expect(firebase.orderList).toHaveBeenCalled();
  });

  it('should request Firebase Provider for comment user liker object', () => {
    spyOn(firebase, 'query').and.returnValue({ subscribe: () => { } });
    component.post = mockPost.mature;
    component.uid = 'testUID'
    component.requestCommentUserLikerObject(mockPost.mature.comments.testComment2);
    expect(firebase.query).toHaveBeenCalled();
  });

  it('should not mark comment liked if user liker object not found', () => {
    let liker = null;
    component.markCommentLike(liker, mockPost.mature.comments.testComment1);
    let liked = mockPost.mature.comments.testComment1.userLiked;
    expect(liked).toBeFalsy();
  });

  it('should mark comment liked if user liker object found', () => {
    component.markCommentLike(mockPost.mature.comments.testComment2.likers.testCommentLikerID1, mockPost.mature.comments.testComment2);
    let liked = mockPost.mature.comments.testComment2.userLiked;
    expect(liked).toBeTruthy();
  });

  it('should mark comment mine if uid matches', () => {
    component.uid = 'testUID';
    component.markCommentMine(mockPost.mature.comments.testComment2);
    let mine = mockPost.mature.comments.testComment2.mine
    expect(mine).toBeTruthy();
  });

  it('should mark comment mine if uid matches', () => {
    component.uid = 'notTestUID';
    component.markCommentMine(mockPost.mature.comments.testComment2);
    let mine = mockPost.mature.comments.testComment2.mine
    expect(mine).toBeFalsy();
  });

  it('should push comment into comments array after it marks whether it is mine', () => {
    component.markCommentMine(mockPost.mature.comments.testComment1);
    let comment = mockPost.mature.comments.testComment1;
    expect(component.comments[0]).toBe(comment);
  });

  it('should be able to like post', () => {
    expect(component.likePost).toBeDefined();
  });

  it('should unlike post on toggle post like if user already liked post', () => {
    spyOn(component, 'requestPostUserLikerObject').and.returnValue({ subscribe: () => {}});
    component.likedPost = true;
    component.togglePostLike();
    expect(component.requestPostUserLikerObject).toHaveBeenCalled();
  });
  
  it('should request Firebase Provider to remove liker object from liked post', () => {
    spyOn(firebase, 'removeObject').and.returnValue({ subscribe: () => {}});
    component.post = mockPost.mature;
    component.removePostLikerObject(mockPost.mature.likers.testPostLikerID1);
    expect(firebase.removeObject).toHaveBeenCalled();
  });

  it('should be able to like comment', () => {
    expect(component.likeComment).toBeDefined();
  });

  it('should unlike comment on toggle comment like if user already liked comment', () => {
    spyOn(component, 'requestCommentUserLikerObject').and.returnValue({ subscribe: () => {}});
    component.toggleCommentLike(mockPost.mature.comments.testComment2);
    expect(component.requestCommentUserLikerObject).toHaveBeenCalled();
  });

  it('should request Firebase Provider to remove liker object from liked comment', () => {
    spyOn(firebase, 'removeObject').and.returnValue({ subscribe: () => {}});
    component.post = mockPost.mature;
    component.removeCommentLikerObject(mockPost.mature.comments.testComment2.likers.testCommentLikerID1);
    expect(firebase.removeObject).toHaveBeenCalled();
  });

  it('should be able to remove comment if mine', () => {
    expect(component.deleteComment).toBeDefined();
  });

  it('should be able to report post', () => {
    fixture.detectChanges();
    let de: DebugElement;
    let el: HTMLElement;
    de = fixture.debugElement.query(By.css('h6'));
    el = de.nativeElement.innerHTML
    expect(el).toContain('Report Post');
    expect(component.reportPost).toBeDefined();
  });

  it('should be able to view user', () => {
    expect(component.viewUser).toBeDefined();
  });

});