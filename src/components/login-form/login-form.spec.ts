import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, Events, NavController, AlertController, LoadingController, NavParams } from 'ionic-angular';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../environments/environment';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';

import { LoginFormComponent } from './login-form';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { SessionProvider } from '../../providers/session/session';

import { } from 'jasmine';

import {
    FirebaseProviderMock,
    SessionProviderMock,
    NavMock,
    StorageMock,
    AngularFireDatabaseMock,
    AngularFireAuthMock,
    LoadingControllerMock,
    AlertControllerMock,
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
                AngularFireModule.initializeApp(environment.firebase)                
            ],
            providers: [
                { provide: FirebaseProvider, useClass: FirebaseProviderMock },
                { provide: SessionProvider, useClass: SessionProviderMock },
                { provide: Storage, useClass: StorageMock },
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
        spyOn(component, 'auth');        
        let submission = {
            "email": 'testFormEmail',
            "password": 'testFormPassword'
        }
        component.submit(submission);
        fixture.detectChanges();
        expect(component.submission).toBe(submission);
        expect(component.auth).toHaveBeenCalled();
    });

    it('should toggle form submission flag on submission', () => {
        spyOn(component, 'auth');                
        expect(component.submitted).toBeFalsy();
        let submission = {
            "email": 'testFormEmail',
            "password": 'testFormPassword'
        }
        component.submit(submission);
        fixture.detectChanges();
        expect(component.submitted).toBeTruthy();
        expect(component.auth).toHaveBeenCalled();        
    });

    it('should authenticate via email', () => {
        spyOn(component, 'auth')
        let submission = {
            "email": 'testFormEmail',
            "password": 'testFormPassword'
        }
        component.auth(submission.email, submission.password);
        fixture.detectChanges();
        expect(component.auth).toHaveBeenCalled();
    });

    it('should welcome user', () => {
        spyOn(session, 'start');
        let user = {
            "loggedIn": true,
            "editor": false,
            "uid": "test"
          }
        component.welcome(user);
        fixture.detectChanges();
        expect(session.start).toHaveBeenCalled();
    });

    it('should welcome editor user', () => {
        spyOn(session, 'startEditor');
        let user = {
            "loggedIn": true,
            "editor": true,
            "uid": "test"
          }
        component.welcomeEditor(user);
        fixture.detectChanges();
        expect(session.startEditor).toHaveBeenCalled();
    })

    it('should set root to home page on welcome', () => {
        spyOn(component, 'setRootHomePage');
        let user = {
            "loggedIn": true,
            "editor": false,
            "uid": "test"
          }
        component.welcome(user);
        fixture.detectChanges();
        expect(component.setRootHomePage).toHaveBeenCalled();
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
