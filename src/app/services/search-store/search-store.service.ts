import { Injectable } from '@angular/core';
import { createStore } from 'redux';

export class SearchState {
  constructor(public searchText = '', public genre = '', public page = 1) { }
}

// The actions for this store
export enum SearchActionsTypes {
  newGenre = 'NEW_GENRE',
  newSearch = 'NEW_SEARCH_STRING',
  setPage = 'SET_PAGE',
  reset = 'RESET'
}

@Injectable({
  providedIn: 'root'
})
export class SearchStoreService {
  store = createStore(counter);

  constructor() {
  }

  getState() {
    return this.store.getState();
  }

  changeState(action) {
    this.store.dispatch(action);
  }

  reset() {
    this.store.dispatch({ type: SearchActionsTypes.reset });
  }

}
//
function counter(state: SearchState = new SearchState(), action) {
  // This reducer accepts 4 actions: 1 to change to searchText, 1 to change to Genre, 1 to set the page and 1 to reset the status.
  switch (action.type) {
    case SearchActionsTypes.newSearch:
      return new SearchState(action.value, state.genre, 1);

    case SearchActionsTypes.newGenre:
      return new SearchState(state.searchText, action.value, 1);

    case SearchActionsTypes.setPage:
      return new SearchState(state.searchText, state.genre, action.value);

    case SearchActionsTypes.reset:
      return new SearchState();

    default:
      return state;
  }
}
