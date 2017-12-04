import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, } from 'ionic-angular';

import {} from 'jasmine';

import { PinManagerPage } from './pin-manager';
import { HeaderComponent } from '../../components/header/header';
import { ComponentsModule } from '../../components/components.module';

import {
  NavMock
} from '../../../test-config/mocks-ionic';

describe('PinManager Page', () => {
  let fixture;
  let component;
  let header;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PinManagerPage],
      imports: [
        IonicModule.forRoot(PinManagerPage),
        ComponentsModule,
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavMock },        
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinManagerPage);
    component = fixture.componentInstance;   
  });

  it('should be created', () => {
    expect(component instanceof PinManagerPage).toBe(true);
  });

});
