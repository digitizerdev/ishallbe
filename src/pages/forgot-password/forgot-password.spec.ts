import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, } from 'ionic-angular';

import {} from 'jasmine';

import { ForgotPasswordPage } from './forgot-password';
import {
  NavMock
} from '../../../test-config/mocks-ionic';

describe('ForgotPassword Page', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotPasswordPage],
      imports: [
        IonicModule.forRoot(ForgotPasswordPage),
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavMock },        
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordPage);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof ForgotPasswordPage).toBe(true);
  });


});
