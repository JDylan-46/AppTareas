import { Injectable } from '@angular/core';
import { Tarea } from '../models/tarea.model';

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private readonly storageKey = 'tarea-app-tareas';

  obtenerTareas(): Tarea[] {
    const tareasGuardadas = localStorage.getItem(this.storageKey);

    if (!tareasGuardadas) {
      return [];
    }

    try {
      const tareas: unknown = JSON.parse(tareasGuardadas);
      return Array.isArray(tareas) ? tareas as Tarea[] : [];
    } catch (error) {
      console.error('No se pudieron leer las tareas guardadas.', error);
      return [];
    }
  }

  obtenerTarea(id: string): Tarea | undefined {
    return this.obtenerTareas().find(tarea => tarea.id === id);
  }

  agregarTarea(datos: Omit<Tarea, 'id'>): Tarea {
    const tarea: Tarea = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      ...datos
    };
    this.guardarTareas([...this.obtenerTareas(), tarea]);
    return tarea;
  }

  actualizarTarea(tareaActualizada: Tarea): boolean {
    const tareas = this.obtenerTareas();
    const indice = tareas.findIndex(tarea => tarea.id === tareaActualizada.id);

    if (indice === -1) {
      return false;
    }

    tareas[indice] = tareaActualizada;
    this.guardarTareas(tareas);
    return true;
  }

  eliminarTarea(id: string): boolean {
    const tareas = this.obtenerTareas();
    const tareasRestantes = tareas.filter(tarea => tarea.id !== id);

    if (tareasRestantes.length === tareas.length) {
      return false;
    }

    this.guardarTareas(tareasRestantes);
    return true;
  }

  private guardarTareas(tareas: Tarea[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(tareas));
  }
}
