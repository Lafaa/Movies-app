import { Component } from '@angular/core';
import { DataBaseService } from 'src/app/services/database/data-base.service';
import { GenreType } from '../../model/genreType';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SearchStoreService, SearchActionsTypes } from 'src/app/services/search-store/search-store.service';
import { Location } from '@angular/common';


@Component({
    selector: 'app-see-all-movies',
    templateUrl: './see-all-movies.component.html',
    styleUrls: ['./see-all-movies.component.sass']
})
export class SeeAllMoviesComponent {
    GenreType = GenreType; // create a variable I will use in the HTML to show only the existing genres

    currentPage = 1;
    pages = [];
    perPage = 8; // numbers of movies to show in each page

    // for each of the 2 input, I create a subject that is called from the HTML every time the inputs change
    selectedGenre = '';
    selectedGenreChanged: Subject<string> = new Subject<string>();
    searchInput = '';
    searchInputChanged: Subject<string> = new Subject<string>();

    moviesToShow = []; // this is the array of the movies displayed in the current page
    filteredMovies = []; // this is the array with all the movies to show in all the pages
    allMovies = []; // this is the array with all the movies in the dataBase

    constructor(dataBase: DataBaseService, private searchStore: SearchStoreService, private location: Location) {
        // read and store all the movies
        this.allMovies = dataBase.listAllMovies();

        // for each of the 2 input, I subscribe for changes. For each of them,
        // I debounce the subscription for 300 milliseconds to avoid having too many calls to this method.
        // The changes in the search criteria are stored in the searchStore store
        this.searchInputChanged
            .pipe(debounceTime(300), distinctUntilChanged())
            .subscribe(newValue => {
                searchStore.changeState({ type: SearchActionsTypes.newSearch, value: newValue });
            });
        this.selectedGenreChanged
            .subscribe(newValue => {
                searchStore.changeState({ type: SearchActionsTypes.newGenre, value: newValue });
            });

        // This component has to apply changes to the search criteria every time the searchStore changes state
        this.searchStore.store.subscribe(() => {
            this.recoverState();
        });

        // Recover current state. This is used to get the default search criteria and also every
        // time the app returns to this route to get the last state
        this.recoverState();
    }

    // read the state and call loadMoviesToShow to apply it. Then call loadPage to display the current page
    recoverState() {
        const state = this.searchStore.getState();
        this.searchInput = state.searchText;
        this.selectedGenre = state.genre;
        this.currentPage = state.page;
        this.loadMoviesToShow();
        this.loadPage();
    }

    // This method is responsable to set the filterdMovies array
    loadMoviesToShow() {
        // I save in filteredMovies the movies that meet the search criteria
        this.filteredMovies = this.allMovies
            .filter(x => (this.searchInput === '' || x.name.toUpperCase().indexOf(this.searchInput.toUpperCase()) !== -1))
            .filter(x => (this.selectedGenre === '' || x.genres.includes(this.selectedGenre)));

        // check how many pages will be needed to display all the results
        if (this.filteredMovies.length > this.perPage) {
            this.pages = Array(Math.ceil(this.filteredMovies.length / this.perPage)).fill(0).map((x, i) => i);
        } else {
            this.pages = [1];
        }

    }

    // Compute what movies should be currently displayed based on the currentPage and the perPage values
    loadPage() {
        const startingIndex = (this.currentPage - 1) * this.perPage;
        this.moviesToShow = this.filteredMovies.slice(startingIndex, startingIndex + this.perPage);
        window.scroll(0, 0); // scroll to top every time the the movies in the page change
    }

    // Change the page in the searchStore
    setPage(page: number) {
        if (page === 0 || page > this.pages.length) {
            return;
        }
        this.searchStore.changeState({ type: SearchActionsTypes.setPage, value: page });
    }

    // when the 2 inputs change, I call the next on their respective subject
    changedSearchText(searchInput: string) {
        this.searchInputChanged.next(searchInput);
    }
    changedGenre(genre: string) {
        this.selectedGenreChanged.next(genre);
    }
    goBack() {
        this.location.back();
    }
}
