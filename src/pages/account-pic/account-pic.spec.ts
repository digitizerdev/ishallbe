import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, } from 'ionic-angular';

import {} from 'jasmine';

import { AccountPicPage } from './account-pic';
import {
  NavMock
} from '../../../test-config/mocks-ionic';

describe('AccountPic Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountPicPage],
      imports: [
        IonicModule.forRoot(AccountPicPage),
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavMock },        
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPicPage);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof AccountPicPage).toBe(true);
  });


});
