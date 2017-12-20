import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, Events, NavController, AlertController, LoadingController, NavParams } from 'ionic-angular';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../environments/environment';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { EmailComposer } from '@ionic-native/email-composer'

import { AccountEmailFormComponent } from './account-email-form';

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
let digital: DigitalProvider;
let digitalSpy;

describe('AccountEmailFormComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountEmailFormComponent],
      imports: [
        IonicModule.forRoot(AccountEmailFormComponent),
        AngularFireModule.initializeApp(environment.firebase),
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
    fixture = TestBed.createComponent(AccountEmailFormComponent);
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
    expect(component instanceof AccountEmailFormComponent).toBe(true);
  });

  it('should be initialized', () => {
    expect(component.submitted).toBeFalsy();
    expect(component.loader).toBeUndefined();
    expect(component.profile).toBeUndefined();
    expect(component.form.email).toBeUndefined();
  });

  it('should ask for uid from Session Provider', () => {
    spyOn(session, 'uid').and.returnValue({ subscribe: () => { } });
    component.requestUID();
    fixture.detectChanges();
    expect(session.uid).toHaveBeenCalled();
  });

  it('should use uid to ask for profile from Firebase Provider', () => {
    spyOn(firebase, 'profile').and.returnValue({ subscribe: () => { } })
    component.requestProfile('testUID');
    fixture.detectChanges();
    expect(firebase.profile).toHaveBeenCalled();
  });

  it('should submit via Update Email Button', async(() => {
    let de: DebugElement;
    let el: HTMLElement;
    de = fixture.debugElement.query(By.css('#AccountUpdateEmailButton'));
    el = de.nativeElement.innerHTML
    expect(el).toContain('Update Email');
  }));

  it('should prepare request by building data and starting loader', () => {
    spyOn(component, 'buildData');
    spyOn(component, 'startLoader');
    let form = {
      "email": 'testFormEmail',
    }
    component.prepareRequest(form);
    fixture.detectChanges();
    expect(component.buildData).toHaveBeenCalled();
    expect(component.startLoader).toHaveBeenCalled();
  });

  it('should request Firebase Provider to update account email', () => {
    spyOn(firebase, 'updateAccountEmail').and.returnValue({ subscribe: () => { } });
    component.requestAccountEmailUpdate('testEmail');
    fixture.detectChanges();
    expect(firebase.updateAccountEmail).toHaveBeenCalled();
  });

  it('should request Firebase Provider to update profile email', () => {
    spyOn(firebase, 'setObject').and.returnValue({ subscribe: () => { } });
    let profile = {
      email: "testEmail",
      uid: "testUID",
      blocked: false,
      name: "testName",
      role: "testRole",
      photo: "testPhoto"
    }
    component.requestProfileEmailUpdate(profile);
    fixture.detectChanges();
    expect(firebase.setObject).toHaveBeenCalled();
  });

  it('should confirm delivery by displaying alert', () => {
    spyOn(component, 'endLoader');
    spyOn(component, 'presentConfirmationAlert');
    spyOn(component, 'setRootAccountPage');
    component.confirmDelivery();
    fixture.detectChanges();
    expect(component.endLoader).toHaveBeenCalled();
    expect(component.presentConfirmationAlert).toHaveBeenCalled();
    expect(component.setRootAccountPage).toHaveBeenCalled();
  });

});
