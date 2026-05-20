import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from './components/card/card.component';
import { TableComponent } from './components/table/table.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, CardComponent, TableComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gm-cotizaciones';

  usuarios = [
    {
      id: 1,
      nombre: 'Luis',
      correo: 'luis@mail.com',
      edad: 28
    },
    {
      id: 2,
      nombre: 'Ana',
      correo: 'ana@mail.com',
      edad: 31
    },
    {
      id: 3,
      nombre: 'Carlos',
      correo: 'carlos@mail.com',
      edad: 24
    }
  ];
}
