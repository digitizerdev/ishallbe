import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, Events, NavController, AlertController, LoadingController, NavParams } from 'ionic-angular';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../environments/environment';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { EmailComposer } from '@ionic-native/email-composer';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { SessionProvider } from '../../providers/session/session';

import { } from 'jasmine';

import { SupportFormComponent } from './support-form';

import {
  FirebaseProviderMock,
  SessionProviderMock,
  EmailComposerMock,
  NavMock,
  StorageMock,
  AngularFireDatabaseMock,
  AngularFireAuthMock,
  LoadingControllerMock,
  AlertControllerMock,
} from '../../../test-config/mocks-ionic';

describe('ResetPasswordFormComponent', () => {
  let fixture;
  let component;
  let session: SessionProvider;
  let sessionSpy;
  let firebase: FirebaseProvider;
  let firebaseSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SupportFormComponent],
      imports: [
        IonicModule.forRoot(SupportFormComponent),
      ],
      providers: [
        { provide: FirebaseProvider, useClass: FirebaseProviderMock },
        { provide: SessionProvider, useClass: SessionProviderMock },
        { provide: Storage, useClass: StorageMock },
        { provide: EmailComposer, useClass: EmailComposerMock },        
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavMock },
        { provide: AngularFireDatabase, useClass: AngularFireDatabaseMock },
        { provide: AngularFireAuth, useClass: AngularFireAuthMock },
        { provide: AlertController, useClass: AlertControllerMock },
        { provide: LoadingController, useClass: LoadingControllerMock }
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
    expect(component instanceof SupportFormComponent).toBe(true);
  });

  it('should submit form input', () => {
    let submission = {
      "subject": "testSubject",
      "body": "testMessage"
    }
    component.submit(submission);
    fixture.detectChanges();
    expect(component.submission).toBe(submission);
  });

  it('should toggle form submission flag on submission', () => {
    expect(component.submitted).toBeFalsy();
    let submission = {
      "subject": "testSubject",
      "body": "testMessage"
    }
    component.submit(submission);
    fixture.detectChanges();
    expect(component.submitted).toBeTruthy();
  });

  it('Should send submission to via Ionic Native Email Composer', () => {
    spyOn(component, 'send');
    let submission = {
      "subject": "testSubject",
      "body": "testMessage"
    }
    component.submit(submission);
    fixture.detectChanges();
    expect(component.send).toHaveBeenCalled();
  });

  it('should set root to home page after send', () => {
    spyOn(component, 'setRootHomePage');
    spyOn(component, 'send');
    let submission = {
      "subject": "testSubject",
      "body": "testMessage"
    }
    component.submit(submission);
    fixture.detectChanges();
    expect(component.setRootHomePage).toHaveBeenCalled();
    expect(component.send).toHaveBeenCalled();    
  });

  it('should log error message on error', () => {
    expect(component.error).toBeUndefined();
    let error = {
      "code": "invalid",
      "message": "Test Error"
    }
    component.errorHandler(error);
    expect(component.error).toBe(error);
  });

});