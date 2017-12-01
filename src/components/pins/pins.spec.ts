import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, } from 'ionic-angular';

import {} from 'jasmine';

import { PinsComponent } from './pins';
import {
  NavMock
} from '../../../test-config/mocks-ionic';

describe('Pins Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PinsComponent],
      imports: [
        IonicModule.forRoot(PinsComponent),
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavMock },        
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinsComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof PinsComponent).toBe(true);
  });


});
