import { Component, HostBinding, Input } from '@angular/core';
import { DestinoViajes } from '../models/destino-viaje.model';
@Component({
  selector: 'app-destino-viaje',
  standalone: true,
  imports: [],
  templateUrl: './destino-viaje.html',
  styleUrl: './destino-viaje.css',

})
export class DestinoViaje {

  @Input() destino!: DestinoViajes;
  @HostBinding('attr.class') cssClass = 'col-md-4'
}
