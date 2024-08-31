import { TestBed } from '@angular/core/testing';

import { ProdutoEstatisticaService } from './produto-estatistica.service';

describe('ProdutoEstatisticaService', () => {
  let service: ProdutoEstatisticaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdutoEstatisticaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
