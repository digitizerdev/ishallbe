import { Component, Input } from '@angular/core';

@Component({
  selector: 'post-footer',
  templateUrl: 'post-footer.html'
})
export class PostFooterComponent {
  @Input('postDoc') post;

  constructor() {
    console.log('Hello PostFooterComponent Component');
  }

  ngAfterViewInit() {
    console.log(this.post);
  }
}
