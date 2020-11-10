import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OutputpagePageRoutingModule } from './outputpage-routing.module';

import { OutputpagePage } from './outputpage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OutputpagePageRoutingModule
  ],
  declarations: [OutputpagePage]
})
export class OutputpagePageModule {}
