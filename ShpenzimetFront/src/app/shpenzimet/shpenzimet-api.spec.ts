import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ShpenzimetApi } from './shpenzimet-api';
import { API_URL } from '../api.config';
import { Shpenzim } from './shpenzim';

describe('ShpenzimetApi', () => {
  let api: ShpenzimetApi;
  let serveri: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    api = TestBed.inject(ShpenzimetApi);
    serveri = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    serveri.verify(); 
  });

  it('krijo() dërgon POST me të dhënat e shpenzimit', () => {
    let rezultati: Shpenzim | undefined;

    api.krijo({ pershkrimi: 'Kafe', shuma: 1.5, kategoriaId: 1 })
      .subscribe(s => (rezultati = s));

    const kerkesa = serveri.expectOne(`${API_URL}/shpenzimet`);
    expect(kerkesa.request.method).toBe('POST');
    expect(kerkesa.request.body.pershkrimi).toBe('Kafe');
    expect(kerkesa.request.body.kategoriaId).toBe(1);

    kerkesa.flush({
      id: 42, pershkrimi: 'Kafe', shuma: 1.5, data: '2026-10-27T10:00:00',
      kategoriaId: 1, kategoriaEmri: 'Ushqim', kategoriaNgjyra: '#16a34a',
    });

    expect(rezultati?.id).toBe(42);
  });

  it('fshij() dërgon DELETE te URL-ja me id', () => {
    api.fshij(7).subscribe();

    const kerkesa = serveri.expectOne(`${API_URL}/shpenzimet/7`);
    expect(kerkesa.request.method).toBe('DELETE');
    kerkesa.flush(null, { status: 204, statusText: 'No Content' });
  });

  it('e kalon gabimin 400 te subscribe', () => {
    let statusi = 0;

    api.krijo({ pershkrimi: '', shuma: -5, kategoriaId: 1 })
      .subscribe({ error: e => (statusi = e.status) });

    serveri.expectOne(`${API_URL}/shpenzimet`).flush(
      { errors: { Shuma: ['Shuma duhet të jetë pozitive'] } },
      { status: 400, statusText: 'Bad Request' },
    );

    expect(statusi).toBe(400);
  });
});