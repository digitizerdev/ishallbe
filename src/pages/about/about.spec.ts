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

import { AboutPage } from './about';

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

describe('AboutPage', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AboutPage],
      imports: [
        IonicModule.forRoot(AboutPage),
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
    fixture = TestBed.createComponent(AboutPage);
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
    expect(component instanceof AboutPage).toBe(true);
  });

  it('should have title called About', () => {
    expect(component.title).toBe('About');
  });

  it('should display Shelby Tinsley Headshot', async(() => {
    let de: DebugElement;
    let el: HTMLElement;
    de = fixture.debugElement.query(By.css('img'));
    el = de.nativeElement.src
    expect(el).toContain('/assets/img/headshot.png');
  }));

  it('should display If You Speak It, It Shall Be', async(() => {
    let de: DebugElement;
    let el: HTMLElement;
    de = fixture.debugElement.query(By.css('h2'));
    el = de.nativeElement.innerHTML
    expect(el).toContain('If You Speak It, It Shall Be!');
  }));

  it('should display welcome video', async(() => {
    let de: DebugElement;
    let el: HTMLElement;
    de = fixture.debugElement.query(By.css('source'));
    el = de.nativeElement.src
    expect(el).toContain('https://ishallbe.co/wp-content/uploads/2017/06/iShallbe-Promo.m4v');
  }));

  it('should display about information', async(() => {
    let de: DebugElement;
    let el: HTMLElement;
    de = fixture.debugElement.query(By.css('h5'));
    el = de.nativeElement.innerHTML
    expect(el).toContain('iShallBe is your daily boost');
  }));

});
