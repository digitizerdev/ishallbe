import { NgModule } from '@angular/core';
import { FacebookComponent } from './facebook/facebook';
import { LinkedinComponent } from './linkedin/linkedin';
import { ContentComponent } from './content/content';
import { PostComponent } from './post/post';
import { MediaComponent } from './media/media';
@NgModule({
	declarations: [
    FacebookComponent,
    LinkedinComponent,
    ContentComponent,
    PostComponent,
    MediaComponent],
	imports: [],
	exports: [
    FacebookComponent,
    LinkedinComponent,
    ContentComponent,
    PostComponent,
    MediaComponent]
})
export class ComponentsModule {}
