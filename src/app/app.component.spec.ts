import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { NgModule, Component, ViewChild } from '@angular/core';
import { IonicModule, Platform } from 'ionic-angular';
import { AngularFireModule, FirebaseApp } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Facebook } from '@ionic-native/facebook';
import { Camera } from '@ionic-native/camera';
import { MediaCapture } from '@ionic-native/media-capture';
import { Push } from '@ionic-native/push';
import { File } from '@ionic-native/file';
import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs/Rx';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';

import { FirebaseProvider } from '../providers/firebase/firebase';
import { SessionProvider } from '../providers/session/session';

import { iShallBe } from './app.component';

import {
  FirebaseProviderMock,
  SessionProviderMock,
  PlatformMock,
  StatusBarMock,
  SplashScreenMock,
  StorageMock,
  FacebookMock,
  FileMock,
  PushMock,
  AngularFireDatabaseMock,
  AngularFireAuthMock,
  FirebaseAppMock
} from '../../test-config/mocks-ionic';

import { } from 'jasmine';

let fixture;
let component;
let session: SessionProvider;
let sessionSpy;
let firebase: SessionProvider;
let firebaseSpy: FirebaseProvider;

describe('iShallBe App Component', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [iShallBe],
      imports: [
        IonicModule.forRoot(iShallBe),
      ],
      providers: [
        { provide: FirebaseProvider, useClass: FirebaseProviderMock },
        { provide: SessionProvider, useClass: SessionProviderMock },
        { provide: StatusBar, useClass: StatusBarMock },
        { provide: SplashScreen, useClass: SplashScreenMock },
        { provide: Platform, useClass: PlatformMock },
        { provide: Storage, useClass: StorageMock },
        { provide: Facebook, useClass: FacebookMock },
        { provide: File, useClass: FileMock },
        { provide: Push, useClass: PushMock },
        { provide: AngularFireDatabase, useClass: AngularFireDatabaseMock },
        { provide: AngularFireAuth, useClass: AngularFireAuthMock },
        { provide: FirebaseApp, useClass: FirebaseAppMock }
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(iShallBe);
        component = fixture.componentInstance;
        session = fixture.componentRef.injector.get(SessionProvider);
        firebase = fixture.componentRef.injector.get(FirebaseProvider);
      });
  }));

  afterEach(() => {
    fixture.destroy();
    component = null;
    session = null;
    sessionSpy = null;
    firebase = null;
    firebaseSpy = null;
  });

  it('should be created', (done) => {
    expect(component instanceof iShallBe).toBe(true);
    const promise = new Promise((res, rej) => res());
    promise.then(done).catch(done.fail);
  });
  
  it('should have 4 providers', () => {
    expect(component.providers.length).toBe(4);
  });

  it('should have 5 menu pages', () => {
    expect(component.menuPages.length).toBe(5);
  })

  it('should have 21 pages', () => {
    expect(component.pages.length).toBe(21);
  });

  it('should have 9 components', () => {
    expect(component.components.length).toBe(9);
  });

  it('should initialize with login page as root page', () => {
    expect(component['rootPage']).toBe(LoginPage);
  });

  it('should request authentication state from Session Provider when awoken', () => {
    spyOn(session, 'loggedIn').and.returnValue({ subscribe: () => {} })
    component.wakeUp();
    fixture.detectChanges();
    expect(session.loggedIn).toHaveBeenCalled();
  });
  
});
