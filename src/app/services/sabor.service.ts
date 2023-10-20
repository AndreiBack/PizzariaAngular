import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { Sabor } from '../models/sabor';

@Injectable({
  providedIn: 'root'
})
export class SaborService {
  API: string = 'http://localhost:8080/api/sabores';
  http = inject(HttpClient);

  constructor() { }


  listAll(): Observable<Sabor[]> {
    return this.http.get<Sabor[]>(this.API);
  }

  save(sabor: Sabor): Observable<Sabor> {
    return this.http.post<Sabor>(this.API, sabor).pipe(
      catchError((error) => {
        if (error.status === 201) {
          return of(error.response); 
        } else {
          return throwError(error);
        }
      })
    );
  }  

  exemploErro(): Observable<Sabor[]> {
    return this.http.get<Sabor[]>(this.API + '/erro');
  }

  update(sabor: Sabor): Observable<Sabor> {
    return this.http.put<Sabor>(`${this.API}/${sabor.id}`, sabor);
}
  delete(id: number): Observable<void> { 
    return this.http.delete<void>(`${this.API}/${id}`);
  }


}