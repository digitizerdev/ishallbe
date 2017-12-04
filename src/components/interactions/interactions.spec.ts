import { async, TestBed, ComponentFixture} from '@angular/core/testing';
import { IonicModule, NavController, NavParams, } from 'ionic-angular';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {} from 'jasmine';

import { InteractionsComponent } from './interactions';
import {
  NavMock
} from '../../../test-config/mocks-ionic';

describe('Interactions Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InteractionsComponent],
      imports: [
        IonicModule.forRoot(InteractionsComponent),
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavMock },        
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractionsComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof InteractionsComponent).toBe(true);
  });


});
