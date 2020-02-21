import { Injectable } from '@angular/core';
import { Movies } from './movie.mock-data';

@Injectable({
    providedIn: 'root'
})
export class DataBaseService {

    constructor() {
    }

    // This method takes in input a movie id, then gives a score to all the other
    // movies based on how many genre in common they have with the input movie,
    // then returns the top 3 movies
    getSimiliarMovies(id: number): any {
        const genres = Movies.filter(x => x.id === id)[0].genres;
        const scores = [];

        // compute the score for each of the other movies
        Movies.forEach(m => {
            if (m.id === id) {
                return;
            }
            scores[m.id] = { ...m, score: 0 };
            m.genres.forEach(g => {
                if (genres.includes(g)) {
                    scores[m.id].score++;
                }
            });
        });
        // sort the movies by their score
        scores.sort((a, b) => {
            return a.score < b.score ? 1 : -1;
        });

        // return the top 3
        return scores.filter(m => m.score > 0).slice(0, 3);
    }

    listAllMovies() {
        return Movies;
    }

    // This method orders a copy of the Movies array based on the rate property,
    // then returns the top howMany (input value)
    getBestRated(howMany: number = 5) {
        return Movies.slice(0).sort((a, b) => {
            const aValue = parseFloat(a.rate);
            const bValue = parseFloat(b.rate);
            return aValue < bValue ? 1 : -1;
        }).slice(0, howMany);
    }

    getMovieDetails(id: number) {
        return Movies.filter(x => x.id === id)[0];
    }

}
