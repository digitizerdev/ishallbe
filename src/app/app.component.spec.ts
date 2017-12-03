import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Platform } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Facebook } from '@ionic-native/facebook';
import { Camera } from '@ionic-native/camera';
import { MediaCapture } from '@ionic-native/media-capture';
import { Push } from '@ionic-native/push';
import { File } from '@ionic-native/file';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';

import { FirebaseProvider } from '../providers/firebase/firebase';
import { SessionProvider } from '../providers/session/session';

import { iShallBe } from './app.component';

import {
  PlatformMock,
  StatusBarMock,
  SplashScreenMock,
  StorageMock,
  FacebookMock,
  FileMock,
  PushMock,
  FirebaseProviderMock,
  SessionProviderMock
} from '../../test-config/mocks-ionic';

import { } from 'jasmine';

let fixture;
let component;
let session: SessionProvider;
let sessionSpy;

describe('iShallBe App Component', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [iShallBe],
      imports: [
        IonicModule.forRoot(iShallBe)
      ],
      providers: [
        { provide: StatusBar, useClass: StatusBarMock },
        { provide: SplashScreen, useClass: SplashScreenMock },
        { provide: Platform, useClass: PlatformMock },
        { provide: Storage, useClass: StorageMock },
        { provide: Facebook, useClass: FacebookMock },
        { provide: File, useClass: FileMock },
        { provide: Push, useClass: PushMock },
        { provide: FirebaseProvider, useClass: FirebaseProviderMock },
        { provide: SessionProvider, useClass: SessionProviderMock }
      ],
    })
      .compileComponents().then(()=>{
        fixture = TestBed.createComponent(iShallBe);
        component = fixture.componentInstance;
        session = fixture.componentRef.injector.get(SessionProvider);
      });
  }));

  afterEach(() => {
    fixture.destroy();
    component = null;
    session = null;
    sessionSpy = null;
  });

  it('should be created', () => {
    expect(component instanceof iShallBe).toBe(true);
  });

  it('should have 11 pages', () => {
    expect(component.pages.length).toBe(11);
  });

  it('should have 9 components', () => {
    expect(component.components.length).toBe(9);
  });

  it('should have 2 providers', () => {
    expect(component.providers.length).toBe(2);
  });

  it('should have 5 menu pages', () => {
    expect(component.menuPages.length).toBe(5);
  });

  it('should initialize with login page as root page', () => {
    expect(component['rootPage']).toBe(LoginPage);
  });

  it('should have platform ready function', () => {
    expect(component.platformReady()).toBeUndefined();
  });

  it('should have wake up function', () => {
    expect(component.wakeUp()).toBeUndefined();
  })

  it('should have session provider existence function that returns a value', () => {
    expect(session.exists()).toBeDefined();
  });

  it('should have choose root page function that does not return a value', () => {
    expect(component.chooseRootPage()).toBeUndefined();
  });

  it('should get session from session provider existence function at when choosing root page', () => {
    spyOn(session, 'exists').and.returnValue;
    component.wakeUp();
    fixture.detectChanges();
    expect(session.exists).toHaveBeenCalledTimes(1);
  });

  it('should choose home page to be root page if session found', () => {
    component.chooseRootPage(true);
    fixture.detectChanges();
    expect(component['rootPage']).toBe(HomePage);
  });

  it('should have a open page function', () => {
    expect(component.openPage()).toBeUndefined();
  });

});
