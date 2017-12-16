import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, Events, NavController, AlertController, LoadingController, NavParams } from 'ionic-angular';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../environments/environment';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';

import { RegisterFormComponent } from './register-form';

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

describe('RegisterFormComponent', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RegisterFormComponent],
            imports: [
                IonicModule.forRoot(RegisterFormComponent),
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
        fixture = TestBed.createComponent(RegisterFormComponent);
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
        expect(component instanceof RegisterFormComponent).toBe(true);
    });

    it('should be initialized', () => {
        expect(component.submitted).toBeFalsy();
        expect(component.loader).toBeUndefined();
        expect(component.form.name).toBeUndefined();
        expect(component.form.email).toBeUndefined();
        expect(component.form.password).toBeUndefined();
        expect(component.profile).toBeUndefined();
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

    it('should prepare request by building data and starting loader', () => {
        spyOn(component, 'buildData');
        spyOn(component, 'startLoader');
        let form = {
            "name": "testFormName",
            "email": "testFormEmail",
            "password": "testFormPassword"
        }
        component.prepareRequest(form);
        fixture.detectChanges();
        expect(component.buildData).toHaveBeenCalled();
        expect(component.startLoader).toHaveBeenCalled();
    });

    it('should request Firebase Provider to create account', () => {
        spyOn(firebase, 'createAccount').and.returnValue({ subscribe: () => { } });
        let form = {
            "name": "testFormName",
            "email": "testFormEmail",
            "password": "testFormPassword"
        }
        component.requestAccountCreation(form);
        fixture.detectChanges();
        expect(firebase.createAccount).toHaveBeenCalled();
    });

    it('should request Firebase Provider to create profile', () => {
        spyOn(firebase, 'setObject').and.returnValue({ subscribe: () => { } });
        component.profile = {
            email: "testEmail",
            uid: "testUID",
            blocked: false,
            name: "testName",
            role: "testRole",
            photo: "testPhoto"
        }
        component.requestProfileCreation()
        fixture.detectChanges();
        expect(firebase.setObject).toHaveBeenCalled();
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

});
