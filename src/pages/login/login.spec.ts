import { ComponentFixture, async, tick, TestBed, fakeAsync } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, } from 'ionic-angular';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { } from 'jasmine';

import { HeaderComponent } from '../../components/header/header';

import { HomePage } from '../home/home';
import { LoginPage } from './login';
import { RegisterPage } from '../register/register';

import {
  NavMock
} from '../../../test-config/mocks-ionic';

let fixture;
let component;

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
  });

  it('should be created', () => {
    expect(component instanceof LoginPage).toBe(true);
  });

  it('should have header component', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    let de: DebugElement;
    let el: HTMLElement;
    de = fixture.debugElement.query(By.css('img'));
    el = de.nativeElement;
    console.log(el);
    expect(el).toBeDefined();
  }));    

  it('should have form array defined', () => {
    expect(component.form).toBeDefined();
  });

  it('should have emailFormSubmitted variable defined as false', () => {
    expect(component.formSubmitted).toBe(false);
  });

  it('should have forgotPasswordButtonText variable defined', () => {
    expect(component.loginButtonText).toBe('LOGIN');
  });

  it('should have forgotPasswordButtonText variable defined', () => {
    expect(component.forgotPasswordButtonText).toBe('Forgot Password?');
  });

  it('should have registerButtonText variable defined', () => {
    expect(component.registerButtonText).toBeDefined('REGISTER');
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

});
