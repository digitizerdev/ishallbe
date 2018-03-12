import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostManagerPage } from './post-manager';

@NgModule({
  declarations: [
    PostManagerPage,
  ],
  imports: [
    IonicPageModule.forChild(PostManagerPage),
  ],
})
export class PostManagerPageModule {}
