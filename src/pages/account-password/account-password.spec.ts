import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, } from 'ionic-angular';

import {} from 'jasmine';

import { AccountPasswordPage } from './account-password';
import { HeaderComponent } from '../../components/header/header';
import { ComponentsModule } from '../../components/components.module';

import {
  NavMock
} from '../../../test-config/mocks-ionic';

describe('AccountPassword Page', () => {
  let fixture;
  let component;
  let header;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountPasswordPage],
      imports: [
        IonicModule.forRoot(AccountPasswordPage),
        ComponentsModule,
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavMock },        
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPasswordPage);
    component = fixture.componentInstance;   
  });

  it('should be created', () => {
    expect(component instanceof AccountPasswordPage).toBe(true);
  });

});
