import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Endereco } from '../models/endereco';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {
  API: string = 'http://localhost:8080/api/enderecos';
  http = inject(HttpClient);

  constructor() { }


  listAll(): Observable<Endereco[]> {
    return this.http.get<Endereco[]>(this.API);
  }

  save(endereco: Endereco): Observable<Endereco> {
    return this.http.post<Endereco>(this.API, endereco);
  }

  update(endereco: Endereco): Observable<Endereco> {
    return this.http.put<Endereco>(`${this.API}/${endereco.id}`, endereco);
}
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }


}

