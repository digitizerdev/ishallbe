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

import { ProfilePage } from '../profile/profile';
import { ComponentsModule } from '../../components/components.module';

import { } from 'jasmine';

import {
    PlatformMock,
    NavMock,
    MediaMock,
    FileTransferMock,
    FirebaseProviderMock,
} from '../../../test-config/mocks-ionic';

describe('ProfilePage', () => {
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
            declarations: [ProfilePage],
            imports: [
                IonicModule.forRoot(ProfilePage),
                AngularFireModule.initializeApp(environment.firebase),
                ComponentsModule,
            ],
            providers: [
                { provide: Platform, useClass: PlatformMock },
                { provide: NavController, useClass: NavMock },
                { provide: NavParams, useClass: NavMock },
                { provide: Media, useClass: MediaMock },
                { provide: FileTransfer, useClass: FileTransfer },
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
        fixture = TestBed.createComponent(ProfilePage);
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
        expect(component instanceof ProfilePage).toBe(true);
    });

    it('should dipsplay pushChatsPageIcon', () => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css
            ('#pushChatsPageIcon'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

    it('should display user profile if loaded', () => {
        component.loaded = true;
        fixture.detectChanges();
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css
            ('#UserProfile'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

    it('should display pushUpdateProfilePageButton if loaded and mine', () => {
        component.loaded = true;
        component.mine = true;
        fixture.detectChanges();
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css
            ("#pushProfileUpdatePageButton"));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

    it('should display blockUserButton if loaded, editor, not blocked, and not mine', () => {
        component.loaded = true;
        component.editor = true;
        component.blocked = false;
        component.mine = false;
        fixture.detectChanges();
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css
            ('#blockUserButton'));
        el = de.nativeElement.innerHTML;
        expect(el).toContain('BLOCK USER');
    });

    it('should display unblockUserButton if loaded, editor, blocked, and not mine', () => {
        component.loaded = true;
        component.editor = true;
        component.blocked = true;
        component.mine = false;
        fixture.detectChanges();
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css
            ('#unblockUserButton'));
        el = de.nativeElement.innerHTML;
        expect(el).toContain('UNBLOCK USER');
    });

    it('should display makeEditorButton if loaded, editor, not mine, not blocked, and not userEditor', () => {
        component.loaded = true;
        component.editor = true;
        component.mine = false;
        component.blocked = false;
        component.userEditor = false;
        fixture.detectChanges();
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css
            ('#makeEditorButton'));
        el = de.nativeElement.innerHTML;
        expect(el).toContain('MAKE EDITOR');
    });

    it('should display makeContributorButton if loaded, editor, not mine, not blocked, and userEditor', () => {
        component.loaded = true;
        component.editor = true;
        component.mine = false;
        component.blocked = false;
        component.userEditor = true;
        fixture.detectChanges();
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css
            ('#makeContributorButton'));
        el = de.nativeElement.innerHTML;
        expect(el).toContain('MAKE CONTRIBUTOR');
    });

    it('should display my statements', () => {
        component.postSegment = 'statements';
        fixture.detectChanges();
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css
            ('#MyStatements'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

    it('should display my goals', () => {
        component.postSegment = 'goals';
        fixture.detectChanges();
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css
            ('#MyGoals'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });
});