import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GuidebookDetailsModalPage } from './guidebook-details-modal';

@NgModule({
  declarations: [
    GuidebookDetailsModalPage,
  ],
  imports: [
    IonicPageModule.forChild(GuidebookDetailsModalPage),
  ],
})
export class GuidebookDetailsModalPageModule {}
