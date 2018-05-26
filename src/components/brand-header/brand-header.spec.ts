import { ComponentFixture, async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { IonicModule, Platform, Nav, NavController } from 'ionic-angular';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { environment } from '../../environments/environment';

import { BrandHeaderComponent } from '../brand-header/brand-header';
import { ToolbarLogoComponent } from '../toolbar-logo/toolbar-logo';

import { } from 'jasmine';

import {
    PlatformMock,
    NavMock,
    FirebaseProviderMock,
} from '../../../test-config/mocks-ionic';

describe('BrandHeaderComponent', () => {
    let fixture;
    let component;
    let platform: Platform;
    let nav: Nav;
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
            declarations: [BrandHeaderComponent],
            imports: [
                IonicModule.forRoot(BrandHeaderComponent),
                AngularFireModule.initializeApp(environment.firebase),
            ],
            providers: [
                { provide: Platform, useClass: PlatformMock },
                { provide: Nav, useClass: NavMock },
                { provide: NavController, useClass: NavMock },
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
        fixture = TestBed.createComponent(BrandHeaderComponent);
        component = fixture.componentInstance;
        platform = TestBed.get(Platform);
        nav = TestBed.get(Nav);
        navCtrl = TestBed.get(NavController);
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
        firebase = null;
        afa = null;
        afs = null;
    });

    fit('should be created', () => {
        expect(component instanceof BrandHeaderComponent).toBe(true);
    });

    fit('should display EnableMenuIcon', () => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('#EnableMenuIcon'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

    fit('should display toolbar-logo', () => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('toolbar-logo'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

    fit('should display setRootHomePageIcon', () => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('#setRootHomePageIcon'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });
});

