import { IonicModule } from '@ionic/angular/lazy';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TareaPageRoutingModule } from './tarea-routing.module';
import { TareaPage } from './tarea.page';

@NgModule({
  imports: [IonicModule, CommonModule, ReactiveFormsModule, TareaPageRoutingModule],
  declarations: [TareaPage]
})
export class TareaPageModule {}
