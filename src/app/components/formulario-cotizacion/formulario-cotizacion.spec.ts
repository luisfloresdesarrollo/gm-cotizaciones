import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCotizacion } from './formulario-cotizacion';

describe('FormularioCotizacion', () => {
  let component: FormularioCotizacion;
  let fixture: ComponentFixture<FormularioCotizacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioCotizacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioCotizacion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
