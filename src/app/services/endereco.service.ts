import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { Endereco } from '../models/endereco';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {
  API: string = 'http://localhost:8080/enderecos';
  http = inject(HttpClient);

  constructor() { }


  listAll(): Observable<Endereco[]> {
    return this.http.get<Endereco[]>(this.API);
  }

  save(endereco: Endereco): Observable<Endereco> {
    return this.http.post<Endereco>(this.API, endereco).pipe(
      catchError((error) => {
        if (error.status === 201) {
          return of(error.response); 
        } else {
          return throwError(error);
        }
      })
    );
  }

  exemploErro(): Observable<Endereco[]> {
    return this.http.get<Endereco[]>(this.API + '/erro');
  }
  
  update(endereco: Endereco): Observable<Endereco> {
    return this.http.put<Endereco>(`${this.API}/${endereco.id}`, endereco);
}
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }


}

