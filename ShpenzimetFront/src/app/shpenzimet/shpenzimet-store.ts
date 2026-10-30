import { Service, computed, inject, signal } from '@angular/core';
import { HttpErrorResponse, httpResource } from '@angular/common/http';
import { API_URL } from '../api.config';
import { ShpenzimetApi } from './shpenzimet-api';
import { Kategoria, Shpenzim, ShpenzimInput } from './shpenzim';

@Service()
export class ShpenzimetStore {
  private api = inject(ShpenzimetApi);

  private readonly resursiShpenzimeve = httpResource<Shpenzim[]>(() => `${API_URL}/shpenzimet`);
  private readonly resursiKategorive = httpResource<Kategoria[]>(() => `${API_URL}/kategorite`);

  readonly shpenzimet = computed(() =>
    this.resursiShpenzimeve.hasValue() ? this.resursiShpenzimeve.value() : []
  );
  readonly kategorite = computed(() =>
    this.resursiKategorive.hasValue() ? this.resursiKategorive.value() : []
  );
  readonly numri = computed(() => this.shpenzimet().length);
  readonly totali = computed(() =>
    this.shpenzimet().reduce((shuma, s) => shuma + s.shuma, 0)
  );

  readonly dukeNgarkuar = computed(() => this.resursiShpenzimeve.isLoading());
  readonly gabimiNgarkimit = computed(() =>
    this.resursiShpenzimeve.error()
      ? 'Nuk mund ti ngarkoj shpenzimet. A është ndezur API-ja (dotnet run)?'
      : null
  );
  private readonly _gabimi = signal<string | null>(null);
  readonly gabimi = this._gabimi.asReadonly();


  shto(input: ShpenzimInput, neSukses?: () => void) {
    this._gabimi.set(null);
    this.api.krijo(input).subscribe({
      next: () => {
        this.rifresko();
        neSukses?.();
      },
      error: (e: HttpErrorResponse) => this._gabimi.set(this.mesazhiNgaGabimi(e)),
    });
  }

  fshij(id: number) {
    this._gabimi.set(null);
    this.api.fshij(id).subscribe({
      next: () => this.rifresko(),
      error: (e: HttpErrorResponse) => this._gabimi.set(this.mesazhiNgaGabimi(e)),
    });
  }

  private rifresko() {
    this.resursiShpenzimeve.reload();
    this.resursiKategorive.reload(); 
  }

  private mesazhiNgaGabimi(e: HttpErrorResponse): string {
    if (e.status === 0) {
      return 'Nuk mund të lidhem me serverin. Kontrollo portin dhe CORS-in.';
    }
    if (e.error?.errors) {
      return Object.values(e.error.errors as Record<string, string[]>).flat().join(' ');
    }
    if (e.error?.message) {
      return e.error.message;
    }
    return `Ndodhi një gabim (${e.status}).`;
  }
}