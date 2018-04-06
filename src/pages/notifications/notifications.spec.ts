import { ComponentFixture, async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { IonicModule, Platform, NavController, NavParams } from 'ionic-angular';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { environment } from '../../environments/environment';

import { NotificationsPage } from '../notifications/notifications';
import { ComponentsModule } from '../../components/components.module';

import { } from 'jasmine';

import {
    PlatformMock,
    NavMock,
    NavParamsMock,
    FirebaseProviderMock,
} from '../../../test-config/mocks-ionic';

describe('NotificationsPage', () => {
    let fixture;
    let component;
    let platform: Platform;
    let nav: NavController;
    let navParams: NavParams;
    let firebase: FirebaseProvider;
    let afa: AngularFireAuth;
    let afs: AngularFirestore;

    const angularFireAuthStub = {
    };

    const angularFireDataStub = {
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NotificationsPage],
            imports: [
                IonicModule.forRoot(NotificationsPage),
                AngularFireModule.initializeApp(environment.firebase),
                ComponentsModule
            ],
            providers: [
                { provide: Platform, useClass: PlatformMock },
                { provide: NavController, useClass: NavMock },
                { provide: NavParams, useClass: NavParamsMock },
                { provide: FirebaseProvider, useClass: FirebaseProviderMock },
                { provide: AngularFireAuth, useValue: angularFireAuthStub },
                { provide: AngularFirestore, useValue: angularFireDataStub },
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NotificationsPage);
        component = fixture.componentInstance;
        platform = TestBed.get(Platform);
        nav = TestBed.get(NavController);
        navParams = TestBed.get(NavParams);
        firebase = TestBed.get(FirebaseProvider);
        afa = TestBed.get(AngularFireAuth);
        afs = TestBed.get(AngularFirestore);
    });

    afterEach(() => {
        fixture.destroy();
        component = null;
        platform = null;
        nav = null;
        navParams = null;
        firebase = null;
        afa = null;
        afs = null;
    });

    it('should be created', () => {
        expect(component instanceof NotificationsPage).toBe(true);
    });

    it('should display new notifications', () => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('#NewNotifications'));
        el = de.nativeElement.innerHTML;
        expect(el).toContain('New Notifications');
    });

    it('should display earlier notifications', () => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('#EarlierNotifications'));
        el = de.nativeElement.innerHTML;
        expect(el).toContain('Earlier Notifications');
    });
});

