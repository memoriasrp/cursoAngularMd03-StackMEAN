import { Component, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DestinoViajes } from '../../models/destino-viaje.model';
import { debounceTime, distinctUntilChanged, fromEvent, map, switchMap, filter } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';

@Component({
  selector: 'app-form-destino-viaje',
  imports: [ReactiveFormsModule],
  templateUrl: './form-destino-viaje.html',
  styleUrl: './form-destino-viaje.css',
})
export class FormDestinoViaje {
  @Output() onItemAdded = new EventEmitter<DestinoViajes>();
  fg: FormGroup;
  mensajeError = '';
  minLongitud = 5;
  searchResults: string[];

  constructor(fb: FormBuilder) {
    this.onItemAdded = new EventEmitter();
    this.fg = fb.group({
      nombre: ['', [Validators.required, this.validarNombre.bind(this)]],
      url: ['', [Validators.required, this.validarUrl.bind(this)]]
    });
    this.searchResults = [];
    // es un ejemplo que registrar todos los cambios que se realizan en el formulario
    //this.fg.valueChanges.subscribe((form: any) => { console.log('this->' + form) });
  }
  ngOnInit() {
    this.fg.get('nombre')!.valueChanges
      .pipe(
        map(value => value ?? ''), // evita null
        filter((text: string) => text.length > 4),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(() => ajax<string[]>('/assets/datos.json'))
      )
      .subscribe((response: AjaxResponse<string[]>) => {
        this.searchResults = response.response;
      });


  }
  guardar(): boolean {
    if (this.fg.invalid) {
      this.mensajeError = 'Falta completar todos los campos';

      return false;
    }

    const nombre = this.fg.value.nombre!;
    const url = this.fg.value.url!;
    const nuevoDestino = new DestinoViajes(nombre, url + "/380/230");

    // Emitimos al componente padre
    this.onItemAdded.emit(nuevoDestino);

    // Limpiar formulario
    this.fg.reset();

    return false;
  }

  validarNombre(control: FormControl) {
    const valor = control.value ?? ''; // si es null, lo convierte en ''

    if (!valor.trim()) {
      return { required: true };
    }

    if (valor.trim().length < 5) {
      return { minlength: true };
    }

    return null;

  }
  validarUrl(control: FormControl) {
    const valor = control.value;

    if (!valor) {
      return { required: true };
    }
    const patron = /^https?:\/\/.+/;
    if (!patron.test(valor)) {
      return { pattern: true };
    }

    return null; // válido
  }

}
