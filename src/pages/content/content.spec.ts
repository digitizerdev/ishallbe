import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, } from 'ionic-angular';

import {} from 'jasmine';

import { ContentPage } from './content';
import {
  NavMock
} from '../../../test-config/mocks-ionic';

describe('Content Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContentPage],
      imports: [
        IonicModule.forRoot(ContentPage),
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavMock },        
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentPage);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof ContentPage).toBe(true);
  });


});
