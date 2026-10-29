
import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario-ticket',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './formulario-ticket.component.html',
  styleUrl: './formulario-ticket.component.css'
})
export class FormularioTicketComponent implements OnChanges {
  @Input() ticketEditar: any = null;

  @Output() ticketCreado = new EventEmitter<any>();
  @Output() edicionCancelada = new EventEmitter<void>();

  asunto = '';
  solicitante = '';
  descripcion = '';
  categoria = '';
  prioridad = '';
  estado = 'Pendiente';

  mensaje = '';

  ngOnChanges() {
    if (this.ticketEditar) {
      this.asunto = this.ticketEditar.asunto;
      this.solicitante = this.ticketEditar.solicitante;
      this.descripcion = this.ticketEditar.descripcion;
      this.categoria = this.ticketEditar.categoria;
      this.prioridad = this.ticketEditar.prioridad;
      this.estado = this.ticketEditar.estado;
    } else {
      this.limpiarFormulario();
    }
  }

  registrarTicket() {
    this.mensaje = '';

    if (
      this.asunto.trim().length < 3 ||
      this.solicitante.trim().length < 2 ||
      this.descripcion.trim().length < 10 ||
      this.categoria === '' ||
      this.prioridad === ''
    ) {
      this.mensaje = 'Completa todos los campos correctamente.';
      return;
    }

    const ticket = {
      asunto: this.asunto.trim(),
      solicitante: this.solicitante.trim(),
      descripcion: this.descripcion.trim(),
      categoria: this.categoria,
      prioridad: this.prioridad,
      estado: this.estado
    };

    this.ticketCreado.emit(ticket);

    if (!this.ticketEditar) {
      this.limpiarFormulario();
    }
  }

  cancelarEdicion() {
    this.edicionCancelada.emit();
    this.limpiarFormulario();
  }

  limpiarFormulario() {
    this.asunto = '';
    this.solicitante = '';
    this.descripcion = '';
    this.categoria = '';
    this.prioridad = '';
    this.estado = 'Pendiente';
    this.mensaje = '';
  }
}
