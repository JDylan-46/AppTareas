import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'tarea/nueva',
    loadChildren: () => import('./tarea/tarea.module').then(m => m.TareaPageModule)
  },
  {
    path: 'tarea/:id',
    loadChildren: () => import('./tarea-detalles/tarea-detalles.module').then(m => m.TareaDetallesPageModule)
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
