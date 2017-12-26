import { ComponentFixture, async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { IonicModule, Events, NavController, NavParams } from 'ionic-angular';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { Facebook } from '@ionic-native/facebook';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../environments/environment';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

import { HeaderComponent } from '../header/header';
import { LoginFacebookComponent } from '../login-facebook/login-facebook';
import { TermsOfServiceComponent } from '../terms-of-service/terms-of-service';

import { FirebaseProvider } from '../../providers/firebase/firebase';

import { } from 'jasmine';

import {
    FirebaseProviderMock,
    NavMock,
    StorageMock,
    AngularFireDatabaseMock,
    AngularFireAuthMock,
    FacebookMock
} from '../../../test-config/mocks-ionic';

let fixture;
let component;
let nav: NavController;
let firebase: FirebaseProvider;
let storage: Storage;
let afAuth: AngularFireAuth;
let isAuth$: Subscription;
let isAuthRef: boolean;
let facebook: Facebook;

const credentialsMock = {
    email: 'abc@123.com',
    password: 'password'
  };
  
  const userMock = {
    uid: 'ABC123',
    email: credentialsMock.email,
  };
  
  const fakeAuthState = new BehaviorSubject(null);
  
  const fakeSignInHandler = (email, password): Promise<any> => {
    fakeAuthState.next(userMock);
    return Promise.resolve(userMock);
  };
  
  const fakeSignOutHandler = (): Promise<any> => {
    fakeAuthState.next(null);
    return Promise.resolve();
  };  
  
  const angularFireAuthStub = {
    authState: fakeAuthState,
    auth: {
      signInWithEmailAndPassword: jasmine
        .createSpy('signInWithEmailAndPassword')
        .and
        .callFake(fakeSignInHandler)
    },
  };
  
describe('LoginFacebookComponent', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LoginFacebookComponent],
            imports: [
                IonicModule.forRoot(LoginFacebookComponent),
                AngularFireModule.initializeApp(environment.firebase)
            ],
            providers: [
                { provide: FirebaseProvider, useClass: FirebaseProviderMock },
                { provide: Storage, useClass: StorageMock },
                { provide: NavController, useClass: NavMock },
                { provide: NavParams, useClass: NavMock },
                { provide: AngularFireDatabase, useClass: AngularFireDatabaseMock },
                { provide: AngularFireAuth, useValue: angularFireAuthStub },
                { provide: Facebook, useClass: FacebookMock }
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginFacebookComponent);
        component = fixture.componentInstance;
        nav = fixture.componentRef.injector.get(NavController);
        storage = fixture.componentRef.injector.get(Storage);
        firebase = fixture.componentRef.injector.get(FirebaseProvider);
        afAuth = TestBed.get(AngularFireAuth);   
    });

    afterEach(() => {
        fixture.destroy();
        component = null;
        nav = null;
        storage = null;
        firebase = null;        
        afAuth = null;
        fakeAuthState.next(null);
        facebook = null;
    });

    it('should be created', () => {
        expect(component instanceof LoginFacebookComponent).toBe(true);
    });

    it('should be initialized', () => {
        expect(component.uid).toBeUndefined();
        expect(component.loader).toBeUndefined();
    });

});