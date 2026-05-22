import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormularioCotizacion } from './components/formulario-cotizacion/formulario-cotizacion';
import { ApiService } from './services/http/requests';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormularioCotizacion],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.crearCotizacionConAuthorization();
  }
  private api = inject(ApiService);

  title = 'gm-cotizaciones';
  ImgGM = 'https://gmterpv8puntocdn.azureedge.net/gmterpv8/GMTERPV8_WEB/Imagenes/LogoGM%20LOGIN.svg';

  quotationData = {
    razonSocial: 'Transportes del Norte SA de CV',
    sumaAsegurada: 250000,
    estadoOrigen: 'Baja California',
    estadoDestino: 'Jalisco',
    esDeducible: true,
    tipoContenedor: 'Caja seca 53',
    subtotalSeguro: 3200,
    ivaSeguro: 512,
    montoSeguro: 3712,
    moneda: 'MXN'
  };

  // POST — crear cotizacion
  crearCotizacion(): void {
    const nuevaCotizacion = {
      "sumaAsegurada": 10000,
      "idRazonSocial": 6331,
      "idOficinaProducto": 14253,
      "idMoneda": 2,
      "idEstadoOrigen": 1615,
      "idEstadoDestino": 14,
      "idBeneficiario": 15427,
      "isDeducible": false,
      "idTipoContenedor": 1
    };

    this.api.post<any>('MySafelinkOpen/cotizador', nuevaCotizacion).subscribe({
      next: (creado) => console.log('Creado:', creado),
      error: (err) => console.error(err),
    });
  }

  // POST — con Authorization token en headers
  crearCotizacionConAuthorization(): void {
    const nuevaCotizacion = {
      "sumaAsegurada": 10000,
      "idRazonSocial": 6331,
      "idOficinaProducto": 14253,
      "idMoneda": 2,
      "idEstadoOrigen": 1615,
      "idEstadoDestino": 14,
      "idBeneficiario": 15427,
      "isDeducible": false,
      "idTipoContenedor": 1
    };

    // Tu token (obtenlo del localStorage, sessionStorage, o una variable)
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzdWFyaW8iOiJjN2ZiZWY3ZS1hNjRlLTQ0OWQtYTZkMi0xYzVhMWI2NWE5ZDciLCJpYXQiOjE3Nzk0NzAxMDIsImV4cCI6MTc3OTQ3MzcwMn0.aTlCBIFoj3jn35pDooqZh-IW0OX8vE_rFs9J9CIjTQI';

    // Opciones con headers personalizados incluyendo Authorization
    const options = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'x-api-key': 'gDla-Vixl-vOaW-uShw-U4bQ-myWs-ShgO-CKs0' // ejemplo adicional
      }
    };

    // Enviar POST con headers
    this.api.post<any>('MySafelinkOpen/cotizador', nuevaCotizacion, options).subscribe({
      next: (creado) => {
        console.log('Cotización creada:', creado);
        const responseData = creado?.data ?? creado;
        this.applyQuotationResponse(responseData);
      },
      error: (err) => console.error('Error al crear cotización:', err),
    });
  }

  private applyQuotationResponse(responseData: { moneda?: string; monto?: number; iva?: number; subtotal?: number } | null | undefined): void {
    if (!responseData) {
      return;
    }

    this.quotationData = {
      ...this.quotationData,
      moneda: responseData.moneda ?? this.quotationData.moneda,
      montoSeguro: responseData.monto ?? this.quotationData.montoSeguro,
      ivaSeguro: responseData.iva ?? this.quotationData.ivaSeguro,
      subtotalSeguro: responseData.subtotal ?? this.quotationData.subtotalSeguro,
    };
  }
}


