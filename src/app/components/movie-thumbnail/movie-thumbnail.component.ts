import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-movie-thumbnail',
    templateUrl: './movie-thumbnail.component.html',
    styleUrls: ['./movie-thumbnail.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieThumbnailComponent implements OnInit {
    @Input() movie;

    constructor() { }

    ngOnInit() {
    }

}
