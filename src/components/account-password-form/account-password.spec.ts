import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';

import { } from 'jasmine';

import { AccountPasswordFormComponent } from './account-password-form';

import {
} from '../../../test-config/mocks-ionic';

describe('AccountPasswordFormComponent', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountPasswordFormComponent],
      imports: [
        IonicModule.forRoot(AccountPasswordFormComponent),
      ],
      providers: [
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPasswordFormComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof AccountPasswordFormComponent).toBe(true);
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