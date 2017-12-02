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

describe('Home Component', () => {
  let fixture;
  let component;
  let header;
  let headerComp;
  let pins;
  let pinsComp;
  let posts;
  let postsComp;

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
    header = TestBed.createComponent(HeaderComponent);
    headerComp = header.componentInstance;
    pins = TestBed.createComponent(PinsComponent);
    pinsComp = pins.componentInstance;
    posts = TestBed.createComponent(PostsComponent);
    postsComp = posts.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof HomePage).toBe(true);
  });

  it('should have header component', () => {
    expect(headerComp instanceof HeaderComponent).toBe(true);
  });

  it('should have pins component', () => {
    expect(pinsComp instanceof PinsComponent).toBe(true);
  })

  it('should have posts component', () => {
    expect(postsComp instanceof PostsComponent).toBe(true);
  })
});
