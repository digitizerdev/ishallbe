import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, Events, NavController, NavParams } from 'ionic-angular';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../environments/environment';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';

import { HeaderComponent } from '../../components/header/header';

import { AccountPage } from './account';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { SessionProvider } from '../../providers/session/session';

import { } from 'jasmine';

import {
  FirebaseProviderMock,
  SessionProviderMock,
  NavMock,
  StorageMock,
  AngularFireDatabaseMock,
  AngularFireAuthMock
} from '../../../test-config/mocks-ionic';

let fixture;
let component;
let session: SessionProvider;
let sessionSpy;
let firebase: FirebaseProvider;
let firebaseSpy;

describe('AccountPage', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountPage], 
      imports: [
        IonicModule.forRoot(AccountPage),
        AngularFireModule.initializeApp(environment.firebase)                        
      ],
      providers: [
        { provide: FirebaseProvider, useClass: FirebaseProviderMock },
        { provide: SessionProvider, useClass: SessionProviderMock },
        { provide: Storage, useClass: StorageMock },
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavMock },
        { provide: AngularFireDatabase, useClass: AngularFireDatabaseMock },
        { provide: AngularFireAuth, useClass: AngularFireAuthMock },       
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPage);
    component = fixture.componentInstance;
    session = fixture.componentRef.injector.get(SessionProvider);    
    firebase = fixture.componentRef.injector.get(FirebaseProvider);
  });

  afterEach(() => {
    fixture.destroy();
    component = null;
    session = null;
    sessionSpy = null;
    firebase = null;
    firebaseSpy = null;
  });

  it('should be created', () => {
    expect(component instanceof AccountPage).toBe(true);
  });

  it('should have title called Account', () => {
    expect(component.title).toBe('Account');
  });

  it('should display header component', () => {
    let de: DebugElement;
    let el: HTMLElement;
    de = fixture.debugElement.query(By.css('header'));
    el = de.nativeElement.src;
    expect(el).toBeUndefined();
  });

  it('should display view profile button', async(() => {
    let de: DebugElement;
    let el: HTMLElement;
    de = fixture.debugElement.query(By.css('#AccountViewProfileButton'));
    el = de.nativeElement.innerHTML
    expect(el).toContain('View Profile');
  }));

  it('should display update password button', async(() => {
    let de: DebugElement;
    let el: HTMLElement;
    de = fixture.debugElement.query(By.css('#AccountUpdatePasswordButton'));
    el = de.nativeElement.innerHTML
    expect(el).toContain('Update Password');
  }));

  it('should display update email button', async(() => {
    let de: DebugElement;
    let el: HTMLElement;
    de = fixture.debugElement.query(By.css('#AccountUpdateEmailButton'));
    el = de.nativeElement.innerHTML
    expect(el).toContain('Update Email');
  }));

  it('should display logout button', async(() => {
    let de: DebugElement;
    let el: HTMLElement;
    de = fixture.debugElement.query(By.css('#AccountLogoutButton'));
    el = de.nativeElement.innerHTML
    expect(el).toContain('Logout');
  }));

  it('should request role from session provider', () => {
    spyOn(session, 'role').and.returnValue({ subscribe: () => {} })
    component.requestRole();
    fixture.detectChanges();
    expect(session.role).toHaveBeenCalled();
  });

  it('should request uid from session provider', () => {
    spyOn(session, 'uid').and.returnValue({ subscribe: () => {} })
    component.requestUID();
    fixture.detectChanges();
    expect(session.uid).toHaveBeenCalled();
  });

  it('should load profile by requesting it', () => {
    spyOn(component, 'requestProfile').and.returnValue({ subscribe: () => {} })
    component.loadProfile('testUID');
    fixture.detectChanges();
    expect(component.requestProfile).toHaveBeenCalled
  });

  it('should request profile from firebase provider', () => {
    spyOn(firebase, 'object').and.returnValue;
    component.requestProfile('testUID');
    fixture.detectChanges();
    expect(firebase.object).toHaveBeenCalled();
  });

  it('should be able to logout of session', () => {
    spyOn(session, 'end');
    spyOn(component, 'setRootLoginPage')
    component.logout();
    expect(session.end).toHaveBeenCalled();
    expect(component.setRootLoginPage).toHaveBeenCalled();
  });

  it('should display terms of service component', () => {
    let de: DebugElement;
    let el: HTMLElement;
    de = fixture.debugElement.query(By.css('terms-of-service'));
    el = de.nativeElement.src;
    expect(el).toBeUndefined();
  });

});
