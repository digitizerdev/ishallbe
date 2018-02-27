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
    UploadComponent
    ],
    providers: [
        InAppBrowser
    ]
})
export class ComponentsModule { }
