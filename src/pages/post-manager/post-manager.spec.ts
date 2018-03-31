import { ComponentFixture, async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { IonicModule, Platform, NavController } from 'ionic-angular';
import { NgCalendarModule } from 'ionic2-calendar';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { environment } from '../../environments/environment';

import { PostManagerPage } from '../post-manager/post-manager';
import { ComponentsModule } from '../../components/components.module';

import { mockStatements } from '../../../test-data/statements/mocks';
import { mockGoals } from '../../../test-data/goals/mocks';

import { } from 'jasmine';

import {
    PlatformMock,
    NavMock,
    FirebaseProviderMock,
} from '../../../test-config/mocks-ionic';

describe('PostManagerPage', () => {
    let fixture;
    let component;
    let platform: Platform;
    let nav: NavController;
    let firebase: FirebaseProvider;
    let afa: AngularFireAuth;
    let afs: AngularFirestore;

    const angularFireAuthStub = {
    };

    const angularFireDataStub = {
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PostManagerPage],
            imports: [
                IonicModule.forRoot(PostManagerPage),
                AngularFireModule.initializeApp(environment.firebase),
                ComponentsModule,
                NgCalendarModule
            ],
            providers: [
                { provide: Platform, useClass: PlatformMock },
                { provide: NavController, useClass: NavMock },
                { provide: FirebaseProvider, useClass: FirebaseProviderMock },
                { provide: AngularFireAuth, useValue: angularFireAuthStub },
                { provide: AngularFirestore, useValue: angularFireDataStub },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PostManagerPage);
        component = fixture.componentInstance;
        platform = TestBed.get(Platform);
        nav = TestBed.get(NavController);
        firebase = TestBed.get(FirebaseProvider);
        afa = TestBed.get(AngularFireAuth);
        afs = TestBed.get(AngularFirestore);
    });

    afterEach(() => {
        fixture.destroy();
        component = null;
        platform = null;
        nav = null;
        firebase = null;
        afa = null;
        afs = null;
    });

    fit('should be created', () => {
        expect(component instanceof PostManagerPage).toBe(true);
    });


    fit('should display PinsSegment if postType is pins', () => {
        component.postType = 'pins';
        fixture.detectChanges();
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('#PinsSegment'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

    fit('should display PinsCalendar if pins are loaded', () => {
        component.postType = 'pins';
        component.pinsLoaded = true;
        fixture.detectChanges();
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('#PinsCalendar'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

    fit('should display CreatePinButton if selectedDay does not already have a pin', () => {
        component.postType = 'pins';
        component.pinCreated = false;
        fixture.detectChanges();
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('#CreatePinButton'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

    fit('should display UpdatePinButton if selectedDay already has a pin', () => {
        component.postType = 'pins';
        component.pinCreated = true;
        fixture.detectChanges();
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('#UpdatePinButton'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

    fit('should display StatementsSegment if postType is statements', () => {
        component.postType = 'statements';
        fixture.detectChanges();
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('#StatementsSegment'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

    fit('should display no reported statements if there are no reported statements', () => {
        component.postType = 'statements';
        fixture.detectChanges();
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('#NoReportedStatements'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

    fit('should display reported statements if there are reported statements', () => {
        component.postType = 'statements';
        component.statementsReported = true;
        fixture.detectChanges();
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('#ReportedStatements'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

    fit('should display no reported goals if there are no reported goals', () => {
        component.postType = 'goals';
        fixture.detectChanges();
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('#NoReportedGoals'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

    fit('should display reported goals if there are reported goals', () => {
        component.postType = 'goals';
        component.goalsReported = true;
        fixture.detectChanges();
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('#ReportedGoals'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });
});

