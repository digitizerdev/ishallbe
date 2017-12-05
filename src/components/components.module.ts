import { NgModule } from '@angular/core';
import { LoginFormComponent } from './login-form/login-form';
import { LoginFacebookComponent } from './login-facebook/login-facebook';
import { ResetPasswordFormComponent } from './reset-password-form/reset-password-form';
import { RegisterFormComponent } from './register-form/register-form';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service';
import { ProfileAvatarComponent } from './profile-avatar/profile-avatar';
import { ProfilePostsComponent } from './profile-posts/profile-posts';
import { ProfileManagerComponent } from './profile-manager/profile-manager';
import { CreateStatementFormComponent } from './create-statement-form/create-statement-form';
import { AccountEmailFormComponent } from './account-email-form/account-email-form';
import { AccountPasswordFormComponent } from './account-password-form/account-password-form';
import { SupportFormComponent } from './support-form/support-form';
import { UserManagerComponent } from './user-manager/user-manager';
import { PostManagerComponent } from './post-manager/post-manager';
import { PinManagerComponent } from './pin-manager/pin-manager';
import { SearchComponent } from './search/search';
import { HeaderComponent } from './header/header';
import { PostComponent } from './post/post';
import { PostsComponent } from './posts/posts';
import { PinComponent } from './pin/pin';
import { PinsComponent } from './pins/pins';
import { InteractionsComponent } from './interactions/interactions';
import { MediaComponent } from './media/media';

@NgModule({
    declarations: [LoginFormComponent,
        LoginFacebookComponent,
        ResetPasswordFormComponent,
        RegisterFormComponent,
        TermsOfServiceComponent,
        ProfileAvatarComponent,
        ProfilePostsComponent,
        ProfileManagerComponent,
        CreateStatementFormComponent,
        AccountEmailFormComponent,
        AccountPasswordFormComponent,
        SupportFormComponent,
        UserManagerComponent,
        PostManagerComponent,
        PinManagerComponent,
        SearchComponent,
        HeaderComponent,
        PostComponent,
        PostsComponent,
        PinComponent,
        PinsComponent,
        InteractionsComponent,
        MediaComponent],
    imports: [],
    exports: [LoginFormComponent,
        LoginFacebookComponent,
        ResetPasswordFormComponent,
        RegisterFormComponent,
        TermsOfServiceComponent,
        ProfileAvatarComponent,
        ProfilePostsComponent,
        ProfileManagerComponent,
        CreateStatementFormComponent,
        AccountEmailFormComponent,
        AccountPasswordFormComponent,
        SupportFormComponent,
        UserManagerComponent,
        PostManagerComponent,
        PinManagerComponent,
        SearchComponent,
        HeaderComponent,
        PostComponent,
        PostsComponent,
        PinComponent,
        PinsComponent,
        InteractionsComponent,
        MediaComponent]
})
export class ComponentsModule { }
