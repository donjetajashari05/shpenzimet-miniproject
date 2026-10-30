import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ShpenzimetStore } from '../shpenzimet-store';

@Component({
  selector: 'app-koka',
  imports: [CurrencyPipe, RouterLink, RouterLinkActive],
  template: `
    <header class="koka">
      <h1>Shpenzimet e mia</h1>
      <div>
        {{ store.numri() }} shpenzime ·
        <strong>{{ store.totali() | currency: 'EUR' }}</strong>
      </div>
      <nav>
        <a routerLink="/shpenzimet" routerLinkActive="aktiv" [routerLinkActiveOptions]="{ exact: true }">Lista</a>
        <a routerLink="/shpenzimet/i-ri" routerLinkActive="aktiv">+ Shto</a>
      </nav>
    </header>
  `,
  styles: `
    .koka {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 24px;
      background: #1f2937;
      color: white;
      font-family: system-ui, sans-serif;
    }
    h1 { margin: 0; font-size: 1.3rem; }
    nav { display: flex; gap: 16px; }
    nav a { color: #9ca3af; text-decoration: none; }
    nav a.aktiv { color: white; font-weight: bold; }
  `,
})
export class Koka {
  protected store = inject(ShpenzimetStore);
}