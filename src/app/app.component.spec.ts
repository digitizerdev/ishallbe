import { ComponentFixture, async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

import { IonicModule, Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push } from '@ionic-native/push';

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
  PushMock,
  FirebaseProviderMock,
} from '../../test-config/mocks-ionic';

describe('iShallBe Component', () => {
  let fixture;
  let component;
  let platform: Platform;
  let nav: Nav;
  let statusBar: StatusBar;
  let splashScreen: SplashScreen;
  let push: Push;
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
        { provide: Push, useClass: PushMock },
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
    push = fixture.componentRef.injector.get(Push);
    firebase = fixture.componentRef.injector.get(FirebaseProvider);
  });

  afterEach(() => {
    fixture.destroy();
    component = null;
    platform = null;
    nav = null;
    statusBar = null;
    splashScreen = null;
    push = null;
    firebase = null;    
    afa = null;
    afs = null;
  });

  fit('should be created', () => {
    expect(component instanceof iShallBe).toBe(true);
  });

  fit('should have explore menu with three pages', () => {
   expect(component.exploreMenuPages.length).toBe(3);
  });

  fit('should have editor menu with three pages', () => {
    expect(component.engageMenuPages.length).toBe(3);
  });

  fit('should have editor menu with three pages', () => {
    expect(component.editorMenuPages.length).toBe(3);
  });

  fit('should have 1 provider', () => {
    expect(component.providers.length).toBe(1);
  });

  fit('should have 20 pages', () => {
    expect(component.pages.length).toBe(20);
  });

  fit('should initialize root page to StartupPage', () => {
    expect(component['rootPage']).toBe(StartupPage);
  });

  fit('should be able to ready platform', () => {
    expect(component.platformReady).toBeDefined();
  });

  fit('should be able to open a page', () => {
    expect(component.openPage).toBeDefined();
  });

  fit('should listen to editor login', () => {
    expect(component.listenToEditorLogin).toBeDefined();
  });
  
});
