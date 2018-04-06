import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HeaderComponent } from './header/header';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service';
import { LoginFacebookComponent } from './login-facebook/login-facebook';
import { FooterComponent } from './footer/footer';
import { UploadComponent } from './upload/upload';
import { ToolbarLogoComponent } from './toolbar-logo/toolbar-logo';
import { PostHeaderComponent } from './post-header/post-header';
import { PostFooterComponent } from './post-footer/post-footer';
import { AudioPlayerComponent } from './audio-player/audio-player';
import { PinComponent } from './pin/pin';
import { StatementComponent } from './statement/statement';
import { GoalComponent } from './goal/goal';

@NgModule({
    declarations: [
        HeaderComponent,
        TermsOfServiceComponent,
        LoginFacebookComponent,
        FooterComponent,
        UploadComponent,
        ToolbarLogoComponent,
        PostHeaderComponent,
        PostFooterComponent,
        AudioPlayerComponent,
        PinComponent,
        StatementComponent,
    GoalComponent,
    ],
    imports: [
        IonicModule,
    ],
    exports: [
        HeaderComponent,
        TermsOfServiceComponent,
        LoginFacebookComponent,
        FooterComponent,
        UploadComponent,
        ToolbarLogoComponent,
        PostHeaderComponent,
        PostFooterComponent,
        AudioPlayerComponent,
        PinComponent,
        StatementComponent,
    GoalComponent
    ],
    providers: [
        InAppBrowser
    ]
})
export class ComponentsModule { }
