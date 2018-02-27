import { ComponentFixture, async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { IonicModule, Platform, NavController } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { environment } from '../../environments/environment';

import { GoalCreatorPage } from '../goal-creator/goal-creator';

import { } from 'jasmine';

import {
    PlatformMock,
    NavMock,
    DatePickerMock,
    FirebaseProviderMock,
} from '../../../test-config/mocks-ionic';

describe('GoalCreatorPage', () => {
    let fixture;
    let component;
    let platform: Platform;
    let nav: NavController;
    let datePicker: DatePicker;
    let firebase: FirebaseProvider;
    let afa: AngularFireAuth;
    let afs: AngularFirestore;

    const angularFireAuthStub = {
    };

    const angularFireDataStub = {
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GoalCreatorPage],
            imports: [
                IonicModule.forRoot(GoalCreatorPage),
                AngularFireModule.initializeApp(environment.firebase)
            ],
            providers: [
                { provide: Platform, useClass: PlatformMock },
                { provide: NavController, useClass: NavMock },
                { provide: DatePicker, useClass: DatePickerMock },
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
        fixture = TestBed.createComponent(GoalCreatorPage);
        component = fixture.componentInstance;
        platform = TestBed.get(Platform);
        nav = TestBed.get(NavController);
        datePicker = TestBed.get(DatePicker);
        firebase = TestBed.get(FirebaseProvider);
        afa = TestBed.get(AngularFireAuth);
        afs = TestBed.get(AngularFirestore);
    });

    afterEach(() => {
        fixture.destroy();
        component = null;
        platform = null;
        nav = null;
        datePicker = null;
        firebase = null;
        afa = null;
        afs = null;
    });

    it('should be created', () => {
        expect(component instanceof GoalCreatorPage).toBe(true);
    });

    it('should be titled Create Goal', () => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('#GoalCreatorTitle'));
        el = de.nativeElement.innerHTML;
        expect(el).toContain('Create Goal')
    });

    it('should display form', () => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('form'));
        el = de.nativeElement.innerHTML
        expect(el).toContain('SUBMIT');
    });

});

