import { ComponentFixture, async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { IonicModule, Events, NavController, NavParams } from 'ionic-angular';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../environments/environment';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

import { HeaderComponent } from '../../components/header/header';
import { LoginFacebookComponent } from '../../components/login-facebook/login-facebook';
import { TermsOfServiceComponent } from '../../components/terms-of-service/terms-of-service';

import { HomePage } from './home';

import { FirebaseProvider } from '../../providers/firebase/firebase';

import { mockPost } from '../../../test-data/post/mocks';

import { } from 'jasmine';

import {
    FirebaseProviderMock,
    NavMock,
    StorageMock,
    AngularFireDatabaseMock,
    AngularFireAuthMock
} from '../../../test-config/mocks-ionic';

let fixture;
let component;
let nav: NavController;
let firebase: FirebaseProvider;
let storage: Storage;
let afAuth: AngularFireAuth;
let isAuth$: Subscription;
let isAuthRef: boolean;

const credentialsMock = {
    email: 'abc@123.com',
    password: 'password'
};

const userMock = {
    uid: 'ABC123',
    email: credentialsMock.email,
};

const fakeAuthState = new BehaviorSubject(null);

const fakeSignInHandler = (email, password): Promise<any> => {
    fakeAuthState.next(userMock);
    return Promise.resolve(userMock);
};

const fakeSignOutHandler = (): Promise<any> => {
    fakeAuthState.next(null);
    return Promise.resolve();
};

const angularFireAuthStub = {
    authState: fakeAuthState,
    auth: {
        signInWithEmailAndPassword: jasmine
            .createSpy('signInWithEmailAndPassword')
            .and
            .callFake(fakeSignInHandler)
    },
};

let updateSpy = jasmine.createSpy("update");

let removeSpy = jasmine.createSpy("remove");

let objectSpy = jasmine.createSpy("object").and.returnValue({
    update: updateSpy,
    remove: removeSpy
});

let pushSpy = jasmine.createSpy("push");

let takeSpy = jasmine.createSpy("take");

let querySpy = jasmine.createSpy("query").and.returnValue({
    take: takeSpy
});

let listSpy = jasmine.createSpy("list").and.returnValue({
    push: pushSpy,
    take: takeSpy,
    query: querySpy
});

const angularFireDataStub = {
    object: objectSpy,
    list: listSpy,
}

describe('HomePage', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HomePage],
            imports: [
                IonicModule.forRoot(HomePage),
                AngularFireModule.initializeApp(environment.firebase)
            ],
            providers: [
                { provide: FirebaseProvider, useClass: FirebaseProviderMock },
                { provide: Storage, useClass: StorageMock },
                { provide: NavController, useClass: NavMock },
                { provide: NavParams, useClass: NavMock },
                { provide: AngularFireDatabase, useValue: angularFireDataStub },
                { provide: AngularFireAuth, useValue: angularFireAuthStub },
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomePage);
        component = fixture.componentInstance;
        nav = fixture.componentRef.injector.get(NavController);
        storage = fixture.componentRef.injector.get(Storage);
        firebase = fixture.componentRef.injector.get(FirebaseProvider);
        afAuth = TestBed.get(AngularFireAuth);
    });

    afterEach(() => {
        fixture.destroy();
        component = null;
        nav = null;
        storage = null;
        firebase = null;
        afAuth = null;
        fakeAuthState.next(null);
    });

    it('should be created', () => {
        expect(component instanceof HomePage).toBe(true);
    });

    it('should display header component', () => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('header'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

    it('should request uid from Storage before loading home when view entered', fakeAsync(() => {
        spyOn(component, 'requestUID').and.callThrough();
        spyOn(storage, 'ready').and.callThrough();
        spyOn(storage, 'get').and.callThrough();
        spyOn(component, 'loadHome');
        component.ionViewDidEnter();
        tick();
        fixture.detectChanges();
        expect(component.requestUID).toHaveBeenCalled();        
        expect(storage.ready).toHaveBeenCalled();
        expect(storage.get).toHaveBeenCalled();
        expect(component.loadHome).toHaveBeenCalled();
    }));

    it('should load home', () => {
        spyOn(component, 'timestampFeed').and.returnValue({ subscribe: () => {}});
        spyOn(component, 'checkIfProfileBlocked');
        spyOn(component, 'startLoader');
        component.loadHome();
        expect(component.timestampFeed).toHaveBeenCalled();
        expect(component.checkIfProfileBlocked).toHaveBeenCalled();
        expect(component.startLoader).toHaveBeenCalled();
    });

    it('should prepare pins request when loading pins', () => {
        spyOn(component, 'preparePinsRequest').and.returnValue({ subscribe: () => {}});
        component.loadPins();
        expect(component.preparePinsRequest).toHaveBeenCalled();
    })

    it('should request Firebase to load pins', () => {
        spyOn(firebase, 'limitedList').and.returnValue({ subscribe: () => { } });
        component.requestPins();
        expect(firebase.limitedList).toHaveBeenCalled();
    });

    it('should request Firebase Provider to check if user already liked pin', () => {
        spyOn(firebase, 'queriedList').and.returnValue({ subscribe: () => { } });
        component.uid = 'testUID'
        component.requestPinUserLikerObject(mockPost.mature);
        expect(firebase.queriedList).toHaveBeenCalled();
    });

    it('should be able to like pin', () => {
        expect(component.likePin).toBeDefined();
    });

    it('should be able to unlike pin', () => {
        expect(component.unlikePin).toBeDefined();
    });

    it('should be able to view pin', () => {
        expect(component.viewPin('testPinID')).toBeUndefined();
    });

    it('should prepare post request when loading posts', () => {
        spyOn(component, 'preparePostsRequest').and.returnValue({ subscribe: () => {}});
        component.loadPosts();
        expect(component.preparePostsRequest).toHaveBeenCalled();
    })

    it('should request Firebase to load posts', () => {
        component.queriedListParameters = {
            path: '/posts/',
            orderByValue: 'rawTime',
            limitToLast: 2,
          }
        spyOn(firebase, 'limitedList').and.returnValue({ subscribe: () => { } });
        component.requestPosts();
        expect(firebase.limitedList).toHaveBeenCalled();
    });

    it('should request Firebase to check if user already liked post', () => {
        spyOn(firebase, 'queriedList').and.returnValue({ subscribe: () => { } });
        component.uid = 'testUID'
        component.requestPostUserLikerObject(mockPost.mature);
        expect(firebase.queriedList).toHaveBeenCalled();
    });

    it('should be able to like post', () => {
        expect(component.likePost).toBeDefined();
    });

    it('should be able to unlike post', () => {
        expect(component.unlikePost).toBeDefined();
    });

    it('should be able to view post', () => {
        expect(component.viewPost('testPostID')).toBeUndefined();
    });

    it('should be able to view user', () => {
        expect(component.viewUser).toBeDefined();
    });

    it('should be able to open link', () => {
        expect(component.openLink).toBeDefined
    });
});
