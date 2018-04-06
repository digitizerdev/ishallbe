import { Component, ViewChild } from '@angular/core';

import { IonicPage, MenuController, NavController, Slides } from 'ionic-angular';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})
export class TutorialPage {
  showSkip = true;

	@ViewChild('slides') slides: Slides;

  constructor(
    private firebase: FirebaseProvider
  ) {
  }

  startIshallbe() {
    this.firebase.signupUser();
  }

  onSlideChangeStart(slider: Slides) {
    this.showSkip = !slider.isEnd();
  }

	ionViewWillEnter() {
		this.slides.update();
	}
}
