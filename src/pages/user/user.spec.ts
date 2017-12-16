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
import { UserPage } from './user';

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

describe('UserPage', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserPage],
      imports: [
        IonicModule.forRoot(UserPage),
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
    fixture = TestBed.createComponent(UserPage);
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
    expect(component instanceof UserPage).toBe(true);
  });

  it('should be initialized', () => {
    expect(component.user).toBeUndefined();
    expect(component.uid).toBeUndefined();
    expect(component.myUID).toBeUndefined();
    expect(component.posts).toBeDefined();
  });

  it('should request Firebase Provider for user object', () => {
    spyOn(firebase, 'object').and.returnValue({ subscribe: () => { } });
    component.requestUser();
    expect(firebase.object).toHaveBeenCalled();
  });

  it('should use uid to request profile from Firebase Provider', () => {
    spyOn(firebase, 'profile').and.returnValue({ subscribe: () => { } });
    component.requestProfile('testUID');
    expect(firebase.profile).toHaveBeenCalled();
  });

  it('should request uid from Session Provider', () => {
    spyOn(session, 'uid').and.returnValue({ subscribe: () => { } });
    component.requestUID();
    expect(session.uid).toHaveBeenCalled();
  });

  it('should add standard bio to profile if bio not found', () => {
    spyOn(firebase, 'setObject').and.returnValue;
    let profile = {
        uid: 'testUID',
        name: 'testName',
        email: 'testEmail',
        photo: "https://ishallbe.co/wp-content/uploads/2017/09/generic-profile.png",
        blocked: false,
        role: "testRole",
        bio: 'Improving Every Day'
      }
    component.addStandardBio(profile);
    expect(firebase.setObject).toHaveBeenCalled();
  });

  it('should request Firebase Provider to query posts by UID', () => {
    spyOn(firebase, 'query').and.returnValue({ subscribe: () => { } });
    component.loadUserPosts('testUID');
    expect(firebase.query).toHaveBeenCalled();
  });

  it('should request Firebase Provider to check if user already liked post', () => {
    spyOn(firebase, 'query').and.returnValue({ subscribe: () => { } });
    component.uid = 'testUID'
    component.requestPostUserLikerObject(mockPost.mature);
    expect(firebase.query).toHaveBeenCalled();
  });

  it('should be able to like post', () => {
    expect(component.likePost).toBeDefined();
  });

  it('should be able to unlike post', () => {
    expect(component.unlikePost).toBeDefined();
  });

  it('should be able to view post', () => {
    expect(component.viewPost('testPostID')).toBeUndefined();
  });

});