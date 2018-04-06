import { ComponentFixture, async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { IonicModule, Platform, NavController, NavParams } from 'ionic-angular';
import { Media } from '@ionic-native/media';
import { FileTransfer } from '@ionic-native/file-transfer';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { environment } from '../../environments/environment';

import { HomePage } from '../home/home';
import { ComponentsModule } from '../../components/components.module';

import { } from 'jasmine';

import {
    PlatformMock,
    NavMock,
    NavParamsMock,
    MediaMock,
    FileTransferMock,
    FirebaseProviderMock,
} from '../../../test-config/mocks-ionic';

describe('HomePage', () => {
    let fixture;
    let component;
    let platform: Platform;
    let nav: NavController;
    let navParams: NavParams;
    let media: Media;
    let fileTransfer: FileTransfer;
    let firebase: FirebaseProvider;
    let afa: AngularFireAuth;
    let afs: AngularFirestore;

    const angularFireAuthStub = {
    };

    const angularFireDataStub = {
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HomePage],
            imports: [
                IonicModule.forRoot(HomePage),
                AngularFireModule.initializeApp(environment.firebase),
                ComponentsModule
            ],
            providers: [
                { provide: Platform, useClass: PlatformMock },
                { provide: NavController, useClass: NavMock },
                { provide: NavParams, useClass: NavParamsMock },
                { provide: Media, useClass: MediaMock },
                { provide: FileTransfer, useClass: FileTransferMock },
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
        fixture = TestBed.createComponent(HomePage);
        component = fixture.componentInstance;
        platform = TestBed.get(Platform);
        nav = TestBed.get(NavController);
        navParams = TestBed.get(NavParams);
        media = TestBed.get(Media);
        fileTransfer = TestBed.get(FileTransfer);
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
        media = null;
        fileTransfer = null;
        firebase = null;
        afa = null;
        afs = null;
    });

    it('should be created', () => {
        expect(component instanceof HomePage).toBe(true);
    });

    it('should display ToolbarLogoComponent', () => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('toolbar-logo'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

    it('should display pushNotificationsPageIcon', () => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('#pushNotificationsPageIcon'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

    it('should display pins slider', () => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('#PinsSlider'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

    it('should display statements scroller if selected', () => {
        component.postSegment = 'statements';
        fixture.detectChanges();
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('#StatementsScroller'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

    it('should display goals scroller if selected', () => {
        component.postSegment = 'goals';
        fixture.detectChanges();
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('#GoalsScroller'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

    it('should display FooterComponent', () => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('footer'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });
});

