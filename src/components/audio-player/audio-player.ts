import { Component, Input } from '@angular/core';

import { Platform } from 'ionic-angular';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { Media, MediaObject } from '@ionic-native/media';

declare var cordova: any;

@Component({
  selector: 'audio-player',
  templateUrl: 'audio-player.html'
})
export class AudioPlayerComponent {
  @Input('postDoc') post;

  constructor(    
    private platform: Platform,
    private fileTransfer: FileTransfer,
    private media: Media
  ) {
    console.log('Hello AudioPlayerComponent Component');
  }

  playAudio() {
    console.log("Playing Audio");
    console.log(this.post);
    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    if (this.platform.is('ios')) var filepath = (cordova.file.externalDataDirectory || cordova.file.dataDirectory) + this.post.filename;
    if (this.platform.is('android')) filepath = cordova.file.externalDataDirectory + this.post.filename;    
    fileTransfer.download(this.post.url, filepath, ).then((entry) => {
      let rawAudioURI = entry.toURL();
      if (this.platform.is('ios')) rawAudioURI = rawAudioURI.replace(/^file:\/\//, '/private');
      console.log("Raw Audio URI is " + rawAudioURI);
      let downloadedAudio: MediaObject = this.media.create(rawAudioURI);
      downloadedAudio.play();
    }, (error) => {
    });
  }
}
