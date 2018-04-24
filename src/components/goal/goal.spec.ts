import { ComponentFixture, async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { IonicModule, Platform, Nav, NavController } from 'ionic-angular';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { environment } from '../../environments/environment';

import { GoalComponent } from '../goal/goal';

import { mockGoals } from '../../../test-data/goals/mocks';

import { } from 'jasmine';

import {
    PlatformMock,
    NavMock,
    FirebaseProviderMock,
} from '../../../test-config/mocks-ionic';
import { FileTransferObject } from '@ionic-native/file-transfer';

describe('GoalComponent', () => {
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
            declarations: [GoalComponent],
            imports: [
                IonicModule.forRoot(GoalComponent),
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
        fixture = TestBed.createComponent(GoalComponent);
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

    it('should be created', () => {
        expect(component instanceof GoalComponent).toBe(true);
    });

    it('should display PostHeaderComponent', () => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('post-header'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

    it('should display due date', () => {
        component.goal = mockGoals[0];
        fixture.detectChanges();
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('#GoalDueDate'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

    it('should display AudioPlayerComponent if goal url', () => {
        component.goal = mockGoals[0];
        fixture.detectChanges();
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('audio-player'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

    it('should display goal description', () => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('#GoalDescription'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

    it('should display PostFooterComponent', () => {
        component.goal = mockGoals[0];
        fixture.detectChanges();
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('post-footer'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });
});
