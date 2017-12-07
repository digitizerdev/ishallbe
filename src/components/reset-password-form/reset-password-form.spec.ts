import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';

import { } from 'jasmine';

import { ResetPasswordFormComponent } from './reset-password-form';

import {
} from '../../../test-config/mocks-ionic';

describe('ResetPasswordFormComponent', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResetPasswordFormComponent],
      imports: [
        IonicModule.forRoot(ResetPasswordFormComponent),
      ],
      providers: [
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordFormComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof ResetPasswordFormComponent).toBe(true);
  });

  it('should submit form input', () => {
    let submission = {
      "email": 'testFormEmail',
    }
    component.submit(submission);
    fixture.detectChanges();
    expect(component.submission).toBe(submission);
  });

  it('should toggle form submission flag on submission', () => {
    expect(component.submitted).toBeFalsy();
    let submission = {
      "email": 'testFormEmail',
    }
    component.submit(submission);
    fixture.detectChanges();
    expect(component.submitted).toBeTruthy();
  });

});