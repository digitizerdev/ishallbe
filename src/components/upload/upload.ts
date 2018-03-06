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
      this.audio.startRecord();
      this.listenToAudioEvents();
      window.setTimeout(() => {
        if (this.recording) this.stopRecording();
      }, 10000);
    });
  }

  listenToAudioEvents() {
    this.audio.onStatusUpdate.subscribe(status => {
      console.log("Status of this.audio updated");
      console.log(status);
      if (status == 4 && this.playingAudio) {
        console.log("Time to stop playback")
        this.stopPlayback();
      }
    });
  }

  stopRecording() {
      this.audio.stopRecord();
      console.log("Stopped Recording");
      console.log(this.audio);
      this.recording = false;
      this.audioReady = true;
      this.audio.getDuration();
      console.log("Audio Duration: " + this.duration);
      console.log("Audio Duration Property: " + this.audio.duration);
  }

  playAudio() {
    console.log("Playing Audio");
    this.playingAudio = true;
    this.audio.play();
  }

  stopPlayback() {
    console.log("Stopping Playback");
    this.playingAudio = false;
    this.audio.stop();
  }

  saveRecord() {
    console.log("Saving Record");
    const metadata = { contentType: 'audio/mp3' };
    const fileName = {name: `${this.file.tempDirectory}/my_file.mp3`};
    console.log("File path is " + fileName.name);
    var blob = new Blob([fileName.name], {type: 'audio/mp3'});
    let uploadPath = 'content/' + this.firebase.user.uid + '/audio/';
    console.log("Upload path is " + uploadPath);
    let userAudioStorage = firebase.storage().ref(uploadPath);
    let audio = userAudioStorage.put(blob, metadata);
    audio.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => { console.log(snapshot);
      }, (error) => { console.dir(error);
      }, () => {
        var downloadURL = audio.snapshot.downloadURL;
        console.dir(downloadURL);
        return new Promise((resolve, reject) => {
          resolve(downloadURL);
        });
      });
  }
  
  saveRecord1() {
    console.log("Saving record");
    let storageRef = firebase.storage().ref();
    let metadata = {
      contentType: 'audio/mp3',
    };
    this.file.readAsDataURL(this.audio, "test").then((file) => {
      let voiceRef = storageRef.child('content/' + this.firebase.user.uid + '/audio/').putString(file, firebase.storage.StringFormat.DATA_URL);
      voiceRef.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
        console.log("uploading");
        console.log(snapshot);
      }, (e) => {
        console.log("Audio Upload Error")
        console.log(JSON.stringify(e, null, 2));
      }, () => {
        var downloadURL = voiceRef.snapshot.downloadURL;
      });
    });
  }

  saveRecord2() {
    console.log("Saving record");
    console.dir(this.file.tempDirectory);
    const fileName = {name: `${this.file.tempDirectory}/${this.firebase.user.uid}.mp3`};
    console.log("File name is " + fileName.name);
    const metadata = {
      contentType: 'audio/mp3',
    };
    var blob = new Blob([fileName.name], {type: 'audio/mp3'});
    console.log("Blob");
    console.log(blob);
    const uploadAudio = this.audio.child(`${this.firebase.user.uid}/${fileName.name}`)
    .put(blob, metadata);
    // Listen for state changes, errors, and completion of the upload.
    return uploadAudio.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      (snapshot) => {
        console.log("Snapshot");
        console.log(snapshot);
      }, (error) => {
        console.error(error);
      }, () => {
        // Upload completed successfully, now we can get the download URL
        var downloadURL = uploadAudio.snapshot.downloadURL;
        console.log("Got download url");
        console.dir(downloadURL);
        return new Promise((resolve, reject) => {
          resolve(downloadURL);
        });
      });

  }
}