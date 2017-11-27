import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, } from 'ionic-angular';

import {} from 'jasmine';

import { AccountNamePage } from './account-name';
import {
  NavMock
} from '../../../test-config/mocks-ionic';

describe('AccountName Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountNamePage],
      imports: [
        IonicModule.forRoot(AccountNamePage),
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavMock },        
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountNamePage);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof AccountNamePage).toBe(true);
  });


});
