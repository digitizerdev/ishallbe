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

  it('should have 5 menu pages', () => {
    expect(component.menuPages.length).toBe(5);
  })

  it('should have 21 pages', () => {
    expect(component.pages.length).toBe(21);
  });

  it('should have 2 providers', () => {
    expect(component.providers.length).toBe(2);
  });

  it('should initialize with login page as root page', () => {
    expect(component['rootPage']).toBe(LoginPage);
  });

  it('should set home page to be root page if session found', () => {
    component.setRootHomePage(true);
    fixture.detectChanges();
    expect(component['rootPage']).toBe(HomePage);
  });

  it('should have wake up function', () => {
    expect(component.wakeUp()).toBeUndefined();
  })

  it('should have session provider existence function that returns a value', () => {
    expect(session.found()).toBeDefined();
  });

  it('should find session when choosing root page', () => {
    spyOn(session, 'found').and.returnValue;
    component.wakeUp();
    fixture.detectChanges();
    expect(session.found).toHaveBeenCalledTimes(1);
  });

  it('should add manager pages to menuPages in order if editor', () => {
    let standardMenuPagesLength = component.menuPages.length;
    let managerMenuPagesLength = component.managerPages.length + component.menuPages.length
    session.user.editor = true;
    component.wakeUp();
    fixture.detectChanges();
    let managerPagePosition = 0;
    for (let pages = standardMenuPagesLength; pages < component.menuPages.length; pages++) {
      expect(component.menuPages.indexOf(component.managerPages[managerPagePosition])).toBe(pages);
      managerPagePosition++;
    }
  });

  it('should have setManagerMenu function that does not return a value', () => {
    expect(component.setManagerMenu()).toBeUndefined();
  });

});
