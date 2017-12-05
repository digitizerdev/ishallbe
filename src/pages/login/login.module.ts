import { NgModule} from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { LoginPage } from './login';

import { ComponentsModule } from '../../components/components.module';
import { IonicStorageModule } from '@ionic/storage';


@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    IonicStorageModule,
    ComponentsModule,
    IonicModule
  ]
})
export class LoginPageModule {}
