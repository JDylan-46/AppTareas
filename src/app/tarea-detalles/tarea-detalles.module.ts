import { IonicModule } from '@ionic/angular/lazy';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TareaDetallesPageRoutingModule } from './tarea-detalles-routing.module';
import { TareaDetallesPage } from './tarea-detalles.page';

@NgModule({
  imports: [IonicModule, CommonModule, ReactiveFormsModule, TareaDetallesPageRoutingModule],
  declarations: [TareaDetallesPage]
})
export class TareaDetallesPageModule {}
