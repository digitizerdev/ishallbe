import { ComponentFixture, async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { 
    IonicModule, 
    Platform, 
    NavController, 
    LoadingController, 
    AlertController, 
    Events 
} from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { environment } from '../../environments/environment';

import { LoginFacebookComponent } from '../login-facebook/login-facebook';

import { mockUsers } from '../../../test-data/users/mocks';

import { Observable } from 'rxjs/Observable';

import { } from 'jasmine';

import {
    PlatformMock,
    NavMock,
    LoadingControllerMock,
    AlertControllerMock,
    EventsMock,
    FacebookMock,
    FirebaseProviderMock,
} from '../../../test-config/mocks-ionic';

describe('LoginFacebookComponent', () => {
    let fixture;
    let component;
    let platform: Platform;
    let navCtrl: NavController;
    let loadingCtrl: LoadingController;
    let alertCtrl: AlertController;
    let events: Events;
    let facebook: Facebook;
    let firebase: FirebaseProvider;
    let afa: AngularFireAuth;
    let afs: AngularFirestore;

    const angularFireAuthStub = {
    };

    let setSpy = jasmine.createSpy("set");
    let docSpy = jasmine.createSpy("doc").and.returnValue({
        set: setSpy,
    })

    const angularFireDataStub = {
        doc: docSpy
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LoginFacebookComponent],
            imports: [
                IonicModule.forRoot(LoginFacebookComponent),
                AngularFireModule.initializeApp(environment.firebase)
            ],
            providers: [
                { provide: Platform, useClass: PlatformMock },
                { provide: NavController, useClass: NavMock },
                { provide: LoadingController, useClass: LoadingControllerMock },
                { provide: AlertController, useClass: AlertControllerMock },
                { provide: Events, useClass: EventsMock },
                { provide: Facebook, useClass: FacebookMock },
                { provide: FirebaseProvider, useClass: FirebaseProviderMock },
                { provide: AngularFireAuth, useValue: angularFireAuthStub },
                { provide: AngularFirestore, useValue: angularFireDataStub },
            ],
        })
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginFacebookComponent);
        component = fixture.componentInstance;
        platform = TestBed.get(Platform);
        navCtrl = TestBed.get(NavController);
        loadingCtrl = TestBed.get(LoadingController);
        alertCtrl = TestBed.get(AlertController);
        events = TestBed.get(Events);
        facebook = TestBed.get(Facebook);
        firebase = TestBed.get(FirebaseProvider);
        afa = TestBed.get(AngularFireAuth);
        afs = TestBed.get(AngularFirestore);
    });

    afterEach(() => {
        fixture.destroy();
        component = null;
        platform = null;
        navCtrl = null;
        loadingCtrl = null;
        alertCtrl = null;
        facebook = null;
        events = null;
        firebase = null;
        afa = null;
        afs = null;
    });

    fit('should be created', () => {
        expect(component instanceof LoginFacebookComponent).toBe(true);
    });

    fit('should display Facebook login button', async(() => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('#FacebookIconLoginButton'));
        el = de.nativeElement.src
        expect(el).toBeUndefined();
    }));
});