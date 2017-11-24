import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, } from 'ionic-angular';

import {} from 'jasmine';

import { PortfolioPage } from './portfolio';
import {
  NavMock
} from '../../../test-config/mocks-ionic';

describe('Portfolio Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PortfolioPage],
      imports: [
        IonicModule.forRoot(PortfolioPage),
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavMock },        
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioPage);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof PortfolioPage).toBe(true);
  });


});
