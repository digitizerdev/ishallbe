import { NgModule} from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { LoginPage } from './login';

import { ComponentsModule } from '../../components/components.module';


@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    ComponentsModule,
    IonicModule
  ]
})
export class LoginPageModule {}
