import { NgModule } from '@angular/core';
import { EmailComponent } from './email/email';
import { FacebookComponent } from './facebook/facebook';
import { LinkedinComponent } from './linkedin/linkedin';
import { AccountComponent } from './account/account';
import { ProfileComponent } from './profile/profile';
import { ContentComponent } from './content/content';
import { PhotoComponent } from './photo/photo';
import { StorageComponent } from './storage/storage';
import { PostComponent } from './post/post';
@NgModule({
	declarations: [EmailComponent,
    FacebookComponent,
    LinkedinComponent,
    AccountComponent,
    ProfileComponent,
    ContentComponent,
    PhotoComponent,
    StorageComponent,
    PostComponent],
	imports: [],
	exports: [EmailComponent,
    FacebookComponent,
    LinkedinComponent,
    AccountComponent,
    ProfileComponent,
    ContentComponent,
    PhotoComponent,
    StorageComponent,
    PostComponent]
})
export class ComponentsModule {}
