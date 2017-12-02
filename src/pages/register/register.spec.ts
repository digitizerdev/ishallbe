import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, } from 'ionic-angular';

import {} from 'jasmine';

import { RegisterPage } from './register';
import {
  NavMock
} from '../../../test-config/mocks-ionic';

describe('Register Page', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterPage],
      imports: [
        IonicModule.forRoot(RegisterPage),
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavMock },        
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof RegisterPage).toBe(true);
  });


});
