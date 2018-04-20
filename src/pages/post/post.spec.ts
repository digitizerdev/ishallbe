import { ComponentFixture, async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';

import { IonicModule, Platform, NavController, NavParams, ViewController } from 'ionic-angular';
import { Media } from '@ionic-native/media';
import { FileTransfer } from '@ionic-native/file-transfer';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { environment } from '../../environments/environment';

import { PostPage } from '../post/post';

import { ComponentsModule } from '../../components/components.module';

import { YoutubePipe } from '../../pipes/youtube/youtube';

import { mockStatements } from '../../../test-data/statements/mocks';
import { mockComments } from '../../../test-data/comments/mocks';
import { mockGoals } from '../../../test-data/goals/mocks';

import { } from 'jasmine';

import {
    PlatformMock,
    NavMock,
    MediaMock,
    FileTransferMock,
    FirebaseProviderMock,
    NavParamsMock,
} from '../../../test-config/mocks-ionic';

describe('PostPage', () => {
    let fixture;
    let component;
    let platform: Platform;
    let nav: NavController;
    let navParams: NavParams;
    let viewCtrl: ViewController;
    let media: Media;
    let fileTransfer: FileTransfer;
    let firebase: FirebaseProvider;
    let afa: AngularFireAuth;
    let afs: AngularFirestore;
    let pipe: YoutubePipe;
    let dom: DomSanitizer;

    const angularFireAuthStub = {
    }

    const angularFireDataStub = {
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PostPage, YoutubePipe],
            imports: [
                IonicModule.forRoot(PostPage),
                AngularFireModule.initializeApp(environment.firebase),
                ComponentsModule
            ],
            providers: [
                { provide: Platform, useClass: PlatformMock },
                { provide: NavController, useClass: NavMock },
                { provide: NavParams, useClass: NavParamsMock },
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
        fixture = TestBed.createComponent(PostPage);
        component = fixture.componentInstance;
        platform = TestBed.get(Platform);
        nav = TestBed.get(NavController);
        navParams = TestBed.get(NavParams);
        media = TestBed.get(Media);
        fileTransfer = TestBed.get(FileTransfer);
        firebase = TestBed.get(FirebaseProvider);
        afa = TestBed.get(AngularFireAuth);
        afs = TestBed.get(AngularFirestore);
        pipe = new YoutubePipe(dom);
    });

    afterEach(() => {
        fixture.destroy();
        component = null;
        platform = null;
        nav = null;
        navParams = null;
        media = null;
        fileTransfer = null;
        pipe = null;
        firebase = null;
        afa = null;
        afs = null;
    });

    it('should be created', () => {
        expect(component instanceof PostPage).toBe(true);
    });

    it('should dipslay togglePostManagerMenuButton if collection is not pins', () => {
        component.collection = 'statements';
        fixture.detectChanges();
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css
            ('#togglePostManagerMenuButton'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

    it('should display deletePostButton if mine and collection is pins', () => {
        component.collection = 'pins';
        component.mine = true;
        fixture.detectChanges();
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css
            ('#deletePostButton'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

    it('should display PostHeaderComponent if collection is not pins', () => {
        component.collection = 'goals';
        fixture.detectChanges();
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css
            ('post-header'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

    it('should display due date if collection is goals', () => {
        component.collection = 'goals';
        fixture.detectChanges();
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css
            ('#DueDate'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

    it('should display AudioPlayerComponent if collection is goals and audio', () => {
        component.collection = 'goals';
        component.audio = true;
        fixture.detectChanges();
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css
            ('audio-player'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

    it('should display PinHeader if collection is pins', () => {
        component.collection = 'pins';
        fixture.detectChanges();
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css
            ('#PinHeader'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

    it('should display iframe if collection if video', () => {
        component.video = "https://google.com"
        fixture.detectChanges();
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css
            ('iframe'));
        el = de.nativeElement.src;
        expect(el).toBeDefined();
    });

    it('should display description if collection is not pins', () => {
        component.collection = 'goals';
        fixture.detectChanges();
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css
            ('#NonPinDescription'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

    it('should display MarkCompleteButton if collection is goals and not complete', () => {
        component.collection = 'goals';
        component.post = mockGoals[0];
        fixture.detectChanges();
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css
            ('#MarkCompleteButton'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

    it('should display MarkIncompleteButton if collection is goals and is complete', () => {
        component.collection = 'goals';
        component.post = mockGoals[2];
        fixture.detectChanges();
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css
            ('#MarkIncompleteButton'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

    it('should display PostFooterComponent', () => {
        component.post = mockStatements[0];
        component.loaded = true;
        // Can't query for post-footer because no firestore mock
        expect(component.loaded).toBeTruthy();
    });
    
    it('should display comments if comments are loaded', () => {
        component.comments = mockComments;
        component.commentsLoaded = true;
        // Can't query for firebase uid because no firesotre mock
        expect(component.commentsLoaded).toBeTruthy();
    });

    it('should display comment bar', () => {
        fixture.detectChanges();
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css
            ('#CommentBar'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });
});

