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
import { ProfilePage } from './profile';

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

describe('ProfilePage', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilePage],
      imports: [
        IonicModule.forRoot(ProfilePage),
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
    fixture = TestBed.createComponent(ProfilePage);
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
    expect(component instanceof ProfilePage).toBe(true);
  });

  it('should be initialized', () => {
    expect(component.profile).toBeUndefined();
    expect(component.posts).toBeDefined();
    expect(component.uid).toBeUndefined();
    expect(component.post).toBeUndefined();
  });

  it('should display create statement button', async(() => {
    fixture.detectChanges();
    let de: DebugElement;
    let el: HTMLElement;
    de = fixture.debugElement.query(By.css('#ProfileCreateStatementButton'));
    el = de.nativeElement.innerHTML
    expect(el).toContain('Create Statement');
  }));

  it('should display edit profile button', async(() => {
    fixture.detectChanges();
    let de: DebugElement;
    let el: HTMLElement;
    de = fixture.debugElement.query(By.css('#ProfileEditProfileButton'));
    el = de.nativeElement.innerHTML
    expect(el).toContain('Edit Profile');
  }));

  it('should display manage account button', async(() => {
    fixture.detectChanges();
    let de: DebugElement;
    let el: HTMLElement;
    de = fixture.debugElement.query(By.css('#ProfileAccountPageButton'));
    el = de.nativeElement.innerHTML
    expect(el).toContain('Manage Account');
  }));

  it('should request uid from Session Provider', () => {
    spyOn(session, 'uid').and.returnValue({ subscribe: () => { } });
    component.requestUID();
    expect(session.uid).toHaveBeenCalled();
  });

  it('should use uid to request profile from Firebase Provider', () => {
    spyOn(firebase, 'profile').and.returnValue({ subscribe: () => { } });
    component.requestProfile('testUID');
    expect(firebase.profile).toHaveBeenCalled();
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
