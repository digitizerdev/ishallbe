import { ComponentFixture, async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { IonicModule, Events, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../environments/environment';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { NgCalendarModule } from 'ionic2-calendar';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

import { HeaderComponent } from '../../components/header/header';
import { LoginFacebookComponent } from '../../components/login-facebook/login-facebook';
import { TermsOfServiceComponent } from '../../components/terms-of-service/terms-of-service';

import { PinsManagerPage } from './pins-manager';

import { FirebaseProvider } from '../../providers/firebase/firebase';

import { mockPin } from '../../../test-data/pin/mocks';
import { mockPost } from '../../../test-data/post/mocks';

import { } from 'jasmine';

import {
    FirebaseProviderMock,
    NavMock,
    NavParamsMock,
    ActionSheetControllerMock,
    CameraMock,
    StorageMock,
    AngularFireDatabaseMock,
    AngularFireAuthMock
} from '../../../test-config/mocks-ionic';

let fixture;
let component;
let nav: NavController;
let navParams: NavParams;
let action: ActionSheetController;
let camera: Camera
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

describe('PinsManagerPage', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PinsManagerPage],
            imports: [
                IonicModule.forRoot(PinsManagerPage),
                AngularFireModule.initializeApp(environment.firebase),
                NgCalendarModule
            ],
            providers: [
                { provide: FirebaseProvider, useClass: FirebaseProviderMock },
                { provide: Storage, useClass: StorageMock },
                { provide: NavController, useClass: NavMock },
                { provide: NavParams, useClass: NavParamsMock },
                { provide: ActionSheetController, useClass: ActionSheetControllerMock },
                { provide: Camera, useClass: CameraMock },
                { provide: AngularFireDatabase, useValue: angularFireDataStub },
                { provide: AngularFireAuth, useValue: angularFireAuthStub },
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PinsManagerPage);
        component = fixture.componentInstance;
        nav = fixture.componentRef.injector.get(NavController);
        navParams = fixture.componentRef.injector.get(NavParams);
        action = fixture.componentRef.injector.get(ActionSheetController);
        camera = fixture.componentRef.injector.get(Camera);
        storage = fixture.componentRef.injector.get(Storage);
        firebase = fixture.componentRef.injector.get(FirebaseProvider);
        afAuth = TestBed.get(AngularFireAuth);
        afData = TestBed.get(AngularFireDatabase);
    });

    afterEach(() => {
        fixture.destroy();
        component = null;
        nav = null;
        navParams = null;
        camera = null;
        storage = null;
        firebase = null;
        afAuth = null;
        afData = null;
    });

    it('should be created', () => {
        expect(component instanceof PinsManagerPage).toBe(true);
    });    

    it('should load pins on load', () => {
        spyOn(component, 'loadPins').and.returnValue({ subscribe: () => {}});
        component.ionViewDidLoad();
        expect(component.loadPins).toHaveBeenCalled();
    });

    it('should check for pin before creating pin', () => {
        spyOn(component, 'checkForExistingPin').and.returnValue({ subscribe: () => {}});
        component.pushCreatePinPage();
        expect(component.checkForExistingPin).toHaveBeenCalled();
    });

});