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

import { StatementsPage } from './statements';

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

const angularFireAuthStub = {
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

describe('StatementsPage', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StatementsPage],
            imports: [
                IonicModule.forRoot(StatementsPage),
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
        fixture = TestBed.createComponent(StatementsPage);
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
    });

    it('should be created', () => {
        expect(component instanceof StatementsPage).toBe(true);
    });

    it('should display header component', () => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('header'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

    it('should display create statement button', () => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('#CreateStatementButton'));
        el = de.nativeElement.innerHTML
        expect(el).toContain('Create Statement');
    });

    it('should load profile', fakeAsync(() => {
        spyOn(component, 'requestUID').and.callThrough();
        spyOn(component, 'requestProfile').and.returnValue({ subscribe: () => {}});
        spyOn(storage, 'ready').and.callThrough();
        spyOn(storage, 'get').and.callThrough();
        component.ionViewDidLoad();
        tick();
        fixture.detectChanges();
        expect(storage.ready).toHaveBeenCalled();
        expect(storage.get).toHaveBeenCalled();
        expect(component.requestUID).toHaveBeenCalled();
        expect(component.requestProfile).toHaveBeenCalled();
    }));

    it('should request user posts from Firebase', () => {
        spyOn(firebase, 'queriedList').and.returnValue({ subscribe: () => {}});
        this.uid = 'testUID';
        component.loadUserPosts();
        expect(firebase.queriedList).toHaveBeenCalled();
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
});