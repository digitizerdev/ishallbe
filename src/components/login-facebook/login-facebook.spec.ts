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

const angularFireAuthStub = {
};

const fakeObjectSet = (path: string): Function => {
    return;
};

let setSpy = jasmine.createSpy("set");

let objectSpy = jasmine.createSpy("object").and.returnValue({
    set: setSpy
});

const angularFireDataStub = {
    object: objectSpy
}

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
                { provide: AngularFireDatabase, useValue: angularFireDataStub },
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
        facebook = null;
    });

    it('should be created', () => {
        expect(component instanceof LoginFacebookComponent).toBe(true);
    });

    it('should be initialized', () => {
        expect(component.uid).toBeUndefined();
        expect(component.loader).toBeUndefined();
        expect(component.data).toBeUndefined();
    });

    it('should be triggered by Login with Facebook Button', async(() => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('#LoginWithFacebookButton'));
        el = de.nativeElement.innerHTML
        expect(el).toContain('Login with Facebook');
    }));

    it('should authenticate', () => {
        spyOn(component, 'startLoader');
        spyOn(component, 'viaCordova');
        component.authenticate();
        expect(component.startLoader).toHaveBeenCalled();
        expect(component.viaCordova).toHaveBeenCalled();
    })

    it('should authenticate via cordova if platform is not browser', () => {
        spyOn(component, 'cordova');
        component.viaCordova(true);
        fixture.detectChanges();
        expect(component.cordova).toHaveBeenCalled();
    });

    it('should authenticate via browser if browser', () => {
        spyOn(component, 'browser');
        component.viaCordova(false);
        fixture.detectChanges();
        expect(component.browser).toHaveBeenCalled();
    });

    it('should check for existing account afer authentication', () => {
        spyOn(component, 'requestProfile').and.returnValue({ subscribe: () => { } });
        component.uid = 'testUID';
        component.checkForExistingProfile();
        expect(component.requestProfile).toHaveBeenCalled();
    });

    it('should register user if profile does not exist', () => {
        spyOn(component, 'presentEULA').and.returnValue({ subscribe: () => { } });
        component.registerUser();
        expect(component.presentEULA).toHaveBeenCalled();
    });

    it('should request Firebase to create profile', fakeAsync(() => {
        tick();
        fixture.detectChanges();
        component.firebase.object('testPath').set('testProfile');        
        expect(objectSpy).toHaveBeenCalled();
        expect(setSpy).toHaveBeenCalled();
    }));

    it('should confirm delivery', () => { 
        spyOn(component, 'endLoader');
        spyOn(component, 'presentConfirmationAlert');
        spyOn(component, 'startSession');
        spyOn(component, 'setRootHomePage');
        component.confirmDelivery();
        expect(component.endLoader).toHaveBeenCalled();
        expect(component.presentConfirmationAlert).toHaveBeenCalled();
        expect(component.startSession).toHaveBeenCalled();
        expect(component.setRootHomePage).toHaveBeenCalled();
    })

});