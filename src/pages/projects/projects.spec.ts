import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, } from 'ionic-angular';

import {} from 'jasmine';

import { ProjectsPage } from './projects';
import {
  NavMock
} from '../../../test-config/mocks-ionic';

describe('Projects Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectsPage],
      imports: [
        IonicModule.forRoot(ProjectsPage),
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavMock },        
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsPage);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof ProjectsPage).toBe(true);
  });


});
