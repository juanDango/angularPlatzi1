import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  welcome="Hola!";
  lista = [
    "Descargar angular cli",
    "Crear proyecto",
    "Crear componentes"
  ];
  name = "Juan Daniel";
  age = 25;
  disabled=false;
  img="https://w3schools.com/howto/img_avatar.png";

  persona = {
    name: "Juan Daniel",
    age: 18,
    avatar: "https://w3schools.com/howto/img_avatar.png"
  }

  clickHandler(){
    alert("Hola")
  }

  changeHandler(event: Event){
    console.log(event)
  }

  keydownHandler(event: KeyboardEvent){
    const input = event.target as HTMLInputElement
    console.log(input.value)
  }
}
