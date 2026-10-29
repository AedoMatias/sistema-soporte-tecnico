
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-lista-tickets',
  standalone: true,
  imports: [],
  templateUrl: './lista-tickets.component.html',
  styleUrl: './lista-tickets.component.css'
})
export class ListaTicketsComponent {
  @Input() tickets: any[] = [];

  @Output() ticketSeleccionado = new EventEmitter<any>();
  @Output() ticketEliminado = new EventEmitter<number>();

  editarTicket(ticket: any) {
    this.ticketSeleccionado.emit(ticket);
  }

  eliminarTicket(id: number) {
    const confirmar = confirm('¿Estás seguro de que deseas eliminar este ticket?');

    if (confirmar) {
      this.ticketEliminado.emit(id);
    }
  }
}
