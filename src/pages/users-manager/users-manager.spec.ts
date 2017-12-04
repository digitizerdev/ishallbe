import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, } from 'ionic-angular';

import {} from 'jasmine';

import { UsersManagerPage } from './users-manager';
import { HeaderComponent } from '../../components/header/header';
import { ComponentsModule } from '../../components/components.module';

import {
  NavMock
} from '../../../test-config/mocks-ionic';

describe('UsersManager Page', () => {
  let fixture;
  let component;
  let header;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsersManagerPage],
      imports: [
        IonicModule.forRoot(UsersManagerPage),
        ComponentsModule,
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavMock },        
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersManagerPage);
    component = fixture.componentInstance;   
  });

  it('should be created', () => {
    expect(component instanceof UsersManagerPage).toBe(true);
  });

});
