import { ComponentFixture, async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

import { IonicModule, Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FCM } from '@ionic-native/fcm';

import { FirebaseProvider } from '../providers/firebase/firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { environment } from '../environments/environment';

import { StartupPage } from '../pages/startup/startup';

import { } from 'jasmine';

import { iShallBe } from './app.component';

import {
  PlatformMock,
  NavMock,
  StatusBarMock,
  SplashScreenMock,
  FCMMock,
  FirebaseProviderMock,
} from '../../test-config/mocks-ionic';

describe('iShallBe 1.4', () => {
  let fixture;
  let component;
  let platform: Platform;
  let nav: Nav;
  let statusBar: StatusBar;
  let splashScreen: SplashScreen;
  let fcm: FCM;
  let firebase: FirebaseProvider;
  let afa: AngularFireAuth;
  let afs: AngularFirestore;

  const angularFireAuthStub = {
  };

  const angularFireDataStub = {
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [iShallBe],
      imports: [
        IonicModule.forRoot(iShallBe),
        AngularFireModule.initializeApp(environment.firebase)
      ],
      providers: [
        { provide: Platform, useClass: PlatformMock },
        { provide: Nav, useClass: NavMock },
        { provide: StatusBar, useClass: StatusBarMock },
        { provide: SplashScreen, useClass: SplashScreenMock },
        { provide: FCM, useClass: FCMMock },
        { provide: FirebaseProvider, useClass: FirebaseProviderMock },
        { provide: AngularFireAuth, useValue: angularFireAuthStub },
        { provide: AngularFirestore, useValue: angularFireDataStub },
      ],
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(iShallBe);
    component = fixture.componentInstance;
    platform = fixture.componentRef.injector.get(Platform);
    nav = fixture.componentRef.injector.get(Nav);
    statusBar = fixture.componentRef.injector.get(StatusBar);
    splashScreen = fixture.componentRef.injector.get(SplashScreen);
    fcm = fixture.componentRef.injector.get(FCM);
    firebase = fixture.componentRef.injector.get(FirebaseProvider);
  });

  afterEach(() => {
    fixture.destroy();
    component = null;
    platform = null;
    nav = null;
    statusBar = null;
    splashScreen = null;
    fcm = null;
    firebase = null;
    afa = null;
    afs = null;
  });

  it('should be created', () => {
    expect(component instanceof iShallBe).toBe(true);
  });


  it('should display affirmations menu with three pages if user contributor', () => {
    expect(component.affirmationsMenu.length).toBe(3);
  });

  it('should display account menu with three pages if user contributor', () => {
    expect(component.accountMenu.length).toBe(3);
  });

  it('should display editor menu with three pages if user editor', () => {
    expect(component.editorMenu.length).toBe(3);
  });

});
