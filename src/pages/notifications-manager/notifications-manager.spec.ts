import { ComponentFixture, async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { IonicModule, Platform, NavController, Events } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { DatePicker } from '@ionic-native/date-picker';
import { Media } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { environment } from '../../environments/environment';

import { NotificationsManagerPage } from '../notifications-manager/notifications-manager';

import { ComponentsModule } from '../../components/components.module';

import { } from 'jasmine';

import {
    PlatformMock,
    NavMock,
    EventsMock,
    CameraMock,
    DatePickerMock,
    MediaMock,
    FileMock,
    FileTransferMock,
    FirebaseProviderMock,
} from '../../../test-config/mocks-ionic';

describe('NotificationsManagerPage', () => {
    let fixture;
    let component;
    let platform: Platform;
    let nav: NavController;
    let events: Events;
    let camera: Camera;
    let datePicker: DatePicker;
    let file: File;
    let fileTransfer: FileTransfer;
    let media: Media;
    let firebase: FirebaseProvider;
    let afa: AngularFireAuth;
    let afs: AngularFirestore;

    const angularFireAuthStub = {
    };

    const angularFireDataStub = {
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NotificationsManagerPage],
            imports: [
                IonicModule.forRoot(NotificationsManagerPage),
                AngularFireModule.initializeApp(environment.firebase),
                ComponentsModule
            ],
            providers: [
                { provide: Platform, useClass: PlatformMock },
                { provide: NavController, useClass: NavMock },
                { provide: Events, useClass: EventsMock },
                { provide: Camera, useClass: CameraMock },
                { provide: DatePicker, useClass: DatePickerMock },
                { provide: File, useClass: FileMock },
                { provide: FileTransfer, useClass: FileTransferMock },
                { provide: Media, useClass: MediaMock },
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
        fixture = TestBed.createComponent(NotificationsManagerPage);
        component = fixture.componentInstance;
        platform = TestBed.get(Platform);
        nav = TestBed.get(NavController);
        events = TestBed.get(Events);
        camera = TestBed.get(Camera);
        datePicker = TestBed.get(DatePicker);
        file = TestBed.get(File);
        fileTransfer = TestBed.get(FileTransfer);
        media = TestBed.get(Media);
        firebase = TestBed.get(FirebaseProvider);
        afa = TestBed.get(AngularFireAuth);
        afs = TestBed.get(AngularFirestore);
    });

    afterEach(() => {
        fixture.destroy();
        component = null;
        platform = null;
        nav = null;
        events = null;
        camera = null;
        datePicker = null;
        file = null;
        fileTransfer = null;
        media = null;
        firebase = null;
        afa = null;
        afs = null;
    });

    fit('should be created', () => {
        expect(component instanceof NotificationsManagerPage).toBe(true);
    });

    it('should display BrandHeaderComponent', () => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('brand-header'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

    fit('should display CreateNotificationButton', () => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('#CreateNotificationButton'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

    fit('should show UpcomingNotifications', () => {
        component.upcomingNotifications = true;
        fixture.detectChanges();
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('#UpcomingNotifications'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });
});
