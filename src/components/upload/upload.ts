import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';

import { LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

import { Observable } from 'rxjs/Observable';

import firebase from 'firebase';
import { FirebaseProvider } from '../../providers/firebase/firebase';

import Cropper from 'cropperjs';
import moment from 'moment';
declare var cordova: any;

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
  audioURL: any;
  audioURI: any;
  contentBlob: any;
  duration: any;
  gettingPicture = false;
  recording = false;
  audioReady = false;
  playbackPaused = false;
  playingAudio = false;
  audioURLReady = false;
  audioURIReady = false;

  constructor(
    private loadingCtrl: LoadingController,
    private camera: Camera,
    private media: Media,
    private file: File,
    private fileTransfer: FileTransfer,
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
      const audio: MediaObject = this.media.create(this.file.tempDirectory.replace(/^file:\/\//, '') + 'my_file.m4a');
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

  uploadAudio() {
    console.log("Uploading record");
    this.storeRecord().subscribe((downloadURL) => {
      console.log("Finished storing record");
      console.log("Download URL is " + downloadURL);
      this.audioURL = downloadURL;
      this.audioURLReady = true;
    });
  }

  storeRecord() {
    return Observable.create((observer) => {
      console.log('Saving record');
      const filePath = `${this.file.tempDirectory}my_file.m4a`;
      console.log("Path to record is " + filePath);
      const readFile: any = window['resolveLocalFileSystemURL'];
      return readFile(filePath, (fileEntry) => {
        return fileEntry.file((file) => {
          const fileReader = new FileReader();
          fileReader.onloadend = (result: any) => {
            let arrayBuffer = result.target.result;
            let blob = new Blob([new Uint8Array(arrayBuffer)], { type: 'audio/m4a' });
            console.log("Blob is ");
            console.log(blob);
            var storageRef = firebase.storage().ref('content/' + this.firebase.user.uid + '/my-file.m4a');
            console.log("Storage reference is " + storageRef);
            var uploadTask = storageRef.put(blob);
            console.log('Upload started:');
            uploadTask.on('state_changed', (snapshot) => {
              console.log("state changed");
              let percent = uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes * 100;
              console.log(percent + "% done");
            }, (e) => {
              console.error(e);
              observer.error(e);
            }, () => {
              var downloadURL = uploadTask.snapshot.downloadURL;
              console.log('Storage Download URL:' + downloadURL);
              observer.next(downloadURL);
            });
          };
          fileReader.onerror = (e: any) => {
            console.error(e);
            observer.error(e);
          };
          fileReader.readAsArrayBuffer(file);
        }, (e) => {
          console.error(e);
          observer.error(e);
        });
      }, (e) => {
        console.error(e);
        observer.error(e);
      });
    });
  }

  downloadAudio() {
    console.log("Downloading Audio")
    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    var destPath = (cordova.file.externalDataDirectory || cordova.file.dataDirectory) + "my_file.m4a"
    fileTransfer.download(this.audioURL, destPath, ).then((entry) => {
      let rawAudioURI = entry.toURL();
      this.audioURI = rawAudioURI.replace(/^file:\/\//, '/private');
      this.audioURIReady = true;
      console.log("Audio URI: " + this.audioURI);
    }, (error) => {
      console.error(error);
    });
  }

  playAudioURI() {
    console.log("Playing AudioURI");
    let downloadedAudio: MediaObject = this.media.create(this.audioURI);
    console.log("Downloaded audio: " + downloadedAudio);
    downloadedAudio.play();
  }
}