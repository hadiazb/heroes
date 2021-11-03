import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroes, Publisher } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 5px;
      }
    `,
  ],
})
export class AgregarComponent implements OnInit {
  public plublishers = [
    {
      id: 'DC Comics',
      decs: 'DC - Comics',
    },
    {
      id: 'DC Comics',
      decs: 'Marvel - Comics',
    },
  ];

  public heroe: Heroes = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    alt_img: '',
    publisher: Publisher.DCComics,
  };

  constructor(
    private heroesService: HeroesService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes('editar')) {
      return;
    }

    this.activateRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getHeroeById(id)))
      .subscribe((heroe) => (this.heroe = heroe));
  }

  guardar() {
    console.log('guardar', this.heroe);

    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    if (this.heroe.id) {
      // Actualizar
      this.heroesService
        .actualizarHeroe(this.heroe)
        .subscribe((heroe) => console.log(heroe));
    } else {
      // Crear
      this.heroesService.agregarHeroe(this.heroe).subscribe((heroe) => {
        this.router.navigate(['/heroes/editar', heroe.id]);
      });
    }
  }
}
