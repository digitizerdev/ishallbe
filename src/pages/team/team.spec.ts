import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, } from 'ionic-angular';

import {} from 'jasmine';

import { TeamPage } from './team';
import {
  NavMock
} from '../../../test-config/mocks-ionic';

describe('Team Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamPage],
      imports: [
        IonicModule.forRoot(TeamPage),
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavMock },        
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamPage);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof TeamPage).toBe(true);
  });


});
