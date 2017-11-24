import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Platform } from 'ionic-angular';

import {} from 'jasmine';

import { TabsPage } from './tabs';
import {
  PlatformMock,

} from '../../../test-config/mocks-ionic';

describe('Tabs Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabsPage],
      imports: [
        IonicModule.forRoot(TabsPage)
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsPage);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof TabsPage).toBe(true);
  });


});
