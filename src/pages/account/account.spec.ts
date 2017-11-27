import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, } from 'ionic-angular';

import {} from 'jasmine';

import { AccountPage } from './account';
import {
  NavMock
} from '../../../test-config/mocks-ionic';

describe('Account Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountPage],
      imports: [
        IonicModule.forRoot(AccountPage),
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavMock },        
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPage);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof AccountPage).toBe(true);
  });


});
