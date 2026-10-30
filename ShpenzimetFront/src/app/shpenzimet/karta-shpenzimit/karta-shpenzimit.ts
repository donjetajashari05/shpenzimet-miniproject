// src/app/shpenzimet/karta-shpenzimit/karta-shpenzimit.ts
import { Component, input, output } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Shpenzim } from '../shpenzim';

@Component({
  selector: 'app-karta-shpenzimit',
  imports: [RouterLink, DatePipe, CurrencyPipe],
  templateUrl: './karta-shpenzimit.html',
  styleUrl: './karta-shpenzimit.css',
})
export class KartaShpenzimit {
  shpenzimi = input.required<Shpenzim>();
  fshij = output<number>();

  protected kerkoFshirjen() {
    this.fshij.emit(this.shpenzimi().id);
  }
}