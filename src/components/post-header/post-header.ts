import { Component, Input } from '@angular/core';

@Component({
  selector: 'post-header',
  templateUrl: 'post-header.html'
})
export class PostHeaderComponent {
  @Input('postDoc') post;

  constructor() {}
}
