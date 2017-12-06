import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { NgModule, Component, ViewChild } from '@angular/core';
import { IonicModule, Platform } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Facebook } from '@ionic-native/facebook';
import { Camera } from '@ionic-native/camera';
import { MediaCapture } from '@ionic-native/media-capture';
import { Push } from '@ionic-native/push';
import { File } from '@ionic-native/file';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';

import { FirebaseProvider } from '../providers/firebase/firebase';
import { SessionProvider } from '../providers/session/session';

import { iShallBe } from './app.component';

import {
  FirebaseProviderMock,
  SessionProviderMock,
  PlatformMock,
  StatusBarMock,
  SplashScreenMock,
  StorageMock,
  FacebookMock,
  FileMock,
  PushMock,
} from '../../test-config/mocks-ionic';

import { } from 'jasmine';

let fixture;
let component;
let session: SessionProvider;
let sessionSpy;
let firebase: SessionProvider;
let firebaseSpy: FirebaseProvider;

describe('iShallBe App Component', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [iShallBe],
      imports: [
        IonicModule.forRoot(iShallBe),
      ],
      providers: [
        { provide: FirebaseProvider, useClass: FirebaseProviderMock },
        { provide: SessionProvider, useClass: SessionProviderMock },
        { provide: StatusBar, useClass: StatusBarMock },
        { provide: SplashScreen, useClass: SplashScreenMock },
        { provide: Platform, useClass: PlatformMock },
        { provide: Storage, useClass: StorageMock },
        { provide: Facebook, useClass: FacebookMock },
        { provide: File, useClass: FileMock },
        { provide: Push, useClass: PushMock },
      ]
    })
      .compileComponents().then(()=>{
        fixture = TestBed.createComponent(iShallBe);
        component = fixture.componentInstance;
        session = fixture.componentRef.injector.get(SessionProvider);
        firebase = fixture.componentRef.injector.get(FirebaseProvider);
      });
  }));

  afterEach(() => {
    fixture.destroy();
    component = null;
    session = null;
    sessionSpy = null;
    firebase = null;
    firebaseSpy = null;
  });

  it('should be created', () => {
    expect(component instanceof iShallBe).toBe(true);
  });

  it('should have 2 providers', () => {
    expect(component.providers.length).toBe(2);
  });

  it('should initialize with 5 menu pages', () => {
    expect(component.menuPages.length).toBe(5);
  })

  it('should have 21 pages', () => {
    expect(component.pages.length).toBe(21);
  });

  it('should initialize with login page as root page', () => {
    expect(component['rootPage']).toBe(LoginPage);
  });

  it('should set home page to be root page if user is in session', () => {
    component.setRootHomePage(true);
    fixture.detectChanges();
    expect(component['rootPage']).toBe(HomePage);
  });

  it('should ask session provider for user if woken up', () => {
    spyOn(session, 'retrieveUser')
    component.wakeUp();
    fixture.detectChanges();
    expect(session.retrieveUser).toHaveBeenCalled();
  });

  it('should not ask session provider for user if not woken up', () => {
    spyOn(component, 'wakeUp');
    spyOn(session, 'retrieveUser');
    fixture.detectChanges();
    expect(component.wakeUp).toHaveBeenCalledTimes(0);
    expect(session.retrieveUser).toHaveBeenCalledTimes(0);
  })

  it('should add manager pages to menuPages in order if editor true', () => {
    let standardMenuPagesLength = component.menuPages.length;
    let managerMenuPagesLength = component.managerPages.length + component.menuPages.length
    component.setManagerMenu(true);  
    fixture.detectChanges();   
    let managerPagePosition = 0;
    for (let pages = standardMenuPagesLength; pages < component.menuPages.length; pages++) {
      expect(component.menuPages.indexOf(component.managerPages[managerPagePosition])).toBe(pages);
      managerPagePosition++;
    }
    expect(component.menuPages.length).toBe(managerMenuPagesLength);
  });

  it('should not add manager pages to menuPages in order if editor false', () => {
    let standardMenuPagesLength = component.menuPages.length;
    component.setManagerMenu(false); 
    fixture.detectChanges();       
    expect(component.menuPages.length).toBe(standardMenuPagesLength);
  })

  it('should have 23 components', () => {
    expect(component.components.length).toBe(23);
  });

});
