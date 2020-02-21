import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeAllMoviesComponent } from './see-all-movies.component';
import { AppComponent } from 'src/app/app.component';
import { MovieThumbnailComponent } from '../movie-thumbnail/movie-thumbnail.component';
import { MoviesListComponent } from '../movies-list/movies-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { GetGenresPipe } from 'src/app/get-genres.pipe';

describe('SeeAllMoviesComponent', () => {
    let component: SeeAllMoviesComponent;
    let fixture: ComponentFixture<SeeAllMoviesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                MovieThumbnailComponent,
                MoviesListComponent,
                SeeAllMoviesComponent,
                GetGenresPipe
            ],
            imports: [RouterTestingModule, FormsModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SeeAllMoviesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render a form with a input', () => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('form.form-inline input.form-control')).toBeTruthy();
    });
    it('should render at least one movie', () => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('div.thumbnail')).toBeTruthy();
    });
});
