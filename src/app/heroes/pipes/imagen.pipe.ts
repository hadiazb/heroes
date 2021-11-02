import { Pipe, PipeTransform } from '@angular/core';
import { Heroes } from '../interfaces/heroes.interfaces';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(heroe: Heroes): string {
    return `assets/heroes/${heroe.id}.jpg`;
  }

}
