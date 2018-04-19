import { ComponentFixture, async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { IonicModule, Platform, Nav, NavController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { environment } from '../../environments/environment';

import { PinComponent } from '../pin/pin';

import { mockPins } from '../../../test-data/pins/mocks';

import { } from 'jasmine';

import {
    PlatformMock,
    NavMock,
    InAppBrowserMock,
    FirebaseProviderMock,
} from '../../../test-config/mocks-ionic';

describe('PinComponent', () => {
    let fixture;
    let component;
    let platform: Platform;
    let nav: Nav;
    let inAppBrowser: InAppBrowser;
    let navCtrl: NavController;
    let firebase: FirebaseProvider;
    let afa: AngularFireAuth;
    let afs: AngularFirestore;

    const angularFireAuthStub = {
    };

    const angularFireDataStub = {
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PinComponent],
            imports: [
                IonicModule.forRoot(PinComponent),
                AngularFireModule.initializeApp(environment.firebase),
            ],
            providers: [
                { provide: Platform, useClass: PlatformMock },
                { provide: Nav, useClass: NavMock },
                { provide: NavController, useClass: NavMock },
                { provide: InAppBrowser, useClass: InAppBrowserMock },
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
        fixture = TestBed.createComponent(PinComponent);
        component = fixture.componentInstance;
        platform = TestBed.get(Platform);
        nav = TestBed.get(Nav);
        navCtrl = TestBed.get(NavController);
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
        navCtrl = null;
        inAppBrowser = null;
        firebase = null;
        afa = null;
        afs = null;
    });

    fit('should be created', () => {
        expect(component instanceof PinComponent).toBe(true);
    });

    fit('should display title', () => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('#PinTitle'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

    fit('should display description', () => {
        component.pin = mockPins[3];
        fixture.detectChanges();
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('#PinDescription'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

    fit('should display WatchVideoButton if pin is Monday', () => {
        component.pin = mockPins[0];
        fixture.detectChanges();
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('#WatchVideoButton'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

    fit('should display OpenTuneButton if pin is Tuesday', () => {
        component.pin = mockPins[1];
        fixture.detectChanges();
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('#OpenTuneButton'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

    fit('should display post-footer', () => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('post-footer'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });
});

