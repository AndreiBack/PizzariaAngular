import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Pizza } from '../models/pizza';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  API: string = 'http://localhost:8080/api/pizzas';
  http = inject(HttpClient);

  constructor() { }


  listAll(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(this.API);
  }

  save(pizza: Pizza): Observable<Pizza> {
    return this.http.post<Pizza>(this.API, pizza);
  }

  update(pizza: Pizza): Observable<Pizza> {
    return this.http.put<Pizza>(`${this.API}/${pizza.id}`, pizza);
}
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }


}