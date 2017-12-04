import { async, TestBed, ComponentFixture} from '@angular/core/testing';
import { IonicModule, NavController, NavParams, } from 'ionic-angular';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {} from 'jasmine';

import { FormComponent } from './form';
import {
  NavMock
} from '../../../test-config/mocks-ionic';

describe('Form Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormComponent],
      imports: [
        IonicModule.forRoot(FormComponent),
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavMock },        
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof FormComponent).toBe(true);
  });


});
