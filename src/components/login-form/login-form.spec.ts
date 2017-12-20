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
import { NativeProvider } from '../../providers/native/native';
import { DigitalProvider } from '../../providers/digital/digital';

import { } from 'jasmine';

import {
    FirebaseProviderMock,
    SessionProviderMock,
    NativeProviderMock,
    DigitalProviderMock,
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
let native: NativeProvider;
let nativeSpy;
let digital: DigitalProvider;
let digitalSpy;

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
                { provide: NativeProvider, useClass: NativeProviderMock },
                { provide: DigitalProvider, useClass: DigitalProviderMock },
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
        native = fixture.componentRef.injector.get(NativeProvider);
        digital = fixture.componentRef.injector.get(DigitalProvider);
    });

    afterEach(() => {
        fixture.destroy();
        component = null;
        session = null;
        sessionSpy = null;
        firebase = null;
        firebaseSpy = null;
        native = null;
        nativeSpy = null;
        digital = null;
        digitalSpy = null;
    });

    it('should be created', () => {
        expect(component instanceof LoginFormComponent).toBe(true);
    });

    it('should be initialized', () => {
        expect(component.submitted).toBeFalsy();
        expect(component.loader).toBeUndefined();
        expect(component.form.email).toBeUndefined();
        expect(component.form.password).toBeUndefined();
        expect(component.profile).toBeUndefined();
    });

    it('should submit via Login with Email Button', async(() => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('#LoginWithEmailButton'));
        el = de.nativeElement.innerHTML
        expect(el).toContain('Login with Email');
    }));

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

    it('should request Firebase Provider for profile object', () => {
        spyOn(firebase, 'object').and.returnValue({ subscribe: () => { } })
        component.requestProfile('testUid');
        fixture.detectChanges();
        expect(firebase.object).toHaveBeenCalled();
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
