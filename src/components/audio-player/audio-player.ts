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

  audio: any;
  playingAudio = false;

  constructor(
    private platform: Platform,
    private fileTransfer: FileTransfer,
    private media: Media
  ) { }

  loadAudio() {
    this.audio.release();
    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    if (this.platform.is('ios')) var filepath = (cordova.file.externalDataDirectory || cordova.file.dataDirectory) + this.post.filename;
    if (this.platform.is('android')) filepath = cordova.file.externalDataDirectory + this.post.filename;
    fileTransfer.download(this.post.url, filepath, ).then((entry) => {
      let rawAudioURI = entry.toURL();
      if (this.platform.is('ios')) rawAudioURI = rawAudioURI.replace(/^file:\/\//, '/private');
      let downloadedAudio: MediaObject = this.media.create(rawAudioURI);
      this.audio = downloadedAudio;
      this.playAudio();
    });
  }

  playAudio() {
    this.audio.play();
    this.playingAudio = true;
    this.listenToAudioEvents();
  }

  pauseAudio() {
    this.audio.pause();
    this.playingAudio = false;
  }

  stopPlayback() {
    this.audio.stop();
    this.playingAudio = false;
  }

  listenToAudioEvents() {
    this.audio.onStatusUpdate.subscribe(status => {
      if (status == 4 && this.playingAudio) {
        this.stopPlayback();
      }
    });
  }
}
