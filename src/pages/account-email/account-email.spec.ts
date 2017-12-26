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

import { AccountEmailPage } from './account-email';

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
let afData: AngularFireDatabase;
let afAuth: AngularFireAuth;
let isAuth$: Subscription;
let isAuthRef: boolean;

const fakeAuthState = new BehaviorSubject(null);

const fakeUpdateEmail = (email): Promise<any> => {
    fakeAuthState.next(email);
    return Promise.resolve(email);
};

const angularFireAuthStub = {
    authState: fakeAuthState,
    auth: {
        currentUser: {
            updateEmail: jasmine
                .createSpy('updateEmail')
                .and
                .callFake(fakeUpdateEmail)
        }
    },
};

const fakeObjectUpdate = (path: string): Function => {
    return;
};

let updateSpy = jasmine.createSpy("update");

let objectSpy = jasmine.createSpy("object").and.returnValue({
    update: updateSpy
});

const angularFireDataStub = {
    object: objectSpy
}

describe('AccountEmailPage', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AccountEmailPage],
            imports: [
                IonicModule.forRoot(AccountEmailPage),
                AngularFireModule.initializeApp(environment.firebase)
            ],
            providers: [
                { provide: FirebaseProvider, useClass: FirebaseProviderMock },
                { provide: Storage, useClass: StorageMock },
                { provide: NavController, useClass: NavMock },
                { provide: NavParams, useClass: NavMock },
                { provide: FirebaseProvider, useClass: FirebaseProviderMock },
                { provide: AngularFireDatabase, useValue: angularFireDataStub },
                { provide: AngularFireAuth, useValue: angularFireAuthStub },
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AccountEmailPage);
        component = fixture.componentInstance;
        nav = fixture.componentRef.injector.get(NavController);
        storage = fixture.componentRef.injector.get(Storage);
        afAuth = TestBed.get(AngularFireAuth);
        afData = TestBed.get(AngularFireDatabase);
    });

    afterEach(() => {
        fixture.destroy();
        component = null;
        nav = null;
        storage = null;
        firebase = null;
        afData = null;
        afAuth = null;
        updateSpy.calls.reset();
        objectSpy.calls.reset();
        fakeAuthState.next(null);
    });

    it('should be created', () => {
        expect(component instanceof AccountEmailPage).toBe(true);
    });

    it('should be initialized', () => {
        expect(component.updateEmailForm).toBeDefined();
        expect(component.submitted).toBeDefined();
        expect(component.loader).toBeUndefined();
        expect(component.uid).toBeUndefined();
        expect(component.title).toBe('Update Email');
    });

    it('should display update email form', () => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('form'));
        el = de.nativeElement.innerHTML;
        expect(el).toContain('Update Email');
        expect(el).toContain('email');
    });

    it('should load account', fakeAsync(() => {
        spyOn(component, 'requestUID').and.callThrough();
        spyOn(component, 'requestProfile').and.returnValue({ subscribe: () => {}});
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

    it('should submit form', () => {
        component.submit('testEmail');
        expect(component.submitted).toBeTruthy();
    });;

    it('should request Firebase to update email', () => {
        component.firebase.account().updateEmail('testEmail');
        fixture.detectChanges();
        expect(afAuth.auth.currentUser.updateEmail)
            .toHaveBeenCalledWith('testEmail');
    });

    it('should request Firebase to update profile with new email', fakeAsync(() => {
        let path = 'testPath';
        let profile = 'testProfile';
        tick();
        fixture.detectChanges();
        component.firebase.object(path).update(profile);
        expect(objectSpy).toHaveBeenCalled();
        expect(updateSpy).toHaveBeenCalled();
    }));

    it('should confirm delivery by displaying alert', () => {
        spyOn(component, 'endLoader');
        spyOn(component, 'presentConfirmationAlert');
        spyOn(component, 'popToAccountPage');
        component.confirmDelivery();
        fixture.detectChanges();
        expect(component.endLoader).toHaveBeenCalled();
        expect(component.presentConfirmationAlert).toHaveBeenCalled();
        expect(component.popToAccountPage).toHaveBeenCalled();
    });

});