import { TestBed } from '@angular/core/testing';

import { SearchStoreService, SearchActionsTypes } from './search-store.service';

describe('SearchStoreService', () => {

  let service: SearchStoreService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(SearchStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have empty searchString and empty genre and page 1', () => {
    const state = service.getState();

    expect(state.genre).toBe('');
    expect(state.searchText).toBe('');
    expect(state.page).toBe(1);
  });
  it('should have Deadpool as searchInput and comedy as genre and 5 as page', () => {
    service.store.dispatch({ type: SearchActionsTypes.newGenre, value: 'comedy' });
    let state = service.getState();
    expect(state.genre).toBe('comedy'); // check if it set the genre
    expect(state.page).toBe(1); // check if the default page is 1

    service.store.dispatch({ type: SearchActionsTypes.newSearch, value: 'Deadpool' });
    state = service.getState();
    expect(state.searchText).toBe('Deadpool'); // check if it set the searchText

    service.store.dispatch({ type: SearchActionsTypes.setPage, value: 5 });
    state = service.getState();
    expect(state.page).toBe(5); // check if it changed the page
    expect(state.searchText).toBe('Deadpool'); // check if it kept the searchText
    expect(state.genre).toBe('comedy'); // check if it kept the genre
  });

  it('should reset the state to the default one', () => {
    let state = service.getState();
    expect(state.genre).toBe('');
    expect(state.searchText).toBe('');
    expect(state.page).toBe(1);
    service.store.dispatch({ type: SearchActionsTypes.setPage, value: 5 });
    service.store.dispatch({ type: SearchActionsTypes.newGenre, value: 'comedy' });
    service.store.dispatch({ type: SearchActionsTypes.newSearch, value: 'Deadpool' });
    service.reset();
    state = service.getState();
    expect(state.genre).toBe('');
    expect(state.searchText).toBe('');
    expect(state.page).toBe(1);
  });
});
