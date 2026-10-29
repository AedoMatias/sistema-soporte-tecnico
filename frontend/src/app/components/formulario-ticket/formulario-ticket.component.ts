
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario-ticket',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './formulario-ticket.component.html',
  styleUrl: './formulario-ticket.component.css'
})
export class FormularioTicketComponent {
  @Output() ticketCreado = new EventEmitter<any>();

  asunto = '';
  descripcion = '';
  categoria = '';
  prioridad = '';

  registrarTicket() {
    if (
      this.asunto.trim() === '' ||
      this.descripcion.trim() === '' ||
      this.categoria === '' ||
      this.prioridad === ''
    ) {
      alert('Completa todos los campos del formulario.');
      return;
    }

    const ticket = {
      asunto: this.asunto,
      descripcion: this.descripcion,
      categoria: this.categoria,
      prioridad: this.prioridad,
      estado: 'Pendiente'
    };

    this.ticketCreado.emit(ticket);

    this.asunto = '';
    this.descripcion = '';
    this.categoria = '';
    this.prioridad = '';
  }
}
