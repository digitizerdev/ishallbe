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

import { ProfilePage } from './profile';

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
    expect(component instanceof ProfilePage).toBe(true);
  });

  it('should initialize with undefined profile', () => {
    expect(component.profile).toBeUndefined();
  })

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

  it('should request uid from session provider', () => {
    spyOn(session, 'uid').and.returnValue({ subscribe: () => {} })
    component.requestUID();
    fixture.detectChanges();
    expect(session.uid).toHaveBeenCalled();
  });

  it('should load profile by requesting it', () => {
    spyOn(component, 'requestProfile').and.returnValue({ subscribe: () => {} })
    component.loadProfile('testUID');
    fixture.detectChanges();
    expect(component.requestProfile).toHaveBeenCalled
  });

  it('should request profile from firebase provider', () => {
    spyOn(firebase, 'object').and.returnValue;
    component.requestProfile('testUID');
    fixture.detectChanges();
    expect(firebase.object).toHaveBeenCalled();
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
    fixture.detectChanges();
    expect(firebase.setObject).toHaveBeenCalled();
  });

});
