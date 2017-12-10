import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { IonicModule } from 'ionic-angular';

import {} from 'jasmine';

import { TermsOfServiceComponent } from './terms-of-service';

import {
} from '../../../test-config/mocks-ionic';

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
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsOfServiceComponent);
    component = fixture.componentInstance;
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