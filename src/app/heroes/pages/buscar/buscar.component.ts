import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroes } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [],
})
export class BuscarComponent implements OnInit {
  public termino: string = '';
  public busquedaVacia: boolean = false;
  public heroes: Heroes[] = [];
  public heroeSeleccionado: Heroes | undefined;

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {}

  buscando() {
    this.heroesService
      .getSugerencias(this.termino.trim())
      .subscribe((heroes) => {
        if (heroes.length === 0) {
          this.busquedaVacia = true;
        } else {
          this.busquedaVacia = false;
        }
        this.heroes = heroes;
      });
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent) {
    const heroe: Heroes = event.option.value;

    if (!heroe) {
      this.heroeSeleccionado = undefined;
    }

    this.termino = heroe.superhero;

    this.heroesService
      .getHeroeById(heroe.id!)
      .subscribe((heroe) => (this.heroeSeleccionado = heroe));
  }
}
