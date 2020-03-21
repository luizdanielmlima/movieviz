import { Injectable } from '@angular/core';
import { Movie } from '../models/movie.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WatchlistService {
  favs = {
    movies: [],
  };
  private newFavDataSource = new Subject<Movie[]>();
  currentFavData = this.newFavDataSource.asObservable();

  constructor() {
    if (localStorage.getItem('movievizWL') != null) {
      this.favs = JSON.parse(localStorage.getItem('movievizWL'));
    }
  }

  saveFavsStorage() {
    localStorage.setItem('movievizWL', JSON.stringify(this.favs));
    // console.log(this.favs);
  }

  // MOVIES methods

  setMovieFav(movie: Movie) {
    if (this.movieIsFavorite(movie.id)) {
      // movie is already in the list, then remove it
      // console.log(`favServices|remove Fav from item id: ${movie.id}`);
      const index = this.favs.movies.findIndex(
        el => el.id === movie.id,
      );
      this.favs.movies.splice(index, 1);
    } else if (!this.movieIsFavorite(movie.id)) {
      // movie is not in the list, then remove it
      // console.log(`favServices|add Fav to item id: ${movie.id}`);
      this.favs.movies.push(movie);
    }
    this.saveFavsStorage();
    this.newFavDataSource.next(this.favs.movies);
  }

  setMovieFavs(favs: Movie[]) {
    this.favs.movies = favs;
    this.saveFavsStorage();
  }

  getMovieFavs(): Movie[] {
    return this.favs.movies;
  }

  movieIsFavorite(movieId: string) {
    const answer =
      this.favs.movies.findIndex(el => el.id === movieId) !== -1;
    // console.log(
    //   `favServices|movie ${movieId} Is Favorite? : ${answer}`,
    // );
    return answer;
  }
}
