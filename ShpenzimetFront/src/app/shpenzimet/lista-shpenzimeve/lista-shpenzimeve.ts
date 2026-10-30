import { Component, computed, effect, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { KartaShpenzimit } from '../karta-shpenzimit/karta-shpenzimit';
import { ShpenzimetStore } from '../shpenzimet-store';

@Component({
  selector: 'app-lista-shpenzimeve',
  imports: [KartaShpenzimit, CurrencyPipe],
  templateUrl: './lista-shpenzimeve.html',
  styleUrl: './lista-shpenzimeve.css',
})
export class ListaShpenzimeve {
  protected store = inject(ShpenzimetStore);

  protected kategorite = this.store.kategorite;

  protected filtriKategoria = signal<number | null>(null);
  protected kerko = signal('');
  protected readonly kufiriIMadh = 100;

  protected teFiltruarat = computed(() => {
    const kategoria = this.filtriKategoria();
    const fjala = this.kerko().trim().toLowerCase();
    return this.store.shpenzimet()
      .filter(s => kategoria === null || s.kategoriaId === kategoria)
      .filter(s => s.pershkrimi.toLowerCase().includes(fjala));
  });

  protected totali = computed(() =>
    this.teFiltruarat().reduce((shuma, s) => shuma + s.shuma, 0)
  );

  constructor() {
    effect(() => {
      document.title = `Shpenzimet: ${this.store.totali().toFixed(2)} €`;
    });
  }

  protected fshijShpenzimin(id: number) {
    this.store.fshij(id);
  }

  protected rikthe() {
    this.filtriKategoria.set(null);
    this.kerko.set('');
  }
}