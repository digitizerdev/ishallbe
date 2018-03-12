import { ComponentFixture, async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { IonicModule, Platform, NavController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { environment } from '../../environments/environment';

import { AboutPage } from '../about/about';

import { } from 'jasmine';

import {
    PlatformMock,
    NavMock,
    InAppBrowserMock,
    FirebaseProviderMock,
    EmailComposerMock,
} from '../../../test-config/mocks-ionic';

describe('AboutPage', () => {
    let fixture;
    let component;
    let platform: Platform;
    let nav: NavController;
    let inAppBrowser: InAppBrowser;
    let firebase: FirebaseProvider;
    let afa: AngularFireAuth;
    let afs: AngularFirestore;

    const angularFireAuthStub = {
    };

    const angularFireDataStub = {
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AboutPage],
            imports: [
                IonicModule.forRoot(AboutPage),
                AngularFireModule.initializeApp(environment.firebase)
            ],
            providers: [
                { provide: Platform, useClass: PlatformMock },
                { provide: NavController, useClass: NavMock },
                { provide: InAppBrowser, useClass: EmailComposerMock },
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
        fixture = TestBed.createComponent(AboutPage);
        component = fixture.componentInstance;
        platform = TestBed.get(Platform);
        nav = TestBed.get(NavController);
        inAppBrowser = TestBed.get(InAppBrowser);
        firebase = TestBed.get(FirebaseProvider);
        afa = TestBed.get(AngularFireAuth);
        afs = TestBed.get(AngularFirestore);
    });

    afterEach(() => {
        fixture.destroy();
        component = null;
        platform = null;
        nav = null;
        inAppBrowser = null;
        firebase = null;
        afa = null;
        afs = null;
    });

    it('should be created', () => {
        expect(component instanceof AboutPage).toBe(true);
    });

    it('should be titled About', () => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('#AboutPageTitle'));
        el = de.nativeElement.innerHTML;
        expect(el).toContain('About');
    });

    it('should display HeaderComponent', () => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('header'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

    it('should display tagline', () => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('#AboutPageTagline'));
        el = de.nativeElement.innerHTML
        expect(el).toContain('If You Speak It, It Shall Be!');
    });

    it('should display description', () => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('#AboutPageDescription'));
        el = de.nativeElement.innerHTML
        expect(el).toContain('iShallBe');
    });

    it('should display launchWebsiteLearnMoreButton', () => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('#launchWebsiteLearnMoreButton'));
        el = de.nativeElement.innerHTML;
        expect(el).toContain('LEARN MORE');
    });
});

