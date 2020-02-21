import { TestBed } from '@angular/core/testing';
import { DataBaseService } from './data-base.service';

describe('DataBaseService', () => {
  let service: DataBaseService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(DataBaseService);
  }
  );

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('list All Movies', () => {
    it('should read all the movies', () => {
      expect(service.listAllMovies().length).toBe(24);
    });
  });
  describe('getBestRated', () => {

    it('should return the 3 best rated movies', () => {
      const bestRatedMovies = service.getBestRated(3);
      expect(bestRatedMovies.length).toBe(3);
      const allMovies = service.listAllMovies();
      allMovies.forEach(movie => {
        bestRatedMovies.forEach(bestMovie => {
          if (parseFloat(movie.rate) > parseFloat(bestMovie.rate) &&
            bestRatedMovies.filter(m => m.id === movie.id).length !== 1) {
            fail('Found better rated movie');
          }
        });
      });
    });
  });
  describe('getSimiliarMovies', () => {
    it('should return only movies with at least 1 genre in common with the original Movie', () => {
      const allMovies = service.listAllMovies();
      allMovies.forEach(movie => {
        const similiarMovies = service.getSimiliarMovies(movie.id);
        similiarMovies.forEach(similiarMovie => {
          let found = false;
          similiarMovie.genres.forEach(genre => {
            if (movie.genres.includes(genre)) {
              found = true;
            }
          });
          expect(found).toBe(true);
        });
      });
    });
  });

});
