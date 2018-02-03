import { ComponentFixture, async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { IonicModule, Platform, Nav } from 'ionic-angular';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { environment } from '../../environments/environment';

import { TermsOfServiceComponent } from '../terms-of-service/terms-of-service';;

import { } from 'jasmine';

import {
    PlatformMock,
    NavMock,
    FirebaseProviderMock,
} from '../../../test-config/mocks-ionic';

describe('TermsOfServiceComponent', () => {
    let fixture;
    let component;
    let platform: Platform;
    let nav: Nav;
    let firebase: FirebaseProvider;
    let afa: AngularFireAuth;
    let afs: AngularFirestore;

    const angularFireAuthStub = {
    };

    const angularFireDataStub = {
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TermsOfServiceComponent],
            imports: [
                IonicModule.forRoot(TermsOfServiceComponent),
                AngularFireModule.initializeApp(environment.firebase)
            ],
            providers: [
                { provide: Platform, useClass: PlatformMock },
                { provide: Nav, useClass: NavMock },
                { provide: FirebaseProvider, useClass: FirebaseProviderMock },
                { provide: AngularFireAuth, useValue: angularFireAuthStub },
                { provide: AngularFirestore, useValue: angularFireDataStub },
            ],
        })
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TermsOfServiceComponent);
        component = fixture.componentInstance;
        platform = TestBed.get(Platform);
        nav = TestBed.get(Nav);
        firebase = TestBed.get(FirebaseProvider);
        afa = TestBed.get(AngularFireAuth);
        afs = TestBed.get(AngularFirestore);
    });


    afterEach(() => {
        fixture.destroy();
        component = null;
        platform = null;
        nav = null;
        firebase = null;
        afa = null;
        afs = null;
    });

    it('should be created', () => {
        expect(component instanceof TermsOfServiceComponent).toBe(true);
    });

    it('should display terms of service link', () => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('a'));
        el = de.nativeElement.href;
        expect(el).toContain('https://docs.wixstatic.com/ugd/7905e6_240379278fa1486d8954001723621f33.pdf');
    });

});


