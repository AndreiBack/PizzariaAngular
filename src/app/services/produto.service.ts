import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  API: string = 'http://localhost:80/produtos';
  http = inject(HttpClient);

  constructor() { }


  listAll(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.API);
  }

  save(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.API, produto).pipe(
      catchError((error) => {
        if (error.status === 201) {
          return of(error.response); 
        } else {
          return throwError(error);
        }
      })
    );
  }  

  exemploErro(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.API + '/erro');
  }
  update(produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.API}/${produto.id}`, produto);
}
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }


}