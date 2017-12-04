import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MediaComponent } from './media/media';
import { HeaderComponent } from './header/header';
import { InteractionsComponent } from './interactions/interactions';
import { SocialFacebookComponent } from './social-facebook/social-facebook';

@NgModule({
	declarations: [
    MediaComponent,
    HeaderComponent,
    InteractionsComponent,
    SocialFacebookComponent],
	imports: [
        IonicModule
    ],
	exports: [
    MediaComponent,
    HeaderComponent,
    InteractionsComponent,
    SocialFacebookComponent]
})
export class ComponentsModule {}
