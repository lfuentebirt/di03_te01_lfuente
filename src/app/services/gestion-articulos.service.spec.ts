import { TestBed } from '@angular/core/testing';

import { GestionArticulosService } from './gestion-articulos.service';

describe('GestionArticulosService', () => {
  let service: GestionArticulosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionArticulosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
