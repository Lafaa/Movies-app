import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'getGenres',
    pure: true
})
export class GetGenresPipe implements PipeTransform {

    transform(movie: any): any {
        return movie.genres.map((x: string) => x.charAt(0).toUpperCase() + x.slice(1)).join(', ');
    }

}
