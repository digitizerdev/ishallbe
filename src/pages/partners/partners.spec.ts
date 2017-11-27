import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, } from 'ionic-angular';

import {} from 'jasmine';

import { PartnersPage } from './partners';
import {
  NavMock
} from '../../../test-config/mocks-ionic';

describe('Partners Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PartnersPage],
      imports: [
        IonicModule.forRoot(PartnersPage),
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavMock },        
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnersPage);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof PartnersPage).toBe(true);
  });


});
