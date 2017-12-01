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

import { FirebaseProvider } from '../providers/firebase/firebase';
import { StorageProvider } from '../providers/storage/storage';

import { } from 'jasmine';

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
  StorageProviderMock
} from '../../test-config/mocks-ionic';

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
        { provide: StorageProvider, useClass: StorageProviderMock }
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

  it('should have 10 pages', () => {
    expect(component.pages.length).toBe(10);
  });

  it('should have 8 components', () => {
    expect(component.components.length).toBe(8);
  });

  it('should have 2 providers', () => {
    expect(component.providers.length).toBe(2);
  });

  it('initialises with a root page of LoginPage', () => {
    expect(component['rootPage']).toBe(LoginPage);
});

  afterEach(() => {
    fixture.destroy();
    component = null;
  });

});
