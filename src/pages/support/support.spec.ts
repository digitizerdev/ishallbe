import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, } from 'ionic-angular';

import { SupportPage } from './support';

import {
  NavMock
} from '../../../test-config/mocks-ionic';

import {} from 'jasmine';


describe('Support Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SupportPage],
      imports: [
        IonicModule.forRoot(SupportPage),
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavMock },        
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportPage);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof SupportPage).toBe(true);
  });


  it('should initialize with submitted false', () => {
    expect(component.submitted).toBe(false);
  });

  it('should populate email with subject and message on submission', () => {
    expect(component.email.subject).toBe(undefined);
    expect(component.email.message).toBe(undefined); 
    component.logForm('My Subject', 'My Message');;
    fixture.detectChanges();
    expect(component.email.subject).toBe('My Subject');
    expect(component.email.message).toBe('My Message');
  }); 

});
