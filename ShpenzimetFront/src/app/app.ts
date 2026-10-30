import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Koka } from './shpenzimet/koka/koka';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Koka],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}