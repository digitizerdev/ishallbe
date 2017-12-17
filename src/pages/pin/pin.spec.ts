import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, Events, NavController, NavParams } from 'ionic-angular';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../environments/environment';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';

import { mockPin } from '../../../test-data/pin/mocks'
import { PinPage } from './pin';

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
import { ZipSubscriber } from 'rxjs/operator/zip';

let fixture;
let component;
let session: SessionProvider;
let sessionSpy;
let firebase: FirebaseProvider;
let firebaseSpy;

describe('PinPage', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PinPage],
      imports: [
        IonicModule.forRoot(PinPage),
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
    fixture = TestBed.createComponent(PinPage);
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
    expect(component instanceof PinPage).toBe(true);
  });

  it('should be initialized', () => {
    expect(component.uid).toBeUndefined();
    expect(component.profile).toBeUndefined();
    expect(component.pinID).toBeUndefined();
    expect(component.pin).toBeUndefined();
    expect(component.likedPin).toBeFalsy();
    expect(component.pinComment).toBeUndefined();
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

  it('should request pin from Firebase Provider', () => {
    spyOn(firebase, 'object').and.returnValue({ subscribe: () => { } });
    component.requestPin();
    expect(firebase.object).toHaveBeenCalled();
  });

  it('should request Firebase Provider to check if user already liked pin', () => {
    spyOn(firebase, 'query').and.returnValue({ subscribe: () => { } });
    component.pin = mockPin.mature;
    component.uid = 'testUID'
    component.requestPinUserLikerObject();
    expect(firebase.query).toHaveBeenCalled();
  });

  it('should not mark pin liked if user liker object not found', () => {
    component.markPinLike(mockPin.new.likers);
    expect(component.likedPin).toBeFalsy();
  });

  it('should mark pin liked if user liker object found', () => {
    component.markPinLike(mockPin.mature.likers);
    expect(component.likedPin).toBeTruthy();
  });

  it('should not request pin comments if no comment object found', () => {
    spyOn(firebase, 'orderList').and.returnValue({ subscribe: () => { } });
    component.pin = mockPin.new;
    component.requestComments();
    expect(firebase.orderList).toHaveBeenCalledTimes(0);
  });

  it('should request pin comments if comment object found', () => {
    spyOn(firebase, 'orderList').and.returnValue({ subscribe: () => { } });
    component.pin = mockPin.mature;
    component.requestComments();
    expect(firebase.orderList).toHaveBeenCalled();
  });

  it('should request Firebase Provider for comment user liker object', () => {
    spyOn(firebase, 'query').and.returnValue({ subscribe: () => { } });
    component.pin = mockPin.mature;
    component.uid = 'testUID'
    component.requestCommentUserLikerObject(mockPin.mature.comments.testComment2);
    expect(firebase.query).toHaveBeenCalled();
  });

  it('should not mark comment liked if user liker object not found', () => {
    let liker = null;
    component.markCommentLike(liker, mockPin.mature.comments.testComment1);
    let liked = mockPin.mature.comments.testComment1.userLiked;
    expect(liked).toBeFalsy();
  });

  it('should mark comment liked if user liker object found', () => {
    component.markCommentLike(mockPin.mature.comments.testComment2.likers.testCommentLikerID1, mockPin.mature.comments.testComment2);
    let liked = mockPin.mature.comments.testComment2.userLiked;
    expect(liked).toBeTruthy();
  });

  it('should mark comment mine if uid matches', () => {
    component.uid = 'testUID';
    component.markCommentMine(mockPin.mature.comments.testComment2);
    let mine = mockPin.mature.comments.testComment2.mine
    expect(mine).toBeTruthy();
  });

  it('should mark comment mine if uid matches', () => {
    component.uid = 'notTestUID';
    component.markCommentMine(mockPin.mature.comments.testComment2);
    let mine = mockPin.mature.comments.testComment2.mine
    expect(mine).toBeFalsy();
  });

  it('should push comment into comments array after it marks whether it is mine', () => {
    component.markCommentMine(mockPin.mature.comments.testComment1);
    let comment = mockPin.mature.comments.testComment1;
    expect(component.comments[0]).toBe(comment);
  });

  it('should be able to like pin', () => {
    expect(component.likePin).toBeDefined();
  });

  it('should unlike pin on toggle pin like if user already liked pin', () => {
    spyOn(component, 'requestPinUserLikerObject').and.returnValue({ subscribe: () => {}});
    component.likedPin = true;
    component.togglePinLike();
    expect(component.requestPinUserLikerObject).toHaveBeenCalled();
  });
  
  it('should request Firebase Provider to remove liker object from liked pin', () => {
    spyOn(firebase, 'removeObject').and.returnValue({ subscribe: () => {}});
    component.pin = mockPin.mature;
    component.removePinLikerObject(mockPin.mature.likers.testPinLikerID1);
    expect(firebase.removeObject).toHaveBeenCalled();
  });

  it('should be able to like comment', () => {
    expect(component.likeComment).toBeDefined();
  });

  it('should unlike comment on toggle comment like if user already liked comment', () => {
    spyOn(component, 'requestCommentUserLikerObject').and.returnValue({ subscribe: () => {}});
    component.toggleCommentLike(mockPin.mature.comments.testComment2);
    expect(component.requestCommentUserLikerObject).toHaveBeenCalled();
  });

  it('should request Firebase Provider to remove liker object from liked comment', () => {
    spyOn(firebase, 'removeObject').and.returnValue({ subscribe: () => {}});
    component.pin = mockPin.mature;
    component.removeCommentLikerObject(mockPin.mature.comments.testComment2.likers.testCommentLikerID1);
    expect(firebase.removeObject).toHaveBeenCalled();
  });

  it('should be able to remove comment if mine', () => {
    expect(component.deleteComment).toBeDefined();
  });

  it('should be able to view user', () => {
    expect(component.viewUser).toBeDefined();
  });

  it('should be able to open link', () => {
    expect(component.openLink).toBeDefined
  });

});