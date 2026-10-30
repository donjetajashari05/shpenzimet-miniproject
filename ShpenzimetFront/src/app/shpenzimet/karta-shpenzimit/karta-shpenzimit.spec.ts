// src/app/shpenzimet/karta-shpenzimit/karta-shpenzimit.spec.ts
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { KartaShpenzimit } from './karta-shpenzimit';
import { SHPENZIMET_PROVE } from '../te_dhenat_prove';

describe('KartaShpenzimit', () => {
  const kafe = SHPENZIMET_PROVE[0]; 

  async function krijoKarten() {
    TestBed.configureTestingModule({
      providers: [provideRouter([])], 
    });
    const fixture = TestBed.createComponent(KartaShpenzimit);
    fixture.componentRef.setInput('shpenzimi', kafe);
    await fixture.whenStable();
    return fixture;
  }

  it('shfaq përshkrimin, kategorinë dhe shumën', async () => {
    const fixture = await krijoKarten();
    const teksti = fixture.nativeElement.textContent;

    expect(teksti).toContain('Kafe');
    expect(teksti).toContain('Ushqim');
    expect(teksti).toContain('1.50');
  });

  it('e ngjyros etiketën me ngjyrën e kategorisë', async () => {
    const fixture = await krijoKarten();
    const etiketa: HTMLElement = fixture.nativeElement.querySelector('.etiketa');

    expect(etiketa.style.background).toMatch(/16a34a|22, 163, 74/);
  });

  it('dërgon id-në te output-i fshij kur klikohet butoni', async () => {
    const fixture = await krijoKarten();
    let idEDerguar: number | undefined;
    fixture.componentInstance.fshij.subscribe(id => (idEDerguar = id));

    fixture.nativeElement.querySelector('button').click();

    expect(idEDerguar).toBe(1);
  });
});