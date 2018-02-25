import { ComponentFixture, async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { IonicModule, Platform, NavController } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { environment } from '../../environments/environment';

import { SupportPage } from '../support/support';

import { } from 'jasmine';

import {
    PlatformMock,
    NavMock,
    EmailComposerMock,
    FirebaseProviderMock,
} from '../../../test-config/mocks-ionic';

describe('SupportPage', () => {
    let fixture;
    let component;
    let platform: Platform;
    let nav: NavController;
    let emailComposer: EmailComposer;
    let firebase: FirebaseProvider;
    let afa: AngularFireAuth;
    let afs: AngularFirestore;

    const angularFireAuthStub = {
    };

    const angularFireDataStub = {
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SupportPage],
            imports: [
                IonicModule.forRoot(SupportPage),
                AngularFireModule.initializeApp(environment.firebase)
            ],
            providers: [
                { provide: Platform, useClass: PlatformMock },
                { provide: NavController, useClass: NavMock },
                { provide: EmailComposer, useClass: EmailComposerMock },
                { provide: FirebaseProvider, useClass: FirebaseProviderMock },
                { provide: AngularFireAuth, useValue: angularFireAuthStub },
                { provide: AngularFirestore, useValue: angularFireDataStub },
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ]
        })
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SupportPage);
        component = fixture.componentInstance;
        platform = TestBed.get(Platform);
        nav = TestBed.get(NavController);
        emailComposer = TestBed.get(EmailComposer);
        firebase = TestBed.get(FirebaseProvider);
        afa = TestBed.get(AngularFireAuth);
        afs = TestBed.get(AngularFirestore);
    });

    afterEach(() => {
        fixture.destroy();
        component = null;
        platform = null;
        nav = null;
        emailComposer = null;
        firebase = null;
        afa = null;
        afs = null;
    });

    it('should be created', () => {
        expect(component instanceof SupportPage).toBe(true);
    });

    it('should be titled Contact Support', () => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('#SupportPageTitle'));
        el = de.nativeElement.innerHTML;
        expect(el).toContain('Contact Support');
    });

    it('should display HeaderComponent', () => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('header'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

    it('should display form', () => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('form'));
        el = de.nativeElement.innerHTML
        expect(el).toContain('SEND EMAIL');
    });

    it('should display direct email', () => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('#SupportPageDirectEmail'));
        el = de.nativeElement.innerHTML
        expect(el).toContain('info@ishallbe.co');
    });

});

