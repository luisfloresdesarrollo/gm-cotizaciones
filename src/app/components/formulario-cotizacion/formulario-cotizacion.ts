import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface InsuranceQuotation {
  razonSocial: string;
  sumaAsegurada: number;
  estadoOrigen: string;
  estadoDestino: string;
  esDeducible: boolean;
  tipoContenedor: string;
  subtotalSeguro: number;
  ivaSeguro: number;
  montoSeguro: number;
  moneda: string;
}

@Component({
  selector: 'app-formulario-cotizacion',
  imports: [CommonModule],
  templateUrl: './formulario-cotizacion.html',
  styleUrl: './formulario-cotizacion.scss',
})
export class FormularioCotizacion {

  @Input() headerImage: string =
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400&auto=format&fit=crop';

  @Input() quotation!: InsuranceQuotation;

}
