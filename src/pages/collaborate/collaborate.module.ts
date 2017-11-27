import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CollaboratePage } from './collaborate';

@NgModule({
  declarations: [
    CollaboratePage,
  ],
  imports: [
    IonicPageModule.forChild(CollaboratePage),
  ],
})
export class CollaboratePageModule {}
