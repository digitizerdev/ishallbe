import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, } from 'ionic-angular';

import {} from 'jasmine';

import { ManagePage } from './manage';
import {
  NavMock
} from '../../../test-config/mocks-ionic';

describe('Manage Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManagePage],
      imports: [
        IonicModule.forRoot(ManagePage),
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavMock },        
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePage);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof ManagePage).toBe(true);
  });


});
