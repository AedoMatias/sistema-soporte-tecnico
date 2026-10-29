
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-lista-tickets',
  standalone: true,
  imports: [],
  templateUrl: './lista-tickets.component.html',
  styleUrl: './lista-tickets.component.css'
})
export class ListaTicketsComponent {
  @Input() tickets: any[] = [];
}
