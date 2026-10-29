
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
        alert('No se pudieron cargar los tickets. Revisa si el backend está funcionando.');
      }
    });
  }

  agregarTicket(ticket: any) {
    this.ticketService.registrarTicket(ticket).subscribe({
      next: () => {
        this.cargarTickets();
        alert('Ticket registrado correctamente.');
      },
      error: (error) => {
        console.error('Error al registrar el ticket:', error);
        alert('No se pudo registrar el ticket.');
      }
    });
  }
}
