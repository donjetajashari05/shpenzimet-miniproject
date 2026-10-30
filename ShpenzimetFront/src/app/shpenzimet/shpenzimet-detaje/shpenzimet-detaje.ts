import { Component, computed, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { KartaShpenzimit } from '../karta-shpenzimit/karta-shpenzimit';
import { ShpenzimetStore } from '../shpenzimet-store';

@Component({
  selector: 'app-shpenzimi-detaje',
  imports: [KartaShpenzimit, RouterLink],
  template: `
    <a routerLink="/shpenzimet">← Kthehu te lista</a>

    @if (shpenzimi(); as s) {
      <h2>Shpenzimi #{{ s.id }}</h2>
      <app-karta-shpenzimit [shpenzimi]="s" (fshij)="fshijDheKthehu($event)" />
    } @else {
      <p>Shpenzimi me id {{ id() }} nuk ekziston.</p>
    }
  `,
})
export class ShpenzimetDetaje {
  private store = inject(ShpenzimetStore);
  private router = inject(Router);

  readonly id = input.required<string>();

  protected shpenzimi = computed(() =>
    this.store.shpenzimet().find(s => s.id === Number(this.id()))
  );

  protected fshijDheKthehu(id: number) {
    this.store.fshij(id);
    this.router.navigate(['/shpenzimet']);
  }
}