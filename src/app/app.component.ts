import { Component } from '@angular/core';
import { DataBaseService } from './services/database/data-base.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  constructor(private dataBase: DataBaseService) {
  }

}
