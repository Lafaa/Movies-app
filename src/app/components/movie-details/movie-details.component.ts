import { Component, OnInit } from '@angular/core';
import { DataBaseService } from 'src/app/services/database/data-base.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-movie-details',
    templateUrl: './movie-details.component.html',
    styleUrls: ['./movie-details.component.sass']
})
export class MovieDetailsComponent implements OnInit {
    movie: any = {};
    similiarMovies: any = [];

    constructor(private dataBase: DataBaseService, private route: ActivatedRoute, private router: Router, private location: Location) {

    }
    // this method reads the id of the movie from the URL param,
    // then requests the moviedetails from the database Service.
    // If no movie is found, the app is redirectd to a 404 page, othervise
    // a list of similiar movies is loaded to be displayed.
    ngOnInit() {

        this.route.params.subscribe(params => {
            const id = parseInt(params.id, 10);
            this.movie = this.dataBase.getMovieDetails(id);

            if (this.movie === undefined) {
                this.router.navigate(['/404']);
            } else {
                this.similiarMovies = this.dataBase.getSimiliarMovies(id);
            }

        });
    }

    // function needed to display the genres of a movie in a user friendly way
    getGenres() {
        return this.movie.genres.map((x: string) => x.charAt(0).toUpperCase() + x.slice(1)).join(', ');
    }

    // get a colour based on the value of the rate
    getColorClass(rating = parseFloat(this.movie.rate)) {
        switch (true) {
            case (rating < 3):
                return 'redRating';
            case (rating < 5):
                return 'orangeRating';
            case (rating < 7):
                return 'yellowRating';
            case (rating < 9):
                return 'lightGreenRating';
            default:
                return 'greenRating';
        }
    }

    goBack() {
        this.location.back();
    }



}
