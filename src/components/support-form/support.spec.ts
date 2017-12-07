import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';

import { SupportFormComponent } from './support-form';

import { } from 'jasmine';

import {
} from '../../../test-config/mocks-ionic';

describe('SupportFormComponent', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SupportFormComponent],
      imports: [
        IonicModule.forRoot(SupportFormComponent),
      ],
      providers: [
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportFormComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof SupportFormComponent).toBe(true);
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