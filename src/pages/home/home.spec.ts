import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, } from 'ionic-angular';

import {} from 'jasmine';

import { HomePage } from './home';
import { HeaderComponent } from '../../components/header/header';
import { PinsComponent } from '../../components/pins/pins';
import { PostsComponent } from '../../components/posts/posts';
import { ComponentsModule } from '../../components/components.module';

import {
  NavMock
} from '../../../test-config/mocks-ionic';

describe('Home Page', () => {
  let fixture;
  let component;
  let header;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [
        IonicModule.forRoot(HomePage),
        ComponentsModule,
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

});
