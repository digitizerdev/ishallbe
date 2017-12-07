import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';

import {} from 'jasmine';

import { TermsOfServiceComponent } from './terms-of-service';

import {
} from '../../../test-config/mocks-ionic';

describe('TermsOfServiceComponent', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TermsOfServiceComponent],
      imports: [
        IonicModule.forRoot(TermsOfServiceComponent),
      ],
      providers: [     
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsOfServiceComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof TermsOfServiceComponent).toBe(true);
  });
  

 });