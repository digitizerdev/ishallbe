import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, Events, NavController, NavParams } from 'ionic-angular';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { IonicStorageModule, Storage } from '@ionic/storage';

import { LoginFormComponent } from './login-form';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { SessionProvider } from '../../providers/session/session';

import { } from 'jasmine';

import {
  FirebaseProviderMock,
  SessionProviderMock,
  NavMock,
  StorageMock  
} from '../../../test-config/mocks-ionic';

let fixture;
let component;
let session: SessionProvider;
let sessionSpy;
let firebase: FirebaseProvider;
let firebaseSpy;

describe('LoginFormComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginFormComponent], 
      imports: [
        IonicModule.forRoot(LoginFormComponent),
      ],
      providers: [
        { provide: FirebaseProvider, useClass: FirebaseProviderMock },
        { provide: SessionProvider, useClass: SessionProviderMock },
        { provide: Storage, useClass: StorageMock },
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavMock }        
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
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
    expect(component instanceof LoginFormComponent).toBe(true);
  });

  it('should submit form input', () => {
    let submission = {
        "email": 'testFormEmail',
        "password": 'testFormPassword'
    }
    component.submit(submission);
    fixture.detectChanges();
    expect(component.submission).toBe(submission);
  });

  it('should toggle form submission flag on submission', () => {
    expect(component.submitted).toBeFalsy();    
    let submission = {
        "email": 'testFormEmail',
        "password": 'testFormPassword'
    }
    component.submit(submission);
    fixture.detectChanges();
    expect(component.submitted).toBeTruthy();
  });

  it('should log error message on submission error', () => {
    expect(component.submitted).toBeFalsy();
    let error = {
        "code": "invalid",
        "message": "Test Error"
    }  
    component.submissionError(error)
    expect(component.error).toBe(error);
  });

});
