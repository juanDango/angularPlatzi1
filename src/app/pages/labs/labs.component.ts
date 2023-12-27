
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  welcome="Hola!";
  lista = signal([
    "Descargar angular cli",
    "Crear proyecto",
    "Crear componentes"
  ]);
  name = signal("Juan Daniel");
  age = 25;
  disabled=false;
  img="https://w3schools.com/howto/img_avatar.png";

  persona = signal({
    name: "Juan Daniel",
    age: 17,
    avatar: "https://w3schools.com/howto/img_avatar.png"
  })

  colorCtrl = new FormControl();
  widthCtrl = new FormControl(50, {
    nonNullable: true
  })

  nameCtrl = new FormControl(50, {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(3)
    ]
  })



  constructor(){
    this.colorCtrl.valueChanges.subscribe(value => {
      console.log(value)
    })
  }

  clickHandler(){
    alert("Hola")
  }

  changeHandler(event: Event){
    const input = event.target as HTMLInputElement
    const newValue = input.value;
    this.name.set(newValue)
  }

  keydownHandler(event: KeyboardEvent){
    const input = event.target as HTMLInputElement
    console.log(input.value)
  }

  changeAge(event: Event){
    const input = event.target as HTMLInputElement
    const newValue = input.value;
    this.persona.update(previa => {
      return {
        ...previa,
        age: parseInt(newValue)
      }
    }
    )
  }

  changeName(event: Event){
    const input = event.target as HTMLInputElement
    const newValue = input.value;
    this.persona.update(previa => {
      return {
        ...previa,
        name: newValue
      }
    }
    )
  }
}
