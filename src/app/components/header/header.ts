import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  @Input() firstImg: string = 'https://gmterpv8puntocdn.azureedge.net/gmterpv8/GMTERPV8_WEB/Imagenes/LogoGM%20LOGIN.svg';
  @Input() secondImg: string = '';
}
