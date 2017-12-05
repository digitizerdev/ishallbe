import { async, TestBed, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HomePage } from '../../pages/home/home';

import {} from 'jasmine';

import { SocialFacebookComponent } from './social-facebook';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { SessionProvider } from '../../providers/session/session';

import {
  NavMock,
  FirebaseProviderMock,
  SessionProviderMock,
  StorageMock
} from '../../../test-config/mocks-ionic';

describe('SocialFacebook Component', () => {
  let fixture;
  let component;
  let session: SessionProvider;
  let sessionSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SocialFacebookComponent],
      imports: [
        IonicModule.forRoot(SocialFacebookComponent),
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
    fixture = TestBed.createComponent(SocialFacebookComponent);
    component = fixture.componentInstance;
    session = fixture.componentRef.injector.get(SessionProvider); 
  });

  afterEach(() => {
    fixture.destroy();
    component = null;
    session = null;
    sessionSpy = null;
  });

  it('should be created', () => {
    expect(component instanceof SocialFacebookComponent).toBe(true);
  });

  it('should populate session object with facebook browser session', fakeAsync(() => {
    component.loginWithFacebook();
    fixture.detectChanges();
    tick();
    expect(component.session).toBeTruthy();
  }));

});
