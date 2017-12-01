import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, } from 'ionic-angular';

import {} from 'jasmine';

import { PinComponent } from './pin';
import {
  NavMock
} from '../../../test-config/mocks-ionic';

describe('Pin Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PinComponent],
      imports: [
        IonicModule.forRoot(PinComponent),
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavMock },        
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof PinComponent).toBe(true);
  });


});
