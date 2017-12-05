import { async, TestBed, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HomePage } from '../../pages/home/home';

import {} from 'jasmine';

import { AccountLoginFacebookComponent } from './account-login-facebook';

import { SessionProvider } from '../../providers/session/session';
import { FirebaseProvider } from '../../providers/firebase/firebase';

import {
  NavMock,
  SessionProviderMock,
  FirebaseProviderMock,  
  StorageMock
} from '../../../test-config/mocks-ionic';

describe('SocialFacebook Component', () => {
  let fixture;
  let component;
  let session: SessionProvider;
  let sessionSpy;
  let firebase: FirebaseProvider;
  let firebaseSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountLoginFacebookComponent],
      imports: [
        IonicModule.forRoot(AccountLoginFacebookComponent),
        IonicStorageModule.forRoot()
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavMock }, 
        { provide: FirebaseProvider, useClass: FirebaseProviderMock },
        { provide: SessionProvider, useClass: SessionProviderMock },
        { provide: IonicStorageModule, useClass: StorageMock }
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountLoginFacebookComponent);
    component = fixture.componentInstance;
    session = fixture.componentRef.injector.get(SessionProvider);
    firebase = fixture.componentRef.injector.get(FirebaseProvider);     
  });

  afterEach(() => {
    fixture.destroy();
    component = null;
    session = null;
    sessionSpy = null;
    firebase = null;
    firebaseSpy = null;
  });

  it('should be created', () => {
    expect(component instanceof AccountLoginFacebookComponent).toBe(true);
  });

});