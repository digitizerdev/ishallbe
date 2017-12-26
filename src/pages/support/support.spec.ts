import { ComponentFixture, async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { IonicModule, Events, NavController, NavParams } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
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

import { SupportPage } from './support';

import { FirebaseProvider } from '../../providers/firebase/firebase';

import { } from 'jasmine';

import {
    FirebaseProviderMock,
    NavMock,
    StorageMock,
    AngularFireDatabaseMock,
    AngularFireAuthMock,
    EmailComposerMock
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
let emailComposer: EmailComposer;

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

describe('SupportPage', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SupportPage],
            imports: [
                IonicModule.forRoot(SupportPage),
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
                { provide: EmailComposer, useClass: EmailComposerMock }
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SupportPage);
        component = fixture.componentInstance;
        nav = fixture.componentRef.injector.get(NavController);
        storage = fixture.componentRef.injector.get(Storage);
        afAuth = TestBed.get(AngularFireAuth);
        afData = TestBed.get(AngularFireDatabase);
        emailComposer = TestBed.get(EmailComposer);
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
        expect(component instanceof SupportPage).toBe(true);
    });

    it('should be initialized', () => {
        expect(component.supportForm).toBeDefined();
        expect(component.submitted).toBeDefined();
        expect(component.loader).toBeUndefined();
        expect(component.title).toBe('Support');
    });

    it('should display support form', () => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('form'));
        el = de.nativeElement.innerHTML;
        expect(el).toContain('Contact Support');
        expect(el).toContain('subject');
        expect(el).toContain('body');
    });

    it('should request Email Composer to compose email', () => {
        spyOn(emailComposer, 'open').and.returnValue({ subscribe: {} });
        let supportForm = {
            subject: "testSubject",
            body: "testBody"
        }
        component.composeSupportEmail(supportForm);
        fixture.detectChanges();
        expect(emailComposer.open).toHaveBeenCalled();;
    });

    it('should confirm delivery', () => {
        spyOn(component, 'endLoader');
        spyOn(component, 'setRootAccountPage');
        component.confirmDelivery();
        fixture.detectChanges();
        expect(component.endLoader).toHaveBeenCalled();
        expect(component.setRootAccountPage).toHaveBeenCalled();
    });

});