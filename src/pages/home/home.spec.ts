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

import { mockPin } from '../../../test-data/pin/mocks';
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
let afData: AngularFireDatabase;
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

let updateSpy = jasmine.createSpy("update");

let removeSpy = jasmine.createSpy("remove");

let objectSpy = jasmine.createSpy("object").and.returnValue({
    update: updateSpy,
    remove: removeSpy
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
        afData = TestBed.get(AngularFireDatabase);
    });

    afterEach(() => {
        fixture.destroy();
        component = null;
        nav = null;
        storage = null;
        firebase = null;
        afAuth = null;
        afData = null;
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
        component.ionViewDidLoad();
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

    it('should unlike pin on toggle pin like if user already liked pin', () => {
        spyOn(component, 'requestPinUserLikerObject').and.returnValue({ subscribe: () => {}});
        component.togglePinLike(mockPin.mature);
        expect(component.requestPinUserLikerObject).toHaveBeenCalled();
    });

    it('should request Firebase to update unliked pin', fakeAsync(() => {
        component.firebase.object('testPath').update('pin')
        tick();
        fixture.detectChanges();
        expect(objectSpy).toHaveBeenCalled();
        expect(updateSpy).toHaveBeenCalled();
    }));

    it('should request Firebase to remove liker object from liked pin', () => {
        component.pin = mockPin.mature;
        component.removePinLikerObject(mockPin.mature.likers.testPinLikerID1, mockPin.mature);
        expect(afData.object).toHaveBeenCalled();
    });

    it('should like pin on toggle pin like if user has not already liked pin', () => {
        spyOn(component, 'likePin').and.returnValue({ subscribe: () => {}});        
        component.togglePinLike(mockPin.new);
        expect(component.likePin).toHaveBeenCalled();
    });

    it('should request Firebase to update liked pin', fakeAsync(() => {
        component.firebase.object('testPath').update('pin')
        tick();
        fixture.detectChanges();
        expect(objectSpy).toHaveBeenCalled();
        expect(updateSpy).toHaveBeenCalled();
    }));

    it('should request Firebase to push liker object', fakeAsync(() => {
        component.firebase.list('testPath').push('pin')
        tick();
        fixture.detectChanges();
        expect(listSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalled();
    }));

    it('should request Firebase to update pin liker object with id', fakeAsync(() => {
        component.firebase.object('testPath').update('pin')
        tick();
        fixture.detectChanges();
        expect(objectSpy).toHaveBeenCalled();
        expect(updateSpy).toHaveBeenCalled();
    }));

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

    it('should unlike post on toggle post like if user already liked post', () => {
        spyOn(component, 'requestPostUserLikerObject').and.returnValue({ subscribe: () => {}});
        component.togglePostLike(mockPost.mature);
        expect(component.requestPostUserLikerObject).toHaveBeenCalled();
    });

    it('should request Firebase to update unliked post', fakeAsync(() => {
        component.firebase.object('testPath').update('post')
        tick();
        fixture.detectChanges();
        expect(objectSpy).toHaveBeenCalled();
        expect(updateSpy).toHaveBeenCalled();
    }));

    it('should request Firebase to remove liker object from liked post', () => {
        component.post = mockPost.mature;
        component.removePostLikerObject(mockPost.mature.likers.testPostLikerID1, mockPost.mature);
        expect(afData.object).toHaveBeenCalled();
    });

    it('should like post on toggle post like if user has not already liked post', () => {
        spyOn(component, 'likePost').and.returnValue({ subscribe: () => {}});        
        component.togglePostLike(mockPost.new);
        expect(component.likePost).toHaveBeenCalled();
    });

    it('should request Firebase to update liked post', fakeAsync(() => {
        component.firebase.object('testPath').update('post')
        tick();
        fixture.detectChanges();
        expect(objectSpy).toHaveBeenCalled();
        expect(updateSpy).toHaveBeenCalled();
    }));

    it('should request Firebase to push liker object', fakeAsync(() => {
        component.firebase.list('testPath').push('post')
        tick();
        fixture.detectChanges();
        expect(listSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalled();
    }));

    it('should request Firebase to update post liker object with id', fakeAsync(() => {
        component.firebase.object('testPath').update('post')
        tick();
        fixture.detectChanges();
        expect(objectSpy).toHaveBeenCalled();
        expect(updateSpy).toHaveBeenCalled();
    }));

    it('should be able to view post', () => {
        expect(component.viewPost('testPostID')).toBeUndefined();
    });

    it('should be able to view profile', () => {
        expect(component.viewProfile).toBeDefined();
    });

    it('should be able to open link', () => {
        expect(component.openLink).toBeDefined
    });
});
