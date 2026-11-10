import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TareaService } from '../services/tarea.service';

function fechaFutura(control: AbstractControl): ValidationErrors | null {
  if (!control.value) {
    return null;
  }

  const hoy = new Date();
  const fechaHoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
  const fechaSeleccionada = new Date(`${control.value}T00:00:00`);
  return fechaSeleccionada > fechaHoy ? null : { fechaNoFutura: true };
}

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.page.html',
  styleUrls: ['./tarea.page.scss'],
  standalone: false
})
export class TareaPage {
  private readonly formBuilder = inject(FormBuilder);
  private readonly tareaService = inject(TareaService);
  private readonly router = inject(Router);
  readonly fechaMinima = this.obtenerFechaMinima();
  readonly tareaForm = this.formBuilder.nonNullable.group({
    nombre: ['', [Validators.required, Validators.maxLength(100)]],
    descripcion: ['', [Validators.required, Validators.maxLength(500)]],
    fechaVencimiento: ['', [Validators.required, fechaFutura]]
  });

  guardar(): void {
    if (this.tareaForm.invalid) {
      this.tareaForm.markAllAsTouched();
      return;
    }

    this.tareaService.agregarTarea(this.tareaForm.getRawValue());
    void this.router.navigateByUrl('/');
  }

  private obtenerFechaMinima(): string {
    const manana = new Date();
    manana.setDate(manana.getDate() + 1);
    return this.formatearFecha(manana);
  }

  private formatearFecha(fecha: Date): string {
    return `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}-${String(fecha.getDate()).padStart(2, '0')}`;
  }
}
