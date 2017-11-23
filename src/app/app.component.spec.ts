import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Platform } from 'ionic-angular';

import { UserProvider } from '../providers/user/user';
import { ContentProvider } from '../providers/content/content';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Facebook } from '@ionic-native/facebook';
import { Camera } from '@ionic-native/camera';
import { MediaCapture } from '@ionic-native/media-capture';
import { Push } from '@ionic-native/push';
import { File } from '@ionic-native/file';
import { Storage } from '@ionic/storage';
import {} from 'jasmine';

import { Sean } from './app.component';
import {
  PlatformMock,
  StatusBarMock,
  SplashScreenMock,
  UserProviderMock,
  ContentProviderMock,
  StorageMock,
  FacebookMock,
  FileMock,
  PushMock
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
        { provide: UserProvider, useClass: UserProviderMock },    
        { provide: ContentProvider, useClass: ContentProviderMock },                
        { provide: StatusBar, useClass: StatusBarMock },
        { provide: SplashScreen, useClass: SplashScreenMock },
        { provide: Platform, useClass: PlatformMock },
        { provide: Storage, useClass: StorageMock },       
        { provide: Facebook, useClass: FacebookMock },
        { provide: File, useClass: FileMock },
        { provide: Push, useClass: PushMock }                                        
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

  it('should have two pages', () => {
    expect(component.pages.length).toBe(3);
  });

  it('should have home page', () => {
    expect(component.pages[2].title).toBe('Home Page');
  });

});
