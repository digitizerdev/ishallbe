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

import { HeaderComponent } from '../../components/header/header';
import { LoginFacebookComponent } from '../../components/login-facebook/login-facebook';
import { TermsOfServiceComponent } from '../../components/terms-of-service/terms-of-service';

import { PasswordResetPage } from './password-reset';

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
  
  const fakeAuthState = new BehaviorSubject(null);
  
  const fakeSendPasswordEmailInHandler = (email): Promise<any> => {
    fakeAuthState.next(true);
    return Promise.resolve(true);
  };
  
  const angularFireAuthStub = {
    authState: fakeAuthState,
    auth: {
      sendPasswordResetEmail: jasmine
        .createSpy('sendPasswordResetEmail')
        .and
        .callFake(fakeSendPasswordEmailInHandler)
    },
  };
describe('PasswordResetPage', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PasswordResetPage],
            imports: [
                IonicModule.forRoot(PasswordResetPage),
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
        fixture = TestBed.createComponent(PasswordResetPage);
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
        expect(component instanceof PasswordResetPage).toBe(true);
    });

    it('should be initialized', () => {
        expect(component.passwordResetForm).toBeDefined();
        expect(component.submitted).toBeDefined();
        expect(component.loader).toBeUndefined();
    }); 

    it('should display header component', () => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('header'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

    it('should display password reset form', () => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('form'));
        el = de.nativeElement.innerHTML;
        expect(el).toContain('Reset Password');
        expect(el).toContain('email');
    });

    it('should submit form', () => {
        let passwordResetForm = {
            email: 'testEmail',
        }
        component.submit(passwordResetForm);
        expect(component.submitted).toBeTruthy();
    });;

    it('should request Firebase to send password reset email', () => {
        component.firebase.sendPasswordResetEmail('testEmail');
        expect(afAuth.auth.sendPasswordResetEmail)
          .toHaveBeenCalledWith('testEmail');
    });

    it('should display login button', () => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('#PasswordResetLoginButton'));
        el = de.nativeElement.innerHTML
        expect(el).toContain('Login');
    });

    it('should be able to pop back to LoginPage', () => {
        spyOn(nav, 'pop');
        component.popToLoginPage();
        fixture.detectChanges();
        expect(nav.pop).toHaveBeenCalled();
    });

});