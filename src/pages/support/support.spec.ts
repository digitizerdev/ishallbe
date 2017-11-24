import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, } from 'ionic-angular';

import {} from 'jasmine';

import { SupportPage } from './support';
import {
  NavMock
} from '../../../test-config/mocks-ionic';

describe('Support Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SupportPage],
      imports: [
        IonicModule.forRoot(SupportPage),
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavMock },        
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportPage);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof SupportPage).toBe(true);
  });


});
