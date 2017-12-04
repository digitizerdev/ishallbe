import { async, TestBed, ComponentFixture} from '@angular/core/testing';
import { IonicModule, NavController, NavParams, } from 'ionic-angular';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {} from 'jasmine';

import { HeaderComponent } from './header';
import {
  NavMock
} from '../../../test-config/mocks-ionic';

describe('Header Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        IonicModule.forRoot(HeaderComponent),
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavMock },        
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
    component = null;
  });

  it('should be created', () => {
    expect(component instanceof HeaderComponent).toBe(true);
  });

  it('should display the iconUrl image', () => {
    let de: DebugElement;
    let el: HTMLElement;
    de = fixture.debugElement.query(By.css('img'));
    el = de.nativeElement.src;
    expect(el).toContain('/assets/img/icon.png');
  });

 });
