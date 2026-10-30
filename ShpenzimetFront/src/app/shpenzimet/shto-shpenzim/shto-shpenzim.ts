import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { form, FormField, max, maxLength, min, required } from '@angular/forms/signals';
import { ShpenzimetStore } from '../shpenzimet-store';

interface FormaShpenzimit {
  pershkrimi: string;
  shuma: number;
  kategoriaId: string;
  data: string;        
}

const FORMA_BOSH: FormaShpenzimit = { pershkrimi: '', shuma: 0, kategoriaId: '', data: '' };

@Component({
  selector: 'app-shto-shpenzim',
  imports: [FormField, RouterLink],
  templateUrl: './shto-shpenzim.html',
  styleUrl: './shto-shpenzim.css',
})
export class ShtoShpenzim {
  protected store = inject(ShpenzimetStore);
  private router = inject(Router);

  protected modeli = signal<FormaShpenzimit>({ ...FORMA_BOSH });

  protected forma = form(this.modeli, (f) => {
    required(f.pershkrimi, { message: 'Shkruaj pershkrimin' });
    maxLength(f.pershkrimi, 100, { message: 'Përshkrimi mund të ketë deri në 100 karaktere' });
    min(f.shuma, 0.01, { message: 'Shuma duhet të jetë të paktën 0.01 €' });
    max(f.shuma, 1_000_000, { message: 'Shuma nuk mund të kalojë 1,000,000 €' });
    required(f.kategoriaId, { message: 'Zgjidh një kategori' });
  });

  protected ruaj(event: Event) {
    event.preventDefault();
    if (this.forma().invalid()) return;

    const v = this.modeli();
  
    this.store.shto(
      {
        pershkrimi: v.pershkrimi.trim(),
        shuma: v.shuma,
        kategoriaId: Number(v.kategoriaId),
        data: v.data || null, 
      },
      () => this.router.navigate(['/shpenzimet']),
    );
  }

  protected pastro() {
    this.modeli.set({ ...FORMA_BOSH });
  }
}