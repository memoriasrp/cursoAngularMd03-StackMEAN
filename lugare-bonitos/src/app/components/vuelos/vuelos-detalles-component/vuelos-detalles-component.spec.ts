import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VuelosDetallesComponent } from './vuelos-detalles-component';

describe('VuelosDetallesComponent', () => {
  let component: VuelosDetallesComponent;
  let fixture: ComponentFixture<VuelosDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VuelosDetallesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VuelosDetallesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
