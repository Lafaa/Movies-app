import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-movies-list',
    templateUrl: './movies-list.component.html',
    styleUrls: ['./movies-list.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesListComponent implements OnInit {
    @Input() moviesToShow;

    constructor() { }

    ngOnInit() {
    }
    trackByFn(index, item) {
        return item.id;
    }


}
