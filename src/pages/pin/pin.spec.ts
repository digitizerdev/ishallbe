import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, } from 'ionic-angular';

import {} from 'jasmine';

import { PinPage } from './pin';
import { HeaderComponent } from '../../components/header/header';
import { ComponentsModule } from '../../components/components.module';

import {
  NavMock
} from '../../../test-config/mocks-ionic';

describe('Pin Page', () => {
  let fixture;
  let component;
  let header;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PinPage],
      imports: [
        IonicModule.forRoot(PinPage),
        ComponentsModule,
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavMock },        
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinPage);
    component = fixture.componentInstance;   
  });

  it('should be created', () => {
    expect(component instanceof PinPage).toBe(true);
  });

});
