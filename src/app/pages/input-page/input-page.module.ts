import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InputPagePageRoutingModule } from './input-page-routing.module';

import { InputPagePage } from './input-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InputPagePageRoutingModule
  ],
  declarations: [InputPagePage]
})
export class InputPagePageModule {}
