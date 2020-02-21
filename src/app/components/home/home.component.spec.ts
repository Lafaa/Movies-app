import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { MovieThumbnailComponent } from '../movie-thumbnail/movie-thumbnail.component';
import { MoviesListComponent } from '../movies-list/movies-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { routes } from '../../app-routing.module';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { SeeAllMoviesComponent } from '../see-all-movies/see-all-movies.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { GetGenresPipe } from 'src/app/get-genres.pipe';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MovieThumbnailComponent,
        MoviesListComponent,
        HomeComponent,
        MovieDetailsComponent,
        HomeComponent,
        SeeAllMoviesComponent,
        NotFoundComponent,
        GetGenresPipe
      ],
      imports: [RouterTestingModule.withRoutes(routes), FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('navigate to "" redirects you to /home', fakeAsync(() => {
    const router = TestBed.get(Router);
    const location = TestBed.get(Location);
    router.navigate(['/404']);
    tick();
    expect(location.path()).toBe('/404');
  }));
});
