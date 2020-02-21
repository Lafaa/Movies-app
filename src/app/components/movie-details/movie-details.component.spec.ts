import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailsComponent } from './movie-details.component';
import { MovieThumbnailComponent } from '../movie-thumbnail/movie-thumbnail.component';
import { MoviesListComponent } from '../movies-list/movies-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from '../home/home.component';
import { SeeAllMoviesComponent } from '../see-all-movies/see-all-movies.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { GetGenresPipe } from 'src/app/get-genres.pipe';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MovieThumbnailComponent,
        MoviesListComponent,
        MovieDetailsComponent,
        HomeComponent,
        SeeAllMoviesComponent,
        NotFoundComponent,
        GetGenresPipe
      ],
      imports: [RouterTestingModule, FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
