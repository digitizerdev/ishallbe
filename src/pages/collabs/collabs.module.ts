import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CollabsPage } from './collabs';

@NgModule({
  declarations: [
    CollabsPage,
  ],
  imports: [
    IonicPageModule.forChild(CollabsPage),
  ],
})
export class CollabsPageModule {}
