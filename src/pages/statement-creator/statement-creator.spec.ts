import { ComponentFixture, async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { IonicModule, Platform, NavController, NavParams, Events, ActionSheetController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Media } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { environment } from '../../environments/environment';

import { StatementCreatorPage } from '../statement-creator/statement-creator';

import { ComponentsModule } from '../../components/components.module';

import { } from 'jasmine';

import {
    PlatformMock,
    NavMock,
    NavParamsMock,
    EventsMock,
    MediaMock,
    ActionSheetControllerMock,
    CameraMock,
    FileMock,
    FileTransferMock,
    FirebaseProviderMock,
} from '../../../test-config/mocks-ionic';

describe('StatementCreatorPage', () => {
    let fixture;
    let component;
    let platform: Platform;
    let nav: NavController;
    let navParams: NavParams;
    let events: Events;
    let media: Media;
    let actionSheet: ActionSheetController;
    let camera: Camera;
    let file: File;
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
            declarations: [StatementCreatorPage],
            imports: [
                IonicModule.forRoot(StatementCreatorPage),
                AngularFireModule.initializeApp(environment.firebase),
                ComponentsModule
            ],
            providers: [
                { provide: Platform, useClass: PlatformMock },
                { provide: NavController, useClass: NavMock },
                { provide: NavParams, useClass: NavParamsMock },
                { provide: Events, useClass: EventsMock },
                { provide: Media, useClass: MediaMock },
                { provide: ActionSheetController, useClass: ActionSheetControllerMock },
                { provide: Camera, useClass: CameraMock },
                { provide: File, useClass: FileMock },
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
        fixture = TestBed.createComponent(StatementCreatorPage);
        component = fixture.componentInstance;
        platform = TestBed.get(Platform);
        nav = TestBed.get(NavController);
        navParams = TestBed.get(NavParams);
        events = TestBed.get(Events);
        media = TestBed.get(Media);
        actionSheet = TestBed.get(ActionSheetController);
        camera = TestBed.get(Camera);
        file = TestBed.get(File);
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
        events = null;
        media = null;
        actionSheet = null;
        camera = null;
        file = null;
        fileTransfer = null;
        firebase = null;
        afa = null;
        afs = null;
    });

    it('should be created', () => {
        expect(component instanceof StatementCreatorPage).toBe(true);
    });

    it('should be titled Statement', () => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('#StatementCreatorTitle'));
        el = de.nativeElement.innerHTML;
        expect(el).toContain('Statement')
    });

    it('should display SeeItButton if image not loaded and not loading image', () => {
        component.imageLoaded = false;
        component.loadingImage = false;
        fixture.detectChanges();
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('#SeeItButton'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

    it('should display upload component if loading image', () => {
        component.loadingImage = true;
        fixture.detectChanges();
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('upload'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

    it('should display StatementImage if image ready', () => {
        component.imageReady = true;
        fixture.detectChanges();
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('#StatementImage'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

    it('should display form', () => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('form'));
        el = de.nativeElement.innerHTML
        expect(el).toContain('CREATE STATEMENT');
    });
});

