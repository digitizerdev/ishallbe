import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, } from 'ionic-angular';

import {} from 'jasmine';

import { AccountPasswordPage } from './account-password';
import {
  NavMock
} from '../../../test-config/mocks-ionic';

describe('AccountPassword Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountPasswordPage],
      imports: [
        IonicModule.forRoot(AccountPasswordPage),
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavMock },        
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPasswordPage);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof AccountPasswordPage).toBe(true);
  });


});
