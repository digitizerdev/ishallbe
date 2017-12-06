import { async, TestBed, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HomePage } from '../../pages/home/home';

import {} from 'jasmine';

import { MediaComponent } from './media';

import { SessionProvider } from '../../providers/session/session';
import { FirebaseProvider } from '../../providers/firebase/firebase';

import {
  NavMock,
  SessionProviderMock,
  FirebaseProviderMock,  
  StorageMock
} from '../../../test-config/mocks-ionic';

describe('Media Component', () => {
  let fixture;
  let component;
  let session: SessionProvider;
  let sessionSpy;
  let firebase: FirebaseProvider;
  let firebaseSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MediaComponent],
      imports: [
        IonicModule.forRoot(MediaComponent),
        IonicStorageModule.forRoot()
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavMock }, 
        { provide: FirebaseProvider, useClass: FirebaseProviderMock },
        { provide: SessionProvider, useClass: SessionProviderMock },
        { provide: IonicStorageModule, useClass: StorageMock }
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaComponent);
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
    expect(component instanceof MediaComponent).toBe(true);
  });
  
});