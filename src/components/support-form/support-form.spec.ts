import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, Events, NavController, AlertController, LoadingController, NavParams } from 'ionic-angular';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../environments/environment';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { SupportFormComponent } from './support-form';
import { EmailComposer } from '@ionic-native/email-composer';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { SessionProvider } from '../../providers/session/session';
import { NativeProvider } from '../../providers/native/native';
import { } from 'jasmine';

import {
  FirebaseProviderMock,
  SessionProviderMock,
  NativeProviderMock,
  NavMock,
  StorageMock,
  AngularFireDatabaseMock,
  AngularFireAuthMock,
  LoadingControllerMock,
  AlertControllerMock,
  EmailComposerMock
} from '../../../test-config/mocks-ionic';

let fixture;
let component;
let session: SessionProvider;
let sessionSpy;
let firebase: FirebaseProvider;
let firebaseSpy;
let native: NativeProvider;
let nativeSpy;

describe('SupportFormComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SupportFormComponent],
      imports: [
        IonicModule.forRoot(SupportFormComponent),
        AngularFireModule.initializeApp(environment.firebase)
      ],
      providers: [
        { provide: FirebaseProvider, useClass: FirebaseProviderMock },
        { provide: SessionProvider, useClass: SessionProviderMock },
        { provide: NativeProvider, useClass: NativeProviderMock },
        { provide: Storage, useClass: StorageMock },
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavMock },
        { provide: AngularFireDatabase, useClass: AngularFireDatabaseMock },
        { provide: AngularFireAuth, useClass: AngularFireAuthMock },
        { provide: AlertController, useClass: AlertControllerMock },
        { provide: LoadingController, useClass: LoadingControllerMock },
        { provide: EmailComposer, useClass: EmailComposerMock }
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportFormComponent);
    component = fixture.componentInstance;
    session = fixture.componentRef.injector.get(SessionProvider);
    firebase = fixture.componentRef.injector.get(FirebaseProvider);
    native = fixture.componentRef.injector.get(NativeProvider);
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
  });

  it('should be created', () => {
    expect(component instanceof SupportFormComponent).toBe(true);
  });

  it('should be initialized', () => {
    expect(component.submitted).toBeFalsy();
    expect(component.loader).toBeUndefined();
    expect(component.form.subject).toBeUndefined();
    expect(component.form.body).toBeUndefined();
    expect(component.profile).toBeUndefined();
  });

  it('should submit via Send Email Button', async(() => {
    let de: DebugElement;
    let el: HTMLElement;
    de = fixture.debugElement.query(By.css('#SendSupportEmailButton'));
    el = de.nativeElement.innerHTML
    expect(el).toContain('Send Email');
  }));

  it('should prepare request by building data and starting loader', () => {
    spyOn(component, 'buildData');
    spyOn(component, 'startLoader');
    let form = {
      "subject": "testSubject",
      "body": "testBody",
    }
    component.prepareRequest(form);
    fixture.detectChanges();
    expect(component.buildData).toHaveBeenCalled();
    expect(component.startLoader).toHaveBeenCalled();
  });

  it('should request Firebase Provider to send emailComposer', () => {
    spyOn(native, 'composeEmail').and.callThrough();
    let email = {
      to: 'testTo',
      subject: 'testSubject',
      body: 'testBody',
      isHtml: true
    };
    component.requestEmailComposerToSendEmail(email);
    fixture.detectChanges();
    expect(native.composeEmail).toHaveBeenCalled();
  });

  it('should confirm delivery by displaying alert', () => {
    spyOn(component, 'endLoader');
    spyOn(component, 'presentConfirmationAlert');
    spyOn(component, 'setRootHomePage');
    component.confirmDelivery();
    fixture.detectChanges();
    expect(component.endLoader).toHaveBeenCalled();
    expect(component.presentConfirmationAlert).toHaveBeenCalled();
    expect(component.setRootHomePage).toHaveBeenCalled();
  });

});