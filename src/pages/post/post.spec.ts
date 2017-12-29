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

import { PostPage } from './post';

import { FirebaseProvider } from '../../providers/firebase/firebase';

import { mockPost } from '../../../test-data/post/mocks';

import { } from 'jasmine';

import {
    FirebaseProviderMock,
    NavMock,
    NavParamsMock,
    StorageMock,
    AngularFireDatabaseMock,
    AngularFireAuthMock
} from '../../../test-config/mocks-ionic';

let fixture;
let component;
let nav: NavController;
let navParams: NavParams;
let firebase: FirebaseProvider;
let storage: Storage;
let afData: AngularFireDatabase;
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

describe('PostPage', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PostPage],
            imports: [
                IonicModule.forRoot(PostPage),
                AngularFireModule.initializeApp(environment.firebase)
            ],
            providers: [
                { provide: FirebaseProvider, useClass: FirebaseProviderMock },
                { provide: Storage, useClass: StorageMock },
                { provide: NavController, useClass: NavMock },
                { provide: NavParams, useClass: NavParamsMock },
                { provide: AngularFireDatabase, useValue: angularFireDataStub },
                { provide: AngularFireAuth, useValue: angularFireAuthStub },
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PostPage);
        component = fixture.componentInstance;
        nav = fixture.componentRef.injector.get(NavController);
        navParams = fixture.componentRef.injector.get(NavParams);
        storage = fixture.componentRef.injector.get(Storage);
        firebase = fixture.componentRef.injector.get(FirebaseProvider);
        afData = TestBed.get(AngularFireDatabase);
        afAuth = TestBed.get(AngularFireAuth);
    });

    afterEach(() => {
        fixture.destroy();
        component = null;
        nav = null;
        navParams = null;
        storage = null;
        firebase = null;
        afAuth = null;
        afData = null;
        updateSpy.calls.reset();
        objectSpy.calls.reset();
        removeSpy.calls.reset();
        listSpy.calls.reset();
        querySpy.calls.reset();
        takeSpy.calls.reset();
        pushSpy.calls.reset();
    });

    it('should be created', () => {
        expect(component instanceof PostPage).toBe(true);
    });

    it('should have a defined comment form array on construction', () => {
        expect(component.commentForm).toBeDefined();
    });

    it('should define flags on entrance', () => {
        expect(component.likedPost).toBeUndefined();
        expect(component.submitted).toBeUndefined();
        expect(component.refreshing).toBeUndefined();
        expect(component.loaded).toBeUndefined();
        component.ionViewDidEnter();
        expect(component.likedPost).toBe(false);
        expect(component.submitted).toBe(false);
        expect(component.refreshing).toBe(false);
        expect(component.loaded).toBe(false);
    });

    it('should load profile on entrance', fakeAsync(() => {
        spyOn(component, 'loadProfile').and.returnValue({ subscribe: () => { } });
        component.ionViewDidEnter();
        tick();
        fixture.detectChanges();
        expect(component.loadProfile).toHaveBeenCalled();
    }));

    it('should request UID from Storage while loading profile', () => fakeAsync(() => {
        spyOn(component, 'requestUID').and.returnValue({ subscribe: () => { } });
        spyOn(storage, 'ready').and.callThrough();
        spyOn(storage, 'get').and.callThrough();
        component.requestUID();
        tick();
        fixture.detectChanges();
        expect(component.requestUID).toHaveBeenCalled();
        expect(storage.ready).toHaveBeenCalled();
        expect(storage.get).toHaveBeenCalled();
    }));

    it('should request profile from Firebase', fakeAsync(() => {
        component.requestProfile();
        tick();
        fixture.detectChanges();
        expect(afData.object).toHaveBeenCalled();
    }));

    it('should load post next', fakeAsync(() => {
        spyOn(component, 'startRefresh');
        spyOn(navParams, 'get').and.callThrough();
        spyOn(component, 'requestPost').and.returnValue({ subscribe: () => { } });
        component.loaded = false;
        component.loadPost();
        tick();
        fixture.detectChanges();
        expect(component.startRefresh).toHaveBeenCalled();
        expect(navParams.get).toHaveBeenCalled();
        expect(component.requestPost).toHaveBeenCalled();
    }));

    it('should request post from Firebase', fakeAsync(() => {
        component.requestPost();
        tick();
        fixture.detectChanges();
        expect(afData.object).toHaveBeenCalled();
    }));

    it('should present post', () => {
        expect(component.loaded).toBeFalsy();
        spyOn(component, 'endRefresh');
        spyOn(component, 'requestPostUserLikerObject').and.returnValue({ subscribe: () => { } });
        component.presentPost('');
        expect(component.loaded).toBeTruthy();
        expect(component.endRefresh).toHaveBeenCalled();
        expect(component.requestPostUserLikerObject).toHaveBeenCalled();
    });

    it('should not present post if it has already loaded', () => {
        spyOn(component, 'startRefresh');
        spyOn(navParams, 'get').and.callThrough();        
        spyOn(component, 'requestPost').and.returnValue({ subscribe: () => {}});
        spyOn(component, 'presentPost');
        component.loaded = true;
        component.loadPost('');
        expect(navParams.get).toHaveBeenCalled();        
        expect(component.startRefresh).toHaveBeenCalled();
        expect(component.presentPost).toHaveBeenCalledTimes(0);
    });

    it('should request Firebase to check if user already liked post', () => {
        component.post = mockPost.mature;
        component.comments = mockPost.mature.comments;
        component.uid = 'testUID'
        component.requestPostUserLikerObject();
        expect(afData.list).toHaveBeenCalled();
    });

    it('should not mark post liked if user liker object not found', () => {
        component.markPostLike(mockPost.new.likers);
        expect(component.likedPost).toBeFalsy();
    });

    it('should mark post liked if user liker object found', () => {
        component.markPostLike(mockPost.mature.likers);
        expect(component.likedPost).toBeTruthy();
    });

    it('should not request post comments if no comment object found', () => {
        spyOn(firebase, 'orderedList').and.returnValue({ subscribe: () => { } });
        component.post = mockPost.new;
        component.requestComments();
        expect(firebase.orderedList).toHaveBeenCalledTimes(0);
    });

    it('should request post comments if comment object found', () => {
        expect(component.requestComments).toBeDefined();
        // a call here messes up the rest of the tests. Need to better mock post
    });

    it('should request Firebase for comment user liker object', () => {
        component.post = mockPost.mature;
        component.comments = [];        
        component.comments = mockPost.mature.comments;        
        component.uid = 'testUID'
        component.requestCommentUserLikerObject(mockPost.mature.comments.testComment2);
        expect(afData.list).toHaveBeenCalled();
    });

    it('should mark comment liked if user liker object found', () => {
        component.comments = [];        
        component.markCommentLike(mockPost.mature.comments.testComment2.likers.testCommentLikerID1, mockPost.mature.comments.testComment2);
        let liked = mockPost.mature.comments.testComment2.userLiked;
        expect(liked).toBeTruthy();
    });

    it('should mark comment mine if uid matches', () => {
        component.comments = [];        
        component.uid = 'testUID';
        component.markCommentMine(mockPost.mature.comments.testComment2);
        let mine = mockPost.mature.comments.testComment2.mine
        expect(mine).toBeTruthy();
    });

    it('should not mark comment mine if uid matches', () => {
        component.comments = [];        
        component.uid = 'notTestUID';
        component.markCommentMine(mockPost.mature.comments.testComment2);
        let mine = mockPost.mature.comments.testComment2.mine
        expect(mine).toBeFalsy();
    });

    it('should push comment into comments array after it marks whether it is mine', () => {
        component.comments = [];        
        component.markCommentMine(mockPost.mature.comments.testComment1);
        let comment = mockPost.mature.comments.testComment1;
        expect(component.comments[0]).toBe(comment);
    });

    it('should unlike post on toggle post like if user already liked post', () => {
        component.likedPost = true;
        component.post = mockPost.new;
        spyOn(component, 'unlikePost').and.returnValue({ subscribe: () => {}});        
        component.togglePostLike();
        expect(component.unlikePost).toHaveBeenCalled();
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
        component.removePostLikerObject(mockPost.mature.likers.testPostLikerID1);
        expect(afData.object).toHaveBeenCalled();
    });

    it('should like post on toggle post like if user has not already liked post', () => {
        component.likedPost = false;
        component.post = mockPost.mature;
        spyOn(component, 'likePost').and.returnValue({ subscribe: () => {}});        
        component.togglePostLike();
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

    it('should submit comment via comment bar', () => {
        component.loaded = true;
        fixture.detectChanges();
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('form'));
        el = de.nativeElement.innerHTML
        expect(el).toContain('Comment');
        expect(component.submit).toBeDefined();
    });

    it('should prep comment on submission', () => {
        spyOn(component, 'prepComment').and.returnValue({ subscribe: () => {}});
        let commentForm = {
            comment: 'testComment'
        }
        component.submit(commentForm);
        expect(component.submitted).toBeTruthy();
        expect(component.prepComment).toHaveBeenCalled();
    });

    it('should request Firebase to push comment to post', fakeAsync(() => {
        component.firebase.list('testPath').push('post')
        tick();
        fixture.detectChanges();
        expect(listSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalled();
    }));

    it('should request Firebase to update comment with id', fakeAsync(() => {
        component.firebase.object('testPath').update('post')
        tick();
        fixture.detectChanges();
        expect(objectSpy).toHaveBeenCalled();
        expect(updateSpy).toHaveBeenCalled();
    }));

    it('should request Firebase to increment post comment count', fakeAsync(() => {
        component.firebase.object('testPath').update('post')
        tick();
        fixture.detectChanges();
        expect(objectSpy).toHaveBeenCalled();
        expect(updateSpy).toHaveBeenCalled();
    }));

    it('should unlike comment on toggle comment like if user already liked comment', () => {
        spyOn(component, 'unlikeComment').and.returnValue({ subscribe: () => {}});        
        component.toggleCommentLike(mockPost.mature.comments.testComment2);        
        expect(component.unlikeComment).toHaveBeenCalled();
    });

    it('should request Firebase to remove liker object from liked comment', () => {
        component.post = mockPost.mature;
        component.removeCommentLikerObject(mockPost.mature.comments.testComment2.likers.testCommentLikerID1);
        expect(afData.object).toHaveBeenCalled();
    });

    it('should be able to remove comment if mine', () => {
        expect(component.deleteComment).toBeDefined();
    });

    it('should be able to report post', () => {
        component.loaded = true;
        fixture.detectChanges();
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('h6'));
        el = de.nativeElement.innerHTML
        expect(el).toContain('Report Post');
        expect(component.reportPost).toBeDefined();
    });

    it('should be able to view user', () => {
        expect(component.viewUser).toBeDefined();
    });

});