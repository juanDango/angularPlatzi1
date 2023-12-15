import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Task } from '../../models/tasks.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
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

  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement
    const newTask = input.value;
    input.value = ""
    this.addTask(newTask)
  }

  addTask(title: string) {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false
    }
    this.lista.update(lista => [...lista, newTask])
  }

  deleteTask(index: number){
    this.lista.update((lista) => lista.filter((task, i) => i != index))
  }
}
