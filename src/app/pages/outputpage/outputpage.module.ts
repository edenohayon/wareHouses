import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OutputpagePageRoutingModule } from './outputpage-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { OutputpagePage } from './outputpage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OutputpagePageRoutingModule,
    NgxDatatableModule
  ],
  declarations: [OutputpagePage]
})
export class OutputpagePageModule {}
