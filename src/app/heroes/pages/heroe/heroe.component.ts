import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroes } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 5px;
      }
    `
  ]
})
export class HeroeComponent implements OnInit {
  public heroe!: Heroes;

  constructor(
    private activateRoute: ActivatedRoute,
    private heroesService: HeroesService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activateRoute.params
      .pipe(
        switchMap(({ id }) => {
          return this.heroesService.getHeroeById(id);
        })
      )
      .subscribe((heroe) => {
        if (heroe) {
          this.heroe = heroe;
        } else {
          this.router.navigate(['/heroes/listado'])
        }
      });
  }

  regresar() {
    this.router.navigate(['/heroes/listado'])
  }

}
