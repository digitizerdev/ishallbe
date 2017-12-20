import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, Events, NavController, NavParams } from 'ionic-angular';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../environments/environment';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';

import { HeaderComponent } from '../../components/header/header';
import { LoginFormComponent } from '../../components/login-form/login-form';
import { LoginFacebookComponent } from '../../components/login-facebook/login-facebook';
import { TermsOfServiceComponent } from '../../components/terms-of-service/terms-of-service';

import { PasswordResetPage } from './password-reset';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { SessionProvider } from '../../providers/session/session';
import { NativeProvider } from '../../providers/native/native';
import { DigitalProvider } from '../../providers/digital/digital';

import { } from 'jasmine';

import {
  FirebaseProviderMock,
  SessionProviderMock,
  NativeProviderMock,
  DigitalProviderMock,
  NavMock,
  StorageMock,
  AngularFireDatabaseMock,
  AngularFireAuthMock
} from '../../../test-config/mocks-ionic';

let fixture;
let component;
let session: SessionProvider;
let sessionSpy;
let firebase: FirebaseProvider;
let firebaseSpy;
let native: NativeProvider;
let nativeSpy;
let digital: DigitalProvider;
let digitalSpy;

describe('PasswordResetPage', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordResetPage],
      imports: [
        IonicModule.forRoot(PasswordResetPage),
      ],
      providers: [
        { provide: FirebaseProvider, useClass: FirebaseProviderMock },
        { provide: SessionProvider, useClass: SessionProviderMock },
        { provide: NativeProvider, useClass: NativeProviderMock },
        { provide: DigitalProvider, useClass: DigitalProviderMock },
        { provide: Storage, useClass: StorageMock },
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavMock },
        { provide: AngularFireDatabase, useClass: AngularFireDatabaseMock },
        { provide: AngularFireAuth, useClass: AngularFireAuthMock },
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordResetPage);
    component = fixture.componentInstance;
    session = fixture.componentRef.injector.get(SessionProvider);
    firebase = fixture.componentRef.injector.get(FirebaseProvider);
    native = fixture.componentRef.injector.get(NativeProvider);
    digital = fixture.componentRef.injector.get(DigitalProvider);
  });

  afterEach(() => {
    fixture.destroy();
    component = null;
    session = null;
    sessionSpy = null;
    firebase = null;
    firebaseSpy = null;
    native = null;
    nativeSpy = null;
    digital = null;
    digitalSpy = null;
    });

  it('should be created', () => {
    expect(component instanceof PasswordResetPage).toBe(true);
  });

  it('should display header component', () => {
    let de: DebugElement;
    let el: HTMLElement;
    de = fixture.debugElement.query(By.css('header'));
    el = de.nativeElement.src;
    expect(el).toBeUndefined();
  });

  it('should display reset-password-form component', () => {
    let de: DebugElement;
    let el: HTMLElement;
    de = fixture.debugElement.query(By.css('reset-password-form'));
    el = de.nativeElement.src;
    expect(el).toBeUndefined();
  });

  it('should display login button', async(() => {
    let de: DebugElement;
    let el: HTMLElement;
    de = fixture.debugElement.query(By.css('#ForgotPasswordLoginButton'));
    el = de.nativeElement.innerHTML
    expect(el).toContain('Login');
  }));

});
