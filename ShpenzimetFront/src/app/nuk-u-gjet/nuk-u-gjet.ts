import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nuk-u-gjet',
  imports: [RouterLink],
  template: `<h2>404 – Kjo faqe nuk ekziston</h2><a routerLink="/shpenzimet">Shko te shpenzimet</a>`,
})
export class NukUGjet {}