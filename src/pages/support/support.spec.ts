import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, } from 'ionic-angular';

import { SupportPage } from './support';

import {
  NavMock
} from '../../../test-config/mocks-ionic';

import {} from 'jasmine';


describe('Support Page', () => {
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

  it('should populate email with correct details on submission', () => {
    expect(component.form.subject).toBe(null);
    expect(component.form.message).toBe(null); 
    component.form.subject = 'My Subject';
    component.form.message = 'My Message';
    component.logForm();
    fixture.detectChanges();
    expect(component.email.to).toBe('ishallbe17@gmail.com')
    expect(component.email.subject).toBe('My Subject');
    expect(component.email.body).toBe('My Message');
    expect(component.email.isHtml).toBe(true);
  }); 

});
