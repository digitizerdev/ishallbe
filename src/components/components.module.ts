import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HeaderComponent } from './header/header';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service';
import { LoginFacebookComponent } from './login-facebook/login-facebook';
import { FooterComponent } from './footer/footer';
import { PinsComponent } from './pins/pins';
import { StatementsComponent } from './statements/statements';
import { GoalsComponent } from './goals/goals';
import { UploadComponent } from './upload/upload';
import { ToolbarLogoComponent } from './toolbar-logo/toolbar-logo';
import { PostHeaderComponent } from './post-header/post-header';
import { PostFooterComponent } from './post-footer/post-footer';
import { AudioPlayerComponent } from './audio-player/audio-player';
import { PinComponent } from './pin/pin';

@NgModule({
    declarations: [
        HeaderComponent,
        TermsOfServiceComponent,
        LoginFacebookComponent,
        FooterComponent,
        PinsComponent,
        GoalsComponent,
        StatementsComponent,
        UploadComponent,
        ToolbarLogoComponent,
        PostHeaderComponent,
        PostFooterComponent,
        AudioPlayerComponent,
        PinComponent,
    ],
    imports: [
        IonicModule,
    ],
    exports: [
        HeaderComponent,
        TermsOfServiceComponent,
        LoginFacebookComponent,
        FooterComponent,
        PinsComponent,
        GoalsComponent,
        StatementsComponent,
        UploadComponent,
        ToolbarLogoComponent,
        PostHeaderComponent,
        PostFooterComponent,
        AudioPlayerComponent,
        PinComponent
    ],
    providers: [
        InAppBrowser
    ]
})
export class ComponentsModule { }
