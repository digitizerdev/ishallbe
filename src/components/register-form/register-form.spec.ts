import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';

import { } from 'jasmine';

import { RegisterFormComponent } from './register-form';

import {
} from '../../../test-config/mocks-ionic';

describe('RegisterFormComponent', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterFormComponent],
      imports: [
        IonicModule.forRoot(RegisterFormComponent),
      ],
      providers: [
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof RegisterFormComponent).toBe(true);
  });

  it('should submit form input', () => {
    spyOn(component, 'auth');
    let submission = {
      "name": 'testFormName',
      "email": 'testFormEmail',
      "password": 'testFormPassword'
    }
    component.submit(submission);
    fixture.detectChanges();
    expect(component.submission).toBe(submission);
    expect(component.auth).toHaveBeenCalled();
  });

  it('should toggle form submission flag on submission', () => {
    spyOn(component, 'auth');
    expect(component.submitted).toBeFalsy();
    let submission = {
      "email": 'testFormEmail',
      "password": 'testFormPassword'
    }
    component.submit(submission);
    fixture.detectChanges();
    expect(component.submitted).toBeTruthy();
    expect(component.auth).toHaveBeenCalled();
  });

});