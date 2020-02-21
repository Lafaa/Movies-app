import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-movie-thumbnail',
  templateUrl: './movie-thumbnail.component.html',
  styleUrls: ['./movie-thumbnail.component.sass']
})
export class MovieThumbnailComponent implements OnInit {
  @Input() movie;

  constructor() { }

  ngOnInit() {
  }

}
