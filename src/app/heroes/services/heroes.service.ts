import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Heroes } from '../interfaces/heroes.interfaces';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  getHeroes() {
    return this.http.get<Heroes[]>(`${this.baseUrl}/heroes`)
  }

  getHeroeById(id: string) {
    return this.http.get<Heroes>(`${this.baseUrl}/heroes/${id}`)
  }

  getSugerencias(termino: string): Observable<Heroes[]> {
    return this.http.get<Heroes[]>(`${this.baseUrl}/heroes?q=${termino}&_limit=6`)
  }
}
