import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  lista = signal([
    "Descargar angular cli",
    "Crear proyecto",
    "Crear componentes",
    "Crear soportes"
  ]);

  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement
    const newTask = input.value;
    this.lista.update(lista => [...lista, newTask])
  }

  deleteTask(index: number){
    this.lista.update((lista) => lista.filter((task, i) => i != index))
  }
}
