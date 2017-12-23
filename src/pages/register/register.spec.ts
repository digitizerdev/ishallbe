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

import { RegisterPage } from './register';

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
      signOut: jasmine
        .createSpy('signOut')
        .and
        .callFake(fakeSignOutHandler),
    },
  };
describe('RegisterPage', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RegisterPage],
            imports: [
                IonicModule.forRoot(RegisterPage),
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
        fixture = TestBed.createComponent(RegisterPage);
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
        expect(component instanceof RegisterPage).toBe(true);
    });

    it('should be initialized', () => {
        expect(component.registerForm).toBeDefined();
        expect(component.submitted).toBeDefined();
        expect(component.loader).toBeUndefined();
        expect(component.uid).toBeUndefined();
    });

    it('should display header component', () => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('header'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

    it('should display login-facebook component', () => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('login-facebook'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

    it('should submit via Register Button', async(() => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('#RegisterButton'));
        el = de.nativeElement.innerHTML
        expect(el).toContain('Register');
    }));

    it('should present alert to confirm EULA agreement', () => {
        expect(component.presentEULAA).toBeUndefined();
    });

    it('should display register form', () => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('form'));
        el = de.nativeElement.innerHTML;
        expect(el).toContain('Register with Email');
        expect(el).toContain('name');
        expect(el).toContain('email');
        expect(el).toContain('password');
    });

    it('should submit form', () => {
        let registerForm = {
            name: 'testName',
            email: 'testEmail',
            password: 'testPassword'
        }
        component.submit(registerForm);
        expect(component.submitted).toBeTruthy();
    });

    it('should request Firebase to create user', () => {
        component.firebase.register(credentialsMock);
        expect(afAuth.auth.createUserWithEmailAndPassword)
          .toHaveBeenCalledWith(credentialsMock.email, credentialsMock.password);
    });

    it('should confirm delivery by displaying alert', () => {
        spyOn(component, 'endLoader');
        spyOn(component, 'presentConfirmationAlert');
        spyOn(component, 'startSession');
        spyOn(component, 'setRootHomePage');
        component.confirmDelivery();
        fixture.detectChanges();
        expect(component.endLoader).toHaveBeenCalled();
        expect(component.presentConfirmationAlert).toHaveBeenCalled();
        expect(component.startSession).toHaveBeenCalled();
        expect(component.setRootHomePage).toHaveBeenCalled();
    });

    it('should display login button', () => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('#RegisterLoginButton'));
        el = de.nativeElement.innerHTML
        expect(el).toContain('Login');
    });

    it('should be able to set root to LoginPage', () => {
        spyOn(nav, 'setRoot');
        component.setRootLoginPage();
        fixture.detectChanges();
        expect(nav.setRoot).toHaveBeenCalled();
    });

    it('should display terms-of-service component', () => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('terms-of-service'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

});
