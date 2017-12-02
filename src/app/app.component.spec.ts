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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(iShallBe);
    component = fixture.componentInstance;
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

  it('should have 5 menu pages', ()=>{
    expect(component.menuPages.length).toBe(5);
  })

  it('should initialises with a root page of Login if session not found', () => {
    component.loggedIn = false;    
    expect(component.loggedIn).toBe(false);
    component.enablePortal(component.loggedIn);
    fixture.detectChanges();
    expect(component['rootPage']).toBe(LoginPage);
  });

  it('should initialises with a root page of Home if session found', () => {
    component.loggedIn = true;
    expect(component.loggedIn).toBe(true);
    component.enablePortal(component.loggedIn);
    fixture.detectChanges();
    expect(component['rootPage']).toBe(HomePage);
  });
  
  afterEach(() => {
    fixture.destroy();
    component = null;
  });

});
