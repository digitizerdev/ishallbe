import { Component, Input } from '@angular/core';

@Component({
  selector: 'pin',
  templateUrl: 'pin.html'
})
export class PinComponent {
  @Input('post') pin;

  constructor() { }

  ngAfterViewInit() {
    console.log("Pin initialized");
    console.log(this.pin);
  }

}
