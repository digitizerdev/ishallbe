import { Component } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';

import { SessionProvider } from '../../providers/session/session';


@Component({
  selector: 'media',
  templateUrl: 'media.html'
})
export class MediaComponent {

  user: any;

  constructor(
    public session: SessionProvider
  ) {
    this.user = this.session.retrieveUser();
  }

}
