import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupDoneModalPage } from './signup-done-modal';

@NgModule({
  declarations: [
    SignupDoneModalPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupDoneModalPage),
  ],
})
export class SignupDoneModalPageModule {}
