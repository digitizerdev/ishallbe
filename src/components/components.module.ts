import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { HeaderComponent } from './header/header';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service';
import { LoginFormComponent } from './login-form/login-form';
import { ResetPasswordFormComponent } from './reset-password-form/reset-password-form';
import { RegisterFormComponent } from './register-form/register-form';
import { AccountEmailFormComponent } from './account-email-form/account-email-form';
import { AccountPasswordFormComponent } from './account-password-form/account-password-form';
import { SupportFormComponent } from './support-form/support-form';
import { LoginFacebookComponent } from './login-facebook/login-facebook';

@NgModule({
    declarations: [
        LoginFormComponent,
        HeaderComponent,
        TermsOfServiceComponent,
        ResetPasswordFormComponent,
        RegisterFormComponent,
        AccountEmailFormComponent,
        AccountPasswordFormComponent,
        SupportFormComponent,
        LoginFacebookComponent
    ],
    imports: [
        IonicModule,
        IonicStorageModule.forRoot(),
    ],
    exports: [
        LoginFormComponent,
        HeaderComponent,
        TermsOfServiceComponent,
        ResetPasswordFormComponent,
        RegisterFormComponent,
        AccountEmailFormComponent,
        AccountPasswordFormComponent,
        SupportFormComponent,
        LoginFacebookComponent
    ]
})
export class ComponentsModule { }
