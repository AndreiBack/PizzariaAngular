import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Cliente } from '../models/cliente';
import { Observable, catchError, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  API: string = 'http://localhost:8080/clientes';
  http = inject(HttpClient);

  constructor() { }


  listAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.API);
  }

  save(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.API, cliente).pipe(
      catchError((error) => {
        if (error.status === 201) {
          return of(error.response); 
        } else {
          return throwError(error);
        }
      })
    );
  }  

  exemploErro(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.API + '/erro');
  }

  update(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.API}/${cliente.id}`, cliente);
}
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }


}