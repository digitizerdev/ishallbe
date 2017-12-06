import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';

import {} from 'jasmine';

import { HeaderComponent } from './header';

import {
} from '../../../test-config/mocks-ionic';

describe('HeaderComponent', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        IonicModule.forRoot(HeaderComponent),
      ],
      providers: [     
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof HeaderComponent).toBe(true);
  });

 });