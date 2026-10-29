
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { ListaTicketsComponent } from './components/lista-tickets/lista-tickets.component';
import { FormularioTicketComponent } from './components/formulario-ticket/formulario-ticket.component';
import { TicketService } from './services/ticket.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CabeceraComponent,
    ListaTicketsComponent,
    FormularioTicketComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Sistema de Gestión de Soporte Técnico';

  tickets: any[] = [];
  ticketEditar: any = null;

  constructor(private ticketService: TicketService) {}

  ngOnInit() {
    this.cargarTickets();
  }

  cargarTickets() {
    this.ticketService.obtenerTickets().subscribe({
      next: (datos) => {
        this.tickets = datos;
      },
      error: (error) => {
        console.error('Error al cargar los tickets:', error);
        alert('No se pudieron cargar los tickets.');
      }
    });
  }

  agregarTicket(ticket: any) {
    if (this.ticketEditar) {
      this.ticketService.actualizarTicket(this.ticketEditar.id, ticket).subscribe({
        next: () => {
          alert('Ticket actualizado correctamente.');
          this.ticketEditar = null;
          this.cargarTickets();
        },
        error: (error) => {
          console.error('Error al actualizar el ticket:', error);
          alert('No se pudo actualizar el ticket.');
        }
      });
    } else {
      this.ticketService.registrarTicket(ticket).subscribe({
        next: () => {
          alert('Ticket registrado correctamente.');
          this.cargarTickets();
        },
        error: (error) => {
          console.error('Error al registrar el ticket:', error);
          alert('No se pudo registrar el ticket.');
        }
      });
    }
  }

  seleccionarTicket(ticket: any) {
    this.ticketEditar = ticket;
  }

  cancelarEdicion() {
    this.ticketEditar = null;
  }

  eliminarTicket(id: number) {
    this.ticketService.eliminarTicket(id).subscribe({
      next: () => {
        alert('Ticket eliminado correctamente.');
        this.cargarTickets();
      },
      error: (error) => {
        console.error('Error al eliminar el ticket:', error);
        alert('No se pudo eliminar el ticket.');
      }
    });
  }
}
