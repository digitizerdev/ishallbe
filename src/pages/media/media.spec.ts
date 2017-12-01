import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, } from 'ionic-angular';

import {} from 'jasmine';

import { MediaPage } from './media';
import {
  NavMock
} from '../../../test-config/mocks-ionic';

describe('Media Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MediaPage],
      imports: [
        IonicModule.forRoot(MediaPage),
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavMock },        
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaPage);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof MediaPage).toBe(true);
  });


});
