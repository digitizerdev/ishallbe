import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, } from 'ionic-angular';

import {} from 'jasmine';

import { HeaderComponent } from './header';
import {
  NavMock
} from '../../../test-config/mocks-ionic';

describe('Header Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        IonicModule.forRoot(HeaderComponent),
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavMock },        
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof HeaderComponent).toBe(true);
  });
 });
