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

import { AboutPage } from './about';

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
let emailComposer: EmailComposer;

const angularFireAuthStub = {
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

describe('AboutPage', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AboutPage],
            imports: [
                IonicModule.forRoot(AboutPage),
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
        fixture = TestBed.createComponent(AboutPage);
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
    });

    it('should be created', () => {
        expect(component instanceof AboutPage).toBe(true);
    });

    it('should have title called About', () => {
        expect(component.title).toBe('About');
    });

    it('should display headshot', () => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('img'));
        el = de.nativeElement.src;
        expect(el).toContain('assets/img/headshot.png');
    });

    it('should display about information', () => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('h5'));
        el = de.nativeElement.innerHTML;
        expect(el).toContain('iShallBe is your daily boost ');
    });

    it('should display learn more button', () => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('#LearnMoreButton'));
        el = de.nativeElement.innerHTML
        expect(el).toContain('Learn More');
        expect(component.openWebsite).toBeDefined();
    });

});