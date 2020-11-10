import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OutputpagePage } from './outputpage.page';

const routes: Routes = [
  {
    path: '',
    component: OutputpagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OutputpagePageRoutingModule {}
