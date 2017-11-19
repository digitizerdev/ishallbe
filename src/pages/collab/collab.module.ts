import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CollabPage } from './collab';

@NgModule({
  declarations: [
    CollabPage,
  ],
  imports: [
    IonicPageModule.forChild(CollabPage),
  ],
})
export class CollabPageModule {}
