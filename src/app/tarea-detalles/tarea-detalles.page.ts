import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Tarea } from '../models/tarea.model';
import { TareaService } from '../services/tarea.service';

function fechaFutura(control: AbstractControl): ValidationErrors | null {
  if (!control.value) {
    return null;
  }

  const hoy = new Date();
  const fechaHoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
  return new Date(`${control.value}T00:00:00`) > fechaHoy ? null : { fechaNoFutura: true };
}

@Component({
  selector: 'app-tarea-detalles',
  templateUrl: './tarea-detalles.page.html',
  styleUrls: ['./tarea-detalles.page.scss'],
  standalone: false
})
export class TareaDetallesPage {
  private readonly formBuilder = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly tareaService = inject(TareaService);
  private readonly toastController = inject(ToastController);
  tarea: Tarea | undefined;
  readonly fechaMinima = this.obtenerFechaMinima();
  readonly tareaForm = this.formBuilder.nonNullable.group({
    nombre: ['', [Validators.required, Validators.maxLength(100)]],
    descripcion: ['', [Validators.required, Validators.maxLength(500)]],
    fechaVencimiento: ['', [Validators.required, fechaFutura]]
  });

  ionViewWillEnter(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.tarea = id ? this.tareaService.obtenerTarea(id) : undefined;

    if (this.tarea) {
      this.tareaForm.setValue({
        nombre: this.tarea.nombre,
        descripcion: this.tarea.descripcion,
        fechaVencimiento: this.tarea.fechaVencimiento
      });
    } else {
      void this.router.navigateByUrl('/');
    }
  }

  async guardar(): Promise<void> {
    if (!this.tarea || this.tareaForm.invalid) {
      this.tareaForm.markAllAsTouched();
      return;
    }

    this.tareaService.actualizarTarea({ id: this.tarea.id, ...this.tareaForm.getRawValue() });
    const toast = await this.toastController.create({ message: 'Cambios guardados', duration: 1800 });
    await toast.present();
    await this.router.navigateByUrl('/');
  }

  private obtenerFechaMinima(): string {
    const manana = new Date();
    manana.setDate(manana.getDate() + 1);
    return `${manana.getFullYear()}-${String(manana.getMonth() + 1).padStart(2, '0')}-${String(manana.getDate()).padStart(2, '0')}`;
  }
}
