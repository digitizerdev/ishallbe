import { Injectable } from '@angular/core';

import { Notification } from '../../../test-data/notifications/model';


@Injectable()
export class NotificationProvider {

  constructor() {
    console.log('Hello NotificationProvider Provider');
  }

}
