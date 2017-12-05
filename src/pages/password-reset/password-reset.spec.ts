import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, } from 'ionic-angular';

import {} from 'jasmine';

import { PasswordResetPage } from './password-reset';

import {
  NavMock
} from '../../../test-config/mocks-ionic';

describe('PasswordReset Page', () => {
  let fixture;
  let component;
  let header;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordResetPage],
      imports: [
        IonicModule.forRoot(PasswordResetPage),
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavMock },        
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordResetPage);
    component = fixture.componentInstance;   
  });

  it('should be created', () => {
    expect(component instanceof PasswordResetPage).toBe(true);
  });

});
