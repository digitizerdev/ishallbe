import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';

import {} from 'jasmine';

import { LoginFacebookComponent } from './login-facebook';

import {
} from '../../../test-config/mocks-ionic';

describe('LoginFacebookComponent', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginFacebookComponent],
      imports: [
        IonicModule.forRoot(LoginFacebookComponent),
      ],
      providers: [     
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFacebookComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof LoginFacebookComponent).toBe(true);
  });

 });