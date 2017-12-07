import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';

import { } from 'jasmine';

import { AccountEmailFormComponent } from './account-email-form';

import {
} from '../../../test-config/mocks-ionic';

describe('AccountEmailFormComponent', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountEmailFormComponent],
      imports: [
        IonicModule.forRoot(AccountEmailFormComponent),
      ],
      providers: [
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountEmailFormComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof AccountEmailFormComponent).toBe(true);
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