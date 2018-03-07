import { ComponentFixture, async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { IonicModule, Platform, Nav } from 'ionic-angular';
import { Media } from '@ionic-native/media';
import { FileTransfer } from '@ionic-native/file-transfer';import { FirebaseProvider } from '../../providers/firebase/firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { environment } from '../../environments/environment';

import { GoalsComponent } from '../goals/goals';

import { } from 'jasmine';

import {
    PlatformMock,
    NavMock,
    MediaMock,
    FileTransferMock,
    FirebaseProviderMock,
} from '../../../test-config/mocks-ionic';

describe('GoalsComponent', () => {
    let fixture;
    let component;
    let platform: Platform;
    let nav: Nav;
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
            declarations: [GoalsComponent],
            imports: [
                IonicModule.forRoot(GoalsComponent),
                AngularFireModule.initializeApp(environment.firebase),
            ],
            providers: [
                { provide: Platform, useClass: PlatformMock },
                { provide: Nav, useClass: NavMock },
                { provide: Media, useClass: MediaMock },
                { provide: FileTransfer, useClass: FileTransferMock },
                { provide: FirebaseProvider, useClass: FirebaseProviderMock },
                { provide: AngularFireAuth, useValue: angularFireAuthStub },
                { provide: AngularFirestore, useValue: angularFireDataStub },
            ],
        })
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GoalsComponent);
        component = fixture.componentInstance;
        platform = TestBed.get(Platform);
        nav = TestBed.get(Nav);
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
        media = null;
        fileTransfer = null;
        firebase = null;
        afa = null;
        afs = null;
    });

    it('should be created', () => {
        expect(component instanceof GoalsComponent).toBe(true);
    });

});

