import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, } from 'ionic-angular';

import {} from 'jasmine';

import { ExplorePage } from './explore';
import {
  NavMock
} from '../../../test-config/mocks-ionic';

describe('Explore Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExplorePage],
      imports: [
        IonicModule.forRoot(ExplorePage),
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavMock },        
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplorePage);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof ExplorePage).toBe(true);
  });


});
