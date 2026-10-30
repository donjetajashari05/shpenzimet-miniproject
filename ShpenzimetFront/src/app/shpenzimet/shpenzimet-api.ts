import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../api.config';
import { Shpenzim, ShpenzimInput } from './shpenzim';

@Service()
export class ShpenzimetApi {
  private http = inject(HttpClient);
  private url = `${API_URL}/shpenzimet`;

  krijo(input: ShpenzimInput) {
    return this.http.post<Shpenzim>(this.url, input);
  }

  ndrysho(id: number, input: ShpenzimInput) {
    return this.http.put<void>(`${this.url}/${id}`, input);
  }

  fshij(id: number) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}