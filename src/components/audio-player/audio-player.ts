import { Component, Input } from '@angular/core';

@Component({
  selector: 'audio-player',
  templateUrl: 'audio-player.html'
})
export class AudioPlayerComponent {
  @Input('postDoc') post;

  constructor() {
    console.log('Hello AudioPlayerComponent Component');
  }

}
