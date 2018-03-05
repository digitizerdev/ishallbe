import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';

import { LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Media, MediaObject } from '@ionic-native/media';

import { Observable } from 'rxjs/Observable';

import firebase from 'firebase';
import { FirebaseProvider } from '../../providers/firebase/firebase';

import Cropper from 'cropperjs';
import moment from 'moment';

@Component({
  selector: 'upload',
  templateUrl: 'upload.html'
})
export class UploadComponent {
  @ViewChild('imageSrc') imageElement: ElementRef;

  @Input('method') contentType;
  @Output() uploaded = new EventEmitter();
  sourceType: any;
  cameraOptions: any;
  cropperInstance: any;
  image: any;
  audio: any;
  contentBlob: any;
  duration: any;
  gettingPicture = false;
  recording = false;
  audioReady = false;
  playbackPaused = false;
  playingAudio = false;

  constructor(
    private loadingCtrl: LoadingController,
    private camera: Camera,
    private file: File,
    private media: Media,
    private firebase: FirebaseProvider
  ) {
    console.log("Hello Upload Component");
  }

  ngOnInit() {
    console.log("Content type is " + this.contentType);
    if (this.contentType == "audio") this.startRecording();
    else this.getPicture();
  }

  getPicture() {
    this.gettingPicture = true;
    if (this.contentType == "camera") this.sourceType = this.camera.PictureSourceType.CAMERA;
    if (this.contentType == "library") this.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
    this.camera.getPicture(this.getCameraOptions()).then((image) => {
      this.imageElement.nativeElement.src = image;
      this.cropImage();
    });
  }

  getCameraOptions() {
    let cameraOpts: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.sourceType,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: false,
      correctOrientation: true
    }
    return cameraOpts;
  }

  cropImage() {
    this.cropperInstance = new Cropper(this.imageElement.nativeElement, {
      aspectRatio: 3 / 3,
      dragMode: 'move',
      modal: true,
      guides: true,
      highlight: false,
      background: false,
      autoCrop: true,
      autoCropArea: 0.9,
      responsive: true,
      zoomable: true,
      movable: false
    });
  }

  upload() {
    let loading = this.loadingCtrl.create({ content: 'Please Wait..' });
    loading.present();
    this.image = this.cropperInstance.getCroppedCanvas({ width: 1000, height: 1000 }).toDataURL('image/jpeg');
    let uploadPath = 'content/' + this.firebase.user.uid + '/images/profile/';
    console.log("Upload path is " + uploadPath);
    this.store(uploadPath, this.image).subscribe((snapshot) => {
      console.log("Finished storing media");
      console.log(snapshot);
      let content = snapshot.downloadURL;
      this.uploaded.emit(content);
      loading.dismiss();
    });
  }

  store(path, obj) {
    return Observable.create((observer) => {
      let storagePath = firebase.storage().ref(path);
      return storagePath.putString(obj, 'data_url', { contentType: 'image/jpeg' }).
        then(function (snapshot) {
          observer.next(snapshot);
        }).catch((error: any) => {
          observer.next(error);
        });
    });
  }

  startRecording() {
    console.log("Started Recording");
    this.recording = true;
    this.file.createFile(this.file.tempDirectory, 'my_file.m4a', true).then(() => {
      const audio:  MediaObject = this.media.create(this.file.tempDirectory.replace(/^file:\/\//, '') + 'my_file.m4a');
      console.log("Audio assigned to constant audio media object");
      console.log(audio);
      this.audio = audio;
      console.log("Audio assigned to this.audio media object");
      console.log(this.audio);
      audio.startRecord();
      window.setTimeout(() => {
        if (this.recording) this.stopRecording();
      }, 10000);
    });
  }

  stopRecording() {
      this.audio.stopRecord();
      console.log("Stopped Recording");
      this.recording = false;
      this.audioReady = true;
      this.duration = this.audio.getDuration();
      console.log("Audio Duration: " + this.duration);
  }

  playAudio() {
    console.log("Playing Audio");
    this.playingAudio = true;
    this.audio.play();
    this.transitionAudio();
  }

  transitionAudio() {
    let audioDuration = this.duration * 1000;
    window.setTimeout(() => {
      if (this.playingAudio) this.stopPlayback();
    }, audioDuration);
  }

  stopPlayback() {
    console.log("Stopping Playback");
    this.playingAudio = false;
    this.audio.stop();
  }

  uploadBlob() {
    console.log("Upload blob triggered");
    return Observable.create((observer) => {
      let contentPath = this.cropperInstance.getCroppedCanvas({ width: 1000, height: 1000 }).to
      console.log("Got cropped image");
      console.log(contentPath);
      const readFile: any = window['resolveLocalFileSystemURL'];
        readFile(contentPath, (fileEntry) => {
            fileEntry.file((file) => {
                const fileReader = new FileReader();
                fileReader.onloadend = (result: any) => {
                    let arrayBuffer = result.target.result;
                    let blob = new Blob([new Uint8Array(arrayBuffer)], { type: 'image/jpeg' });
                    let uploadPath = 'content/' + this.firebase.user.uid + '/images/profile/';
                    var storageRef = firebase.storage().ref(uploadPath);
                    var uploadTask = storageRef.put(blob);
                    this.contentBlob = blob;
                    console.log('Upload started:');
                    uploadTask.on('state_changed', (snapshot) => {
                        let percent = uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes * 100;
                        console.log(percent + "% done");
                    }, (e) => {
                        console.debug(e);
                        console.debug('profileImageStorage:end');
                        observer.error(e);
                    }, () => {
                        var downloadURL = uploadTask.snapshot.downloadURL;
                        console.info('Profile pic URL:' + downloadURL);
                        console.info('Profile pic URI:' + contentPath);
                        console.debug('profileImageStorage:end');
                        observer.next(downloadURL);
                    });
                };
                fileReader.onerror = (e: any) => {
                    observer.error(e);
                };
                fileReader.readAsArrayBuffer(file);
            }, (e) => { console.debug(e); observer.error(e); });
        }, (e) => { console.debug(e); observer.error(e); });
    });
  }
}

