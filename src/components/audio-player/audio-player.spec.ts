import { ComponentFixture, async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { IonicModule, Platform, Nav } from 'ionic-angular';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { Media, MediaObject } from '@ionic-native/media';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { environment } from '../../environments/environment';

import { AudioPlayerComponent } from '../audio-player/audio-player';

import { } from 'jasmine';

import {
    PlatformMock,
    NavMock,
    FileTransferMock,
    MediaMock,
    FirebaseProviderMock,
} from '../../../test-config/mocks-ionic';

describe('AudioPlayerComponent', () => {
    let fixture;
    let component;
    let platform: Platform;
    let nav: Nav;
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
            declarations: [AudioPlayerComponent],
            imports: [
                IonicModule.forRoot(AudioPlayerComponent),
                AngularFireModule.initializeApp(environment.firebase),
            ],
            providers: [
                { provide: Platform, useClass: PlatformMock },
                { provide: Nav, useClass: NavMock },
                { provide: FileTransfer, useClass: FileTransferMock },
                { provide: Media, useClass: MediaMock },
                { provide: FirebaseProvider, useClass: FirebaseProviderMock },
                { provide: AngularFireAuth, useValue: angularFireAuthStub },
                { provide: AngularFirestore, useValue: angularFireDataStub },
            ],
        })
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AudioPlayerComponent);
        component = fixture.componentInstance;
        platform = TestBed.get(Platform);
        nav = TestBed.get(Nav);
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
        media = null;
        fileTransfer = null;
        firebase = null;
        afa = null;
        afs = null;
    });

    it('should be created', () => {
        expect(component instanceof AudioPlayerComponent).toBe(true);
    });

    it('should display AudioPlayButton if not playing audio', () => {
        component.playingAudio = false;
        fixture.detectChanges();
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('#AudioPlayButton'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });
    
    it('should display AudioStopButton if playing audio', () => {
        
        component.playingAudio = true;
        fixture.detectChanges();
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('#AudioStopButton'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

});

