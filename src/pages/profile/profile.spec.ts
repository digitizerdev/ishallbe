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

import { ProfilePage } from './profile';

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

describe('ProfilePage', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilePage], 
      imports: [
        IonicModule.forRoot(ProfilePage),
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
    fixture = TestBed.createComponent(ProfilePage);
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
    expect(component instanceof ProfilePage).toBe(true);
  });

  it('should initialize with undefined title', () => {
    expect(component.title).toBeUndefined();
  })

  it('should initialize with owner false', () => {
    expect(component.owner).toBeFalsy();
  })

  it('should display profile-avatar component', () => {
    let de: DebugElement;
    let el: HTMLElement;
    de = fixture.debugElement.query(By.css('profile-avatar'));
    el = de.nativeElement.src;
    expect(el).toBeUndefined();
  });

  it('should display create statement button if owner', async(() => {
    component.owner = true;
    fixture.detectChanges();
    let de: DebugElement;
    let el: HTMLElement;
    de = fixture.debugElement.query(By.css('#ProfileCreateStatementButton'));
    el = de.nativeElement.innerHTML
    expect(el).toContain('CREATE STATEMENT');
  }));

  it('should display edit profile button if owner', async(() => {
    component.owner = true;
    fixture.detectChanges();
    let de: DebugElement;
    let el: HTMLElement;
    de = fixture.debugElement.query(By.css('#ProfileEditProfileButton'));
    el = de.nativeElement.innerHTML
    expect(el).toContain('EDIT PROFILE');
  }));

  it('should display profile-posts component', () => {
    let de: DebugElement;
    let el: HTMLElement;
    de = fixture.debugElement.query(By.css('profile-posts'));
    el = de.nativeElement.src;
    expect(el).toBeUndefined();
  });

});
