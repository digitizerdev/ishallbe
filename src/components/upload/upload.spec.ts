import { ComponentFixture, async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { IonicModule, Platform, NavController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { environment } from '../../environments/environment';

import { UploadComponent } from '../upload/upload';

import { } from 'jasmine';

import {
    PlatformMock,
    NavMock,
    CameraMock,
    FileMock,
    FirebaseProviderMock,
} from '../../../test-config/mocks-ionic';

describe('UploadComponent', () => {
    let fixture;
    let component;
    let platform: Platform;
    let nav: NavController;
    let camera: Camera;
    let file: File;
    let firebase: FirebaseProvider;
    let afa: AngularFireAuth;
    let afs: AngularFirestore;

    const angularFireAuthStub = {
    };

    const angularFireDataStub = {
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UploadComponent],
            imports: [
                IonicModule.forRoot(UploadComponent),
                AngularFireModule.initializeApp(environment.firebase)
            ],
            providers: [
                { provide: Platform, useClass: PlatformMock },
                { provide: NavController, useClass: NavMock },
                { provide: Camera, useClass: CameraMock },
                { provide: File, useClass: FileMock },
                { provide: FirebaseProvider, useClass: FirebaseProviderMock },
                { provide: AngularFireAuth, useValue: angularFireAuthStub },
                { provide: AngularFirestore, useValue: angularFireDataStub },
            ],
        })
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UploadComponent);
        component = fixture.componentInstance;
        platform = TestBed.get(Platform);
        nav = TestBed.get(NavController);
        camera = TestBed.get(Camera);
        file = TestBed.get(File);
        firebase = TestBed.get(FirebaseProvider);
        afa = TestBed.get(AngularFireAuth);
        afs = TestBed.get(AngularFirestore);
    });

    afterEach(() => {
        fixture.destroy();
        component = null;
        platform = null;
        nav = null;
        camera = null;
        file = null;
        firebase = null;
        afa = null;
        afs = null;
    });

    it('should be created', () => {
        expect(component instanceof UploadComponent).toBe(true);
    });

    it('should set source type after view initializes', () => {
        spyOn(component, 'setSourceType');
        component.ngAfterViewInit()
        expect(component.setSourceType).toHaveBeenCalled();
    });

    it('should be able to upload content', () => {
        expect(component.upload).toBeDefined();
        expect(component.store).toBeDefined();
    });
});

