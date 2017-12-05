import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, } from 'ionic-angular';

import {} from 'jasmine';

import { UserManagerPage } from './user-manager';

import {
  NavMock
} from '../../../test-config/mocks-ionic';

describe('UserManager Page', () => {
  let fixture;
  let component;
  let header;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserManagerPage],
      imports: [
        IonicModule.forRoot(UserManagerPage),
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavMock },        
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagerPage);
    component = fixture.componentInstance;   
  });

  it('should be created', () => {
    expect(component instanceof UserManagerPage).toBe(true);
  });

});
