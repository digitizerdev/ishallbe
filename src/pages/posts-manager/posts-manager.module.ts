import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostsManagerPage } from './posts-manager';

@NgModule({
  declarations: [
    PostsManagerPage,
  ],
  imports: [
    IonicPageModule.forChild(PostsManagerPage),
  ],
})
export class PostsManagerPageModule {}
