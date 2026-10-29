
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { ListaTicketsComponent } from './components/lista-tickets/lista-tickets.component';
import { FormularioTicketComponent } from './components/formulario-ticket/formulario-ticket.component';

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
export class AppComponent {
  title = 'Sistema de Gestión de Soporte Técnico';

  tickets = [
    {
      id: 1,
      asunto: 'Problema con el computador',
      descripcion: 'El equipo no inicia correctamente',
      categoria: 'Hardware',
      prioridad: 'Alta',
      estado: 'Pendiente'
    },
    {
      id: 2,
      asunto: 'Instalación de software',
      descripcion: 'Se necesita instalar un programa',
      categoria: 'Software',
      prioridad: 'Media',
      estado: 'En proceso'
    },
    {
      id: 3,
      asunto: 'Problema con la impresora',
      descripcion: 'La impresora no responde',
      categoria: 'Hardware',
      prioridad: 'Baja',
      estado: 'Finalizado'
    }
  ];

  agregarTicket(ticket: any) {
    const nuevoTicket = {
      id: this.tickets.length > 0
        ? Math.max(...this.tickets.map(t => t.id)) + 1
        : 1,
      ...ticket
    };

    this.tickets = [...this.tickets, nuevoTicket];
  }
}
