import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, } from 'ionic-angular';

import {} from 'jasmine';

import { StatementPage } from './statement';

import {
  NavMock
} from '../../../test-config/mocks-ionic';

describe('Statement Page', () => {
  let fixture;
  let component;
  let header;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StatementPage],
      imports: [
        IonicModule.forRoot(StatementPage),
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavMock },        
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementPage);
    component = fixture.componentInstance;   
  });

  it('should be created', () => {
    expect(component instanceof StatementPage).toBe(true);
  });

});
