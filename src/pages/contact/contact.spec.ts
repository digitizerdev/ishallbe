import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, } from 'ionic-angular';

import {} from 'jasmine';

import { ContactPage } from './contact';
import {
  NavMock
} from '../../../test-config/mocks-ionic';

describe('Contact Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactPage],
      imports: [
        IonicModule.forRoot(ContactPage),
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavMock },        
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactPage);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof ContactPage).toBe(true);
  });


});
