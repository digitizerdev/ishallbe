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

import { LoginPage } from './login';

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

describe('LoginPage', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [
        IonicModule.forRoot(LoginPage),
        AngularFireModule.initializeApp(environment.firebase)
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
    fixture = TestBed.createComponent(LoginPage);
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
    expect(component instanceof LoginPage).toBe(true);
  });

  it('should display header component', async(() => {
    let de: DebugElement;
    let el: HTMLElement;
    de = fixture.debugElement.query(By.css('header'));
    el = de.nativeElement.src;
    expect(el).toBeUndefined();
  }));

  it('should display login-form component', async(() => {
    let de: DebugElement;
    let el: HTMLElement;
    de = fixture.debugElement.query(By.css('login-form'));
    el = de.nativeElement.src;
    expect(el).toBeUndefined();
  }));

  it('should display login-facebook component', async(() => {
    let de: DebugElement;
    let el: HTMLElement;
    de = fixture.debugElement.query(By.css('login-facebook'));
    el = de.nativeElement.src;
    expect(el).toBeUndefined();
  }));

  it('should display register button', async(() => {
    let de: DebugElement;
    let el: HTMLElement;
    de = fixture.debugElement.query(By.css('#LoginRegisterButton'));
    el = de.nativeElement.innerHTML
    expect(el).toContain('Register');
  }));

  it('should display forgot password button', async(() => {
    let de: DebugElement;
    let el: HTMLElement;
    de = fixture.debugElement.query(By.css('#LoginForgotPasswordButton'));
    el = de.nativeElement.innerHTML
    expect(el).toContain('Forgot Password?');
  }));

  it('should display terms-of-service component', () => {
    let de: DebugElement;
    let el: HTMLElement;
    de = fixture.debugElement.query(By.css('terms-of-service'));
    el = de.nativeElement.src;
    expect(el).toBeUndefined();
  });

  it('should request authentication state from Session Provider when awoken', () => {
    spyOn(session, 'loggedIn').and.returnValue({ subscribe: () => {} })
    component.wakeUp();
    fixture.detectChanges();
    expect(session.loggedIn).toHaveBeenCalled();
  });

});
