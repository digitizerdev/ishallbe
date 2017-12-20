import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { IonicModule } from 'ionic-angular';

import { } from 'jasmine';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { SessionProvider } from '../../providers/session/session';
import { NativeProvider } from '../../providers/native/native';
import { DigitalProvider } from '../../providers/digital/digital';

import { HeaderComponent } from './header';

import {
  FirebaseProviderMock,
  SessionProviderMock,
  NativeProviderMock,
  DigitalProviderMock,
} from '../../../test-config/mocks-ionic';

describe('HeaderComponent', () => {
  let fixture;
  let component;
  let session: SessionProvider;
  let sessionSpy;
  let firebase: FirebaseProvider;
  let firebaseSpy;
  let native: NativeProvider;
  let nativeSpy;
  let digital: DigitalProvider;
  let digitalSpy;  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        IonicModule.forRoot(HeaderComponent),
      ],
      providers: [
        { provide: FirebaseProvider, useClass: FirebaseProviderMock },
        { provide: SessionProvider, useClass: SessionProviderMock },
        { provide: NativeProvider, useClass: NativeProviderMock },
        { provide: DigitalProvider, useClass: DigitalProviderMock },
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    session = fixture.componentRef.injector.get(SessionProvider);
    firebase = fixture.componentRef.injector.get(FirebaseProvider);
    native = fixture.componentRef.injector.get(NativeProvider);
    digital = fixture.componentRef.injector.get(DigitalProvider);
  });

  afterEach(() => {
    fixture.destroy();
    component = null;
    session = null;
    sessionSpy = null;
    firebase = null;
    firebaseSpy = null;
    native = null;
    nativeSpy = null;
    digital = null;
    digitalSpy = null;
  });

  it('should be created', () => {
    expect(component instanceof HeaderComponent).toBe(true);
  });

  it('should display icon png', async(() => {
    let de: DebugElement;
    let el: HTMLElement;
    de = fixture.debugElement.query(By.css('img'));
    el = de.nativeElement.src
    expect(el).toContain('/assets/img/icon.png');
  }));

});