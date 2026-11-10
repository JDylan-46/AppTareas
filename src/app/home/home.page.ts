import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Tarea } from '../models/tarea.model';
import { TareaService } from '../services/tarea.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage {
  tareas: Tarea[] = [];

  readonly router = inject(Router);
  private readonly tareaService = inject(TareaService);
  private readonly alertController = inject(AlertController);
  private readonly toastController = inject(ToastController);

  ionViewWillEnter(): void {
    this.tareas = this.tareaService.obtenerTareas()
      .sort((a, b) => a.fechaVencimiento.localeCompare(b.fechaVencimiento));
  }

  async eliminarTarea(tarea: Tarea, event: Event): Promise<void> {
    event.stopPropagation();
    const alert = await this.alertController.create({
      header: 'Eliminar tarea',
      message: `¿Quieres eliminar "${tarea.nombre}"?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.tareaService.eliminarTarea(tarea.id);
            this.ionViewWillEnter();
            void this.mostrarMensaje('Tarea eliminada');
          }
        }
      ]
    });
    await alert.present();
  }

  private async mostrarMensaje(mensaje: string): Promise<void> {
    const toast = await this.toastController.create({ message: mensaje, duration: 1800, position: 'bottom' });
    await toast.present();
  }
}
