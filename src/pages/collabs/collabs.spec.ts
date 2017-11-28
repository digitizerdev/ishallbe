import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, } from 'ionic-angular';

import {} from 'jasmine';

import { CollabsPage } from './collabs';
import {
  NavMock
} from '../../../test-config/mocks-ionic';

describe('Collabs Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CollabsPage],
      imports: [
        IonicModule.forRoot(CollabsPage),
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavMock },        
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollabsPage);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof CollabsPage).toBe(true);
  });


});
