import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, } from 'ionic-angular';

import {} from 'jasmine';

import { ProfileManagerPage } from './profile-manager';

import {
  NavMock
} from '../../../test-config/mocks-ionic';

describe('ProfileManager Page', () => {
  let fixture;
  let component;
  let header;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileManagerPage],
      imports: [
        IonicModule.forRoot(ProfileManagerPage),
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavMock },        
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileManagerPage);
    component = fixture.componentInstance;   
  });

  it('should be created', () => {
    expect(component instanceof ProfileManagerPage).toBe(true);
  });

});
