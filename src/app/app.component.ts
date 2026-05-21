import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CardComponent } from './components/card/card.component';
import { TableComponent } from './components/table/table.component';
import { Header } from './components/header/header';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, CardComponent, TableComponent, Header],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent{
  title = 'gm-cotizaciones';
  ImgGM = 'https://gmterpv8puntocdn.azureedge.net/gmterpv8/GMTERPV8_WEB/Imagenes/LogoGM%20LOGIN.svg';
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


