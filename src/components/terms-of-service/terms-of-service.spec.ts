import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { IonicModule } from 'ionic-angular';

import {} from 'jasmine';

import { TermsOfServiceComponent } from './terms-of-service';


import { FirebaseProvider } from '../../providers/firebase/firebase';
import { SessionProvider } from '../../providers/session/session';
import { NativeProvider } from '../../providers/native/native';
import { DigitalProvider } from '../../providers/digital/digital';

import { } from 'jasmine';

import {
  FirebaseProviderMock,
  SessionProviderMock,
  NativeProviderMock,
  DigitalProviderMock,
} from '../../../test-config/mocks-ionic';

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

describe('TermsOfServiceComponent', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TermsOfServiceComponent],
      imports: [
        IonicModule.forRoot(TermsOfServiceComponent),
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
    fixture = TestBed.createComponent(TermsOfServiceComponent);
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
    expect(component instanceof TermsOfServiceComponent).toBe(true);
  });

  it('should display Terms of Service link', async(() => {
    let de: DebugElement;
    let linkHref: HTMLElement;
    let linkText: HTMLElement;
    de = fixture.debugElement.query(By.css('a'));
    linkHref = de.nativeElement.href;
    linkText = de.nativeElement.innerHTML
    expect(linkHref).toContain('https://ishallbe.co/wp-content/uploads/2017/10/End-User-License-Agreement.pdf');
    expect(linkText).toContain('Terms of Service');    
  }));
  
 });