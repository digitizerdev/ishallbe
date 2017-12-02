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
import { RegisterPage } from '../pages/register/register';
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


describe('iShallBe Component', () => {
  let fixture;
  let component;
  let session: SessionProvider;
  let sessionSpy;

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
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(iShallBe);
    component = fixture.componentInstance;
    session = fixture.componentRef.injector.get(SessionProvider);
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
  })

  it('should have session provider with an existence function that returns a value', () => {
    expect(session.exists()).toBeDefined();
  })

  it('should have a choose root page function that does not return', () => {
    expect(component.chooseRootPage()).toBeUndefined();
  })

  it('should be able to check for user session existence through session provider', () => {
    spyOn(session, 'exists').and.returnValue;
    component.chooseRootPage();
    fixture.detectChanges();
    expect(session.exists).toHaveBeenCalledTimes(1);
  })

  afterEach(() => {
    fixture.destroy();
    component = null;
  });

  /*   it('should choose root page if session found')
      {
      component.chooseRootPage(false);
      fixture.detectChanges();
      expect(component['rootPage']).toBe(LoginPage);
    } */

  /*   it('should call the getUser method on checkIfSessionExists', ()  => {
      expect(session.getUser()).toBeDefined();    
      spyOn(session, 'getUser').and.returnValue;
      component.checkIfSessionExists();
      fixture.detectChanges();
      expect(session.getUser).toHaveBeenCalledTimes(1);
      expect(component.checkIfSessionExists()).toBe(false);
    }); */

});
