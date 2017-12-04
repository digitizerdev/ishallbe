import { async, TestBed, ComponentFixture} from '@angular/core/testing';
import { IonicModule, NavController, NavParams, } from 'ionic-angular';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {} from 'jasmine';

import { SocialFacebookComponent } from './social-facebook';
import {
  NavMock
} from '../../../test-config/mocks-ionic';

describe('SocialFacebook Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SocialFacebookComponent],
      imports: [
        IonicModule.forRoot(SocialFacebookComponent),
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavMock },        
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialFacebookComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof SocialFacebookComponent).toBe(true);
  });


});
