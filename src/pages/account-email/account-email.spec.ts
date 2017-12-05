import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, } from 'ionic-angular';

import {} from 'jasmine';

import { AccountEmailPage } from './account-email';

import {
  NavMock
} from '../../../test-config/mocks-ionic';

describe('Home Page', () => {
  let fixture;
  let component;
  let header;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountEmailPage],
      imports: [
        IonicModule.forRoot(AccountEmailPage),
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavMock },        
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountEmailPage);
    component = fixture.componentInstance;   
  });

  it('should be created', () => {
    expect(component instanceof AccountEmailPage).toBe(true);
  });

});
