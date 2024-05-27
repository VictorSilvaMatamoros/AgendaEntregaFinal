import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-agenda',
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  standalone: true,
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css'],
})
export class AgendaComponent {
  nombreControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)],
  });

  numeroControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.pattern(/^\d{9}$/)],
  });

  contactos: { nombre: string; numero: string }[] = [];
  selectedIndex: number = -1; 

  agregarContacto() {
    if (this.nombreControl.valid && this.numeroControl.valid) {
      const nombre = this.nombreControl.value;
      const numero = this.numeroControl.value;
      if (this.selectedIndex !== -1) {
        // edita el contacto existente
        this.contactos[this.selectedIndex] = { nombre, numero };
        this.selectedIndex = -1; 
      } else {
        // sino añadimos nuevo contacto
        this.contactos.push({ nombre, numero });
      }
      this.limpiarInputs();
    } else {
      if (this.nombreControl.invalid) {
        alert('Los nombres solo pueden contener letras y espacios.');
      }
      if (this.numeroControl.invalid) {
        alert('El número debe contener 9 dígitos.');
      }
    }
  }

  limpiarInputs() {
    this.nombreControl.reset();
    this.numeroControl.reset();
  }

  borrarContacto(index: number) {
    this.contactos.splice(index, 1);
    if (this.selectedIndex === index) {
      this.selectedIndex = -1; 
    }
  }

  borrarContactos() {
    this.contactos = [];
    this.selectedIndex = -1; 
  }

  editarContacto(index: number) {
    const contacto = this.contactos[index];
    this.nombreControl.setValue(contacto.nombre);
    this.numeroControl.setValue(contacto.numero);
    this.selectedIndex = index; 
    
  }

  cancelarEdicion() {
    this.selectedIndex = -1;
    this.limpiarInputs();
  }
  
}
