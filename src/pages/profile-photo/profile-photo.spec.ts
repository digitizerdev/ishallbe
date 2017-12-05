import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, } from 'ionic-angular';

import {} from 'jasmine';

import { ProfilePhotoPage } from './profile-photo';


import {
  NavMock
} from '../../../test-config/mocks-ionic';

describe('ProfilePhoto Page', () => {
  let fixture;
  let component;
  let header;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilePhotoPage],
      imports: [
        IonicModule.forRoot(ProfilePhotoPage),
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavMock },        
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePhotoPage);
    component = fixture.componentInstance;   
  });

  it('should be created', () => {
    expect(component instanceof ProfilePhotoPage).toBe(true);
  });

});
