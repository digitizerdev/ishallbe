import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, } from 'ionic-angular';

import {} from 'jasmine';

import { HomePage } from './home';
import { HeaderComponent } from '../../components/header/header';

import {
  NavMock
} from '../../../test-config/mocks-ionic';

describe('Home Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [
        IonicModule.forRoot(HomePage),
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavMock },        
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof HomePage).toBe(true);
  });

  it('should contain header component', () => {
    expect(component instanceof HeaderComponent )
  }); 

});
