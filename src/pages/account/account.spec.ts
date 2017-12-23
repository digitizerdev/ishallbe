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

import { AccountPage } from './account';

import { FirebaseProvider } from '../../providers/firebase/firebase';

import { } from 'jasmine';

const fakeAuthState = new BehaviorSubject(null);

const fakeSignOutHandler = (): Promise<any> => {
  fakeAuthState.next(null);
  return Promise.resolve();
};

const angularFireAuthStub = {
    authState: fakeAuthState,
    auth: {
      signOut: jasmine
        .createSpy('signOut')
        .and
        .callFake(fakeSignOutHandler),
    },
  }

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

describe('AccountPage', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AccountPage],
            imports: [
                IonicModule.forRoot(AccountPage),
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
        fixture = TestBed.createComponent(AccountPage);
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
    });

    it('should be created', () => {
        expect(component instanceof AccountPage).toBe(true);
    });

    it('should be initialized', () => {
        expect(component.uid).toBeUndefined();
        expect(component.name).toBeUndefined();
        expect(component.email).toBeUndefined();
        expect(component.title).toBe('Account');
    });

    it('should display header component', () => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('header'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

    it('should load account', fakeAsync(() => {
        spyOn(component, 'requestUID').and.callThrough();
        spyOn(component, 'requestProfile').and.callThrough();
        spyOn(storage, 'ready').and.callThrough();
        spyOn(storage, 'get').and.callThrough();
        component.loadAccount();
        tick();
        fixture.detectChanges();
        expect(storage.ready).toHaveBeenCalled();
        expect(storage.get).toHaveBeenCalled();
        expect(component.requestUID).toHaveBeenCalled();
        expect(component.requestProfile).toHaveBeenCalled();
    }));

    it('should display view profile button', async(() => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('#AccountViewProfileButton'));
        el = de.nativeElement.innerHTML
        expect(el).toContain('View Profile');
    }));

    it('should display update password button', async(() => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('#AccountUpdatePasswordButton'));
        el = de.nativeElement.innerHTML
        expect(el).toContain('Update Password');
    }));

    it('should display update email button', async(() => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('#AccountUpdateEmailButton'));
        el = de.nativeElement.innerHTML
        expect(el).toContain('Update Email');
    }));

    it('should display logout button', async(() => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('#AccountLogoutButton'));
        el = de.nativeElement.innerHTML
        expect(el).toContain('Logout');
    }));

    it('should request Firebase to log out', () => {
        component.firebase.logOut()
        expect(afAuth.auth.signOut)
            .toHaveBeenCalled();
    });

    it('should display terms of service component', () => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('terms-of-service'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

});