import { Component, OnInit } from '@angular/core';
import { DataBaseService } from 'src/app/services/database/data-base.service';
import { SearchStoreService } from 'src/app/services/search-store/search-store.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
    mostAppreciated = [];

    constructor(dataBase: DataBaseService, private searchStore: SearchStoreService) {
        this.mostAppreciated = dataBase.getBestRated(5);
    }

    ngOnInit() {
        this.searchStore.reset();
    }

}
