import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, } from 'ionic-angular';

import {} from 'jasmine';

import { ContractsPage } from './contracts';
import {
  NavMock
} from '../../../test-config/mocks-ionic';

describe('Contracts Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContractsPage],
      imports: [
        IonicModule.forRoot(ContractsPage),
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavMock },        
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractsPage);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof ContractsPage).toBe(true);
  });


});
