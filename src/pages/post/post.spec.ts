import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, } from 'ionic-angular';

import {} from 'jasmine';

import { PostPage } from './post';

import {
  NavMock
} from '../../../test-config/mocks-ionic';

describe('Post Page', () => {
  let fixture;
  let component;
  let header;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostPage],
      imports: [
        IonicModule.forRoot(PostPage),
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavMock },        
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostPage);
    component = fixture.componentInstance;   
  });

  it('should be created', () => {
    expect(component instanceof PostPage).toBe(true);
  });

});
