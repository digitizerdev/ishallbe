import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MediaComponent } from './media/media';
import { HeaderComponent } from './header/header';
import { InteractionsComponent } from './interactions/interactions';
import { IonicStorageModule } from '@ionic/storage';
import { AccountLoginFacebookComponent } from './account-login-facebook/account-login-facebook';
import { AccountEmailFormComponent } from './account-email-form/account-email-form';
import { AccountForgotFormComponent } from './account-forgot-form/account-forgot-form';
import { AccountManagerComponent } from './account-manager/account-manager';
import { AccountAvatarComponent } from './account-avatar/account-avatar';
import { AccountNameFormComponent } from './account-name-form/account-name-form';
import { AccountRegisterFormComponent } from './account-register-form/account-register-form';
import { AccountLoginFormComponent } from './account-login-form/account-login-form';

@NgModule({
	declarations: [
    MediaComponent,
    HeaderComponent,
    InteractionsComponent,
    AccountLoginFacebookComponent,
    AccountEmailFormComponent,
    AccountForgotFormComponent,
    AccountManagerComponent,
    AccountAvatarComponent,
    AccountNameFormComponent,
    AccountRegisterFormComponent,
    AccountLoginFormComponent],
	imports: [
        IonicModule,
        IonicStorageModule.forRoot()
    ],
	exports: [
    MediaComponent,
    HeaderComponent,
    InteractionsComponent,
    AccountLoginFacebookComponent,
    AccountEmailFormComponent,
    AccountForgotFormComponent,
    AccountManagerComponent,
    AccountAvatarComponent,
    AccountNameFormComponent,
    AccountRegisterFormComponent,
    AccountLoginFormComponent]
})
export class ComponentsModule {}
