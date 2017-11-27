import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, } from 'ionic-angular';

import {} from 'jasmine';

import { CollaboratePage } from './collaborate';
import {
  NavMock
} from '../../../test-config/mocks-ionic';

describe('Collaborate Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CollaboratePage],
      imports: [
        IonicModule.forRoot(CollaboratePage),
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavMock },        
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratePage);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof CollaboratePage).toBe(true);
  });


});
