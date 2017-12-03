import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, } from 'ionic-angular';
import { By } from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import {} from 'jasmine';

import { HeaderComponent } from '../../components/header/header';

import { HomePage } from '../home/home';
import { LoginPage } from './login';
import { RegisterPage } from '../register/register';

import {
  NavMock
} from '../../../test-config/mocks-ionic';

let fixture;
let component;
let de: DebugElement;
let el: HTMLElement;

describe('Login Page', () => {
 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [
        IonicModule.forRoot(LoginPage),
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavMock },        
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
    component = null;
    de = null;
    el = null;
  });

  it('should be created', () => {
    expect(component instanceof LoginPage).toBe(true);
  });

  it('should have title variable defined', () => {
    expect(component.title).toBeDefined();
  });

  it('should have push forgot password page function', () => {
    expect(component.pushForgotPasswordPage()).toBeUndefined();
  });

  it('should have set root to register page function', () => {
    expect(component.setRootRegisterPage()).toBeUndefined();
  });

  it('should have submit login form function', () => {
    expect(component.submitLoginForm()).toBeUndefined();
  });

  it('should initialize with submitted false', () => {
    expect(component.submitted).toBe(false);
  });

});
