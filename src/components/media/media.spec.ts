import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, } from 'ionic-angular';

import {} from 'jasmine';

import { MediaComponent } from './media';
import {
  NavMock
} from '../../../test-config/mocks-ionic';

describe('Media Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MediaComponent],
      imports: [
        IonicModule.forRoot(MediaComponent),
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavMock },        
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof MediaComponent).toBe(true);
  });


});
