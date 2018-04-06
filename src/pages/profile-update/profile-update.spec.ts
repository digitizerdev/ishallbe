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

import { ProfileUpdatePage } from '../profile-update/profile-update';

import { mockUsers } from '../../../test-data/users/mocks';

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
import { Action } from 'rxjs/scheduler/Action';

describe('ProfileUpdatePage', () => {
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
            declarations: [ProfileUpdatePage],
            imports: [
                IonicModule.forRoot(ProfileUpdatePage),
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
        fixture = TestBed.createComponent(ProfileUpdatePage);
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
        expect(component instanceof ProfileUpdatePage).toBe(true);
    });

    it('should display profile photo if not updating profile photo', () => {
        component.updatingProfilePhoto = false;
        component.user = mockUsers[0];
        component.loaded = true;
        fixture.detectChanges();
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('img'));
        el = de.nativeElement.src;
        expect(el).toBeDefined();
    });

    it('should display upload component if updating profile photo', () => {
        component.updatingProfilePhoto = true;
        fixture.detectChanges();
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('upload'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

    it('should display form if not updating profile photo', () => {
        component.updatingProfilePhoto = false;
        fixture.detectChanges();
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('form'));
        el = de.nativeElement.innerHTML
        expect(el).toContain('UPDATE PROFILE');
    });

    it('should display UpdateProfileButton if not updating profile photo', () => {
        component.updatingProfilePhoto = false;
        fixture.detectChanges();
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('#UpdateProfileButton'));
        el = de.nativeElement.innerHTML
        expect(el).toContain('UPDATE PROFILE');
    });
});

