import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ListaDestinos } from './lista-destinos/lista-destinos';
import { AsyncPipe } from '@angular/common';

import { interval, map } from 'rxjs';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, ListaDestinos, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('lugare-bonitos');
  time = interval(1000).pipe(
    map(() => new Date().toLocaleString())
  );


}
