import { ComponentFixture, async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { IonicModule, Events, NavController, NavParams } from 'ionic-angular';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../environments/environment';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

import { StartupPage } from './startup';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

import { FirebaseProvider } from '../../providers/firebase/firebase';

import { } from 'jasmine';

import {
    FirebaseProviderMock,
    NavMock,
    StorageMock,
    AngularFireDatabaseMock,
    AngularFireAuthMock
} from '../../../test-config/mocks-ionic';

let fixture;
let component;
let nav: NavController;
let firebase: FirebaseProvider;
let storage: Storage;
let afAuth: AngularFireAuth;
let isAuth$: Subscription;
let isAuthRef: boolean;

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
      createUserWithEmailAndPassword: jasmine
        .createSpy('createUserWithEmailAndPassword')
        .and
        .callFake(fakeSignInHandler),
      signInWithEmailAndPassword: jasmine
        .createSpy('signInWithEmailAndPassword')
        .and
        .callFake(fakeSignInHandler),
      signOut: jasmine
        .createSpy('signOut')
        .and
        .callFake(fakeSignOutHandler),
    },
  }

describe('StartupPage', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StartupPage],
            imports: [
                IonicModule.forRoot(StartupPage),
                AngularFireModule.initializeApp(environment.firebase)
            ],
            providers: [
                { provide: FirebaseProvider, useClass: FirebaseProviderMock },
                { provide: Storage, useClass: StorageMock },
                { provide: NavController, useClass: NavMock },
                { provide: NavParams, useClass: NavMock },
                { provide: AngularFireDatabase, useClass: AngularFireDatabaseMock },
                { provide: AngularFireAuth, useValue: angularFireAuthStub },                
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StartupPage);
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
    });

    it('should be created', () => {
        expect(component instanceof StartupPage).toBe(true);
    });

    it('should be initialized', () => {
        expect(component.page).toBeUndefined();
        expect(component.session).toBeDefined();
    });

    it('should load centered icon as startup image', () => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('img'));
        el = de.nativeElement.src
        expect(el).toContain('assets/img/icon.png');
    });

    it('should load view on entrance', fakeAsync(() => {
        spyOn(component, 'loadView').and.callThrough();
        component.ionViewDidEnter();
        tick();
        fixture.detectChanges();
        expect(component.loadView).toHaveBeenCalled();
    }));

    it('should request session from Storage to determine which view to load', fakeAsync(() => {
        spyOn(component, 'requestSession').and.callThrough();
        spyOn(storage, 'ready').and.callThrough();
        spyOn(storage, 'get').and.callThrough();
        component.loadView();
        tick();
        fixture.detectChanges();
        expect(storage.ready).toHaveBeenCalled();
        expect(storage.get).toHaveBeenCalled();
        expect(component.requestSession).toHaveBeenCalled();
    }));;

    it('should set view to LoginPage if session not found', () => {
        expect(component.page).toBeUndefined();
        spyOn(nav, 'setRoot').and.returnValue;        
        component.setView();
        expect(component.page).toBe(LoginPage);
        expect(nav.setRoot).toHaveBeenCalled(); 
    });

    it('should set view to HomePage if session found', () => {
        expect(component.page).toBeUndefined();
        spyOn(nav, 'setRoot').and.returnValue;        
        component.session = true;
        component.setView();
        expect(component.page).toBe(HomePage);
        expect(nav.setRoot).toHaveBeenCalled();
    });

});
