import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Platform } from 'ionic-angular';

import { FirebaseProvider } from '../providers/firebase/firebase';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Facebook } from '@ionic-native/facebook';
import { Camera } from '@ionic-native/camera';
import { MediaCapture } from '@ionic-native/media-capture';
import { Push } from '@ionic-native/push';
import { File } from '@ionic-native/file';
import { Storage } from '@ionic/storage';
import {} from 'jasmine';

import { TabsPage } from '../pages/tabs/tabs';

import { Sean } from './app.component';
import {
  PlatformMock,
  StatusBarMock,
  SplashScreenMock,
  StorageMock,
  FacebookMock,
  FileMock,
  PushMock,
  FirebaseProviderMock
} from '../../test-config/mocks-ionic';

describe('Sean Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Sean],
      imports: [
        IonicModule.forRoot(Sean)
      ],
      providers: [
        { provide: StatusBar, useClass: StatusBarMock },
        { provide: SplashScreen, useClass: SplashScreenMock },
        { provide: Platform, useClass: PlatformMock },
        { provide: Storage, useClass: StorageMock },       
        { provide: Facebook, useClass: FacebookMock },
        { provide: File, useClass: FileMock },
        { provide: Push, useClass: PushMock },
        { provide: FirebaseProvider, useClass: FirebaseProviderMock }                                   
      ],
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sean);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof Sean).toBe(true);
  });

  it('should have 20 pages', () => {
    expect(component.pages.length).toBe(20);
  });

  it('should have 1 providers', () => {
    expect(component.providers.length).toBe(1);
  });

  it('initialises with a root page of TabsPage', () => {
    expect(component['rootPage']).toBe(TabsPage);
  })

  afterEach(() => {
    fixture.destroy();
    component = null;
});

});
