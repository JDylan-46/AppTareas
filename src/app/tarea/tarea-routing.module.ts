import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TareaPage } from './tarea.page';

const routes: Routes = [{ path: '', component: TareaPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TareaPageRoutingModule {}
