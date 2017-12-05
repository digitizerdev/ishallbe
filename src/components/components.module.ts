import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MediaComponent } from './media/media';
import { HeaderComponent } from './header/header';
import { InteractionsComponent } from './interactions/interactions';
import { SocialFacebookComponent } from './social-facebook/social-facebook';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
	declarations: [
    MediaComponent,
    HeaderComponent,
    InteractionsComponent,
    SocialFacebookComponent],
	imports: [
        IonicModule,
        IonicStorageModule.forRoot()
    ],
	exports: [
    MediaComponent,
    HeaderComponent,
    InteractionsComponent,
    SocialFacebookComponent]
})
export class ComponentsModule {}
