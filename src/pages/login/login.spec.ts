import { ComponentFixture, async, tick, TestBed, fakeAsync } from '@angular/core/testing';
import { IonicModule, Events, NavController, NavParams, } from 'ionic-angular';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/first';

import { } from 'jasmine';

import { HomePage } from '../home/home';
import { LoginPage } from './login';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { SessionProvider } from '../../providers/session/session';

import {
  NavMock,
  FirebaseProviderMock,
  SessionProviderMock,
  StorageMock
} from '../../../test-config/mocks-ionic';

let fixture;
let component;
let session: SessionProvider;
let sessionSpy;

describe('Login Page', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage], 
      imports: [
        IonicModule.forRoot(LoginPage),
        IonicStorageModule.forRoot()
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavMock },
        { provide: FirebaseProvider, useClass: FirebaseProviderMock },
        { provide: SessionProvider, useClass: SessionProviderMock },
        { provide: Storage, useClass: StorageMock}
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
  });

  afterEach(() => {
    fixture.destroy();
    component = null;
    session = null;
    sessionSpy = null;
  });

  it('should be created', () => {
    expect(component instanceof LoginPage).toBe(true);
  });

});
