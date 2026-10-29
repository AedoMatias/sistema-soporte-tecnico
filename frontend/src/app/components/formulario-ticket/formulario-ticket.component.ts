
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
      this.asunto.trim().length < 3 ||
      this.descripcion.trim().length < 10 ||
      this.categoria === '' ||
      this.prioridad === ''
    ) {
      alert(
        'Revisa el formulario: el asunto debe tener al menos 3 caracteres, la descripción al menos 10 y debes seleccionar categoría y prioridad.'
      );
      return;
    }

    const ticket = {
      asunto: this.asunto.trim(),
      descripcion: this.descripcion.trim(),
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
