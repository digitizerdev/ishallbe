import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, } from 'ionic-angular';

import {} from 'jasmine';

import { FacebookComponent } from './facebook';
import {
  NavMock
} from '../../../test-config/mocks-ionic';

describe('Facebook Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FacebookComponent],
      imports: [
        IonicModule.forRoot(FacebookComponent),
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavMock },        
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacebookComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof FacebookComponent).toBe(true);
  });


});
