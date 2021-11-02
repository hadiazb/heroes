import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Heroes } from '../interfaces/heroes.interfaces';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(
    private http: HttpClient
  ) { }

  getHeroes() {
    return this.http.get<Heroes[]>('http://localhost:3000/heroes')
  }
}
