import { Routes } from '@angular/router';
import { ListaShpenzimeve } from './shpenzimet/lista-shpenzimeve/lista-shpenzimeve';
import { ShtoShpenzim } from './shpenzimet/shto-shpenzim/shto-shpenzim';
import { ShpenzimetDetaje } from './shpenzimet/shpenzimet-detaje/shpenzimet-detaje';
import { NukUGjet } from './nuk-u-gjet/nuk-u-gjet';

export const routes: Routes = [
  { path: '', redirectTo: 'shpenzimet', pathMatch: 'full' },
  { path: 'shpenzimet', component: ListaShpenzimeve, title: 'Shpenzimet' },
  { path: 'shpenzimet/i-ri', component: ShtoShpenzim, title: 'Shpenzim i ri' },
  { path: 'shpenzimet/:id', component: ShpenzimetDetaje, title: 'Detajet' },
  { path: '**', component: NukUGjet, title: 'Nuk u gjet' },
];