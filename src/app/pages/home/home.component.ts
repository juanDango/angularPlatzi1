
import { Component, Injector, computed, effect, inject, signal } from '@angular/core';
import { Task } from '../../models/tasks.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  injector = inject(Injector)
  constructor() {

  }

  id = 0
  ngOnInit() {
    const storage = localStorage.getItem('tasks')
    if (storage){
      const tasks = JSON.parse(storage) as Array<Task>
      this.lista.set(tasks)
      this.id = Math.max(...tasks.map(task => task.id))+1
    }
    this.trackTasks()
  }

  trackTasks(){
    effect(() => {
      const tasks = this.lista()
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }, {injector: this.injector})
  }

  lista = signal<Task[]>([]);

  filter = signal<'all' | 'pending'  | 'completed'>('all');
  taskByFilter = computed(() => {
    const filter = this.filter()
    const tasks = this.lista()

    if (filter === 'pending'){
      return tasks.filter(task => !task.completed)
    }
    if (filter === 'completed'){
      return tasks.filter(task => task.completed)
    }
    return tasks
  })

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
  updateTast(id: number){
    this.lista.update(lista => {
      return lista.map((task, i) => {
        if (id == task.id){
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
      id: this.id,
      title,
      completed: false
    }
    this.id ++
    this.lista.update(lista => [...lista, newTask])
  }

  /**
   * Elimina una tarea del array en el index
   * @param index indice a eliminar
   */
  deleteTask(id: number){
    this.lista.update((lista) => lista.filter((task, i) => id != task.id))
  }

  updateTaskEditingMode(id: number){
    this.lista.update(lista => {
      return lista.map((task, i) => {
        if (task.id == id && !task.completed){
          return {
            ...task,
            editing: true
          }
        }
        return {
          ...task,
          editing: false
        }
      })
    })
  }

  updateTaskText(id: number, event: Event){
    const input = event.target as HTMLInputElement
    this.lista.update(lista => {
      return lista.map((task, i) => {
        if (task.id == id){
          return {
            ...task,
            title: input.value,
            editing: false
          }
        }
        return task
      })
    })
  }

  changeFilter(filter: 'all' | 'pending' | 'completed'){
    this.filter.set(filter)
  }
}
