import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Task } from '../../models/tasks.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  lista = signal<Task[]>([
    {
      id: Date.now(),
      title: "Crear proyecto",
      completed: false,
    },
    {
      id: Date.now(),
      title: "Crear componentes",
      completed: false,
    },
  ]);

  newTaskCtrl = new FormControl("", {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)
    ]
  })

  /**
   * Se encarga de manejar los cambios
   * @param event Evento
   */
  changeHandler() {
    if (this.newTaskCtrl.valid) {
      const value = this.newTaskCtrl.value.trim()
      this.addTask(value)
    }
    this.newTaskCtrl.setValue("")
  }

  /**
   * Se encarga de actualizar una tarea
   * @param index Indice de la tarea a actualizar
   */
  updateTast(index: number){
    this.lista.update(lista => {
      return lista.map((task, i) => {
        if (i == index){
          return {
            ...task,
            completed: !task.completed
          }
        }
        return task
      })
    })
  }

  /**
   * Añade una nueva tarea con el título
   * @param title Titulo de la tarea
   */
  addTask(title: string) {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false
    }
    this.lista.update(lista => [...lista, newTask])
  }

  /**
   * Elimina una tarea del array en el index
   * @param index indice a eliminar
   */
  deleteTask(index: number){
    this.lista.update((lista) => lista.filter((task, i) => i != index))
  }
}
