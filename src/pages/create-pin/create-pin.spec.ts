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
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

import { HeaderComponent } from '../../components/header/header';
import { LoginFacebookComponent } from '../../components/login-facebook/login-facebook';
import { TermsOfServiceComponent } from '../../components/terms-of-service/terms-of-service';

import { CreatePinPage } from './create-pin';

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

describe('CreatePinPage', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CreatePinPage],
            imports: [
                IonicModule.forRoot(CreatePinPage),
                AngularFireModule.initializeApp(environment.firebase)
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
        fixture = TestBed.createComponent(CreatePinPage);
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
        expect(component instanceof CreatePinPage).toBe(true);
    });    

    it('should have defined pin form', () => {
        expect(component.pinForm).toBeDefined();
    });

    it('should display header component', () => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('header'));
        el = de.nativeElement.src;
        expect(el).toBeUndefined();
    });

    it('should load profile', fakeAsync(() => {
        spyOn(component, 'requestUID').and.callThrough();
        spyOn(component, 'requestProfile').and.returnValue({ subscribe: () => {}});
        spyOn(storage, 'ready').and.callThrough();
        spyOn(storage, 'get').and.callThrough();
        component.loadProfile();
        tick();
        fixture.detectChanges();
        expect(storage.ready).toHaveBeenCalled();
        expect(storage.get).toHaveBeenCalled();
        expect(component.requestUID).toHaveBeenCalled();
        expect(component.requestProfile).toHaveBeenCalled();
    }));

    it('should display pin form', () => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('form'));
        el = de.nativeElement.innerHTML;
        expect(el).toContain('Publish');
    });

    it('should ask for day of week on load', () => {
        spyOn(component, 'askForDayOfWeek');
        component.ionViewDidLoad();
        expect(component.askForDayOfWeek).toHaveBeenCalled();
    });

    it('should load next dates', () => {
        expect(component.findNextSelectedDay).toBeDefined();
    });

    it('should request Camera to get picture', () => {
        spyOn(camera, 'getPicture').and.callThrough();
        component.getPicture();
        expect(camera.getPicture).toHaveBeenCalled();
    });

    it('should submit form', () => {
        let pinForm = {
            title: 'testTitle',
            content: 'testContent',
            url: 'url'
        }
        component.submit(pinForm);
        expect(component.submitted).toBeTruthy();
    });;
});