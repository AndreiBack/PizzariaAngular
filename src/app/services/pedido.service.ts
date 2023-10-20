import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { Pedido } from '../models/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  API: string = 'http://localhost:8080/api/pedidos';
  http = inject(HttpClient);

  constructor() { }


  listAll(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.API);
  }

  save(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(this.API, pedido).pipe(
      catchError((error) => {
        if (error.status === 201) {
          return of(error.response); 
        } else {
          return throwError(error);
        }
      })
    );
  }  

  
  exemploErro(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.API + '/erro');
  }

  update(pedido: Pedido): Observable<Pedido> {
    return this.http.put<Pedido>(`${this.API}/${pedido.id}`, pedido);
}
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }


}