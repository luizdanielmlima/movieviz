import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { Movie } from './movie.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private apiKey = environment.mdbAPIKey;
  private movies: Movie[] = [
    {
      id: 'm1',
      title: 'Avengers: End Game',
      poster_path:
        'https://image.tmdb.org/t/p/w600_and_h900_bestv2/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
      release_date: '2019',
      vote_average: 8.3,
      overview: 'Lorem ipsum '
    },
    {
      id: 'm2',
      title: 'Captain Marvel',
      poster_path:
        'https://image.tmdb.org/t/p/w600_and_h900_bestv2/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg',
      release_date: '2019',
      vote_average: 8.1,
      overview: 'Lorem ipsum '
    },
    {
      id: 'm3',
      title: 'Shazam!',
      poster_path:
        'https://image.tmdb.org/t/p/w600_and_h900_bestv2/xnopI5Xtky18MPhK40cZAGAOVeV.jpg',
      release_date: '2019',
      vote_average: 7.8,
      overview: 'Lorem ipsum '
    },
    {
      id: 'm4',
      title: 'Aladdin',
      poster_path:
        'https://image.tmdb.org/t/p/w600_and_h900_bestv2/3iYQTLGoy7QnjcUYRJy4YrAgGvp.jpg',
      release_date: '2019',
      vote_average: 7.9,
      overview: 'Lorem ipsum '
    }
  ];

  constructor(private http: HttpClient) {}

  getAPIKey() {
    return environment.mdbAPIKey;
  }

  getMDBMovies(genre: string, sortBy: string, year: string) {
    // set query values
    let genreQuery: string;
    if (genre === 'all') {
      genreQuery = ''; // all genres was selected
    } else {
      genreQuery = `with_genres=${genre}`;
    }

    const yearOnlyString = year.substring(0, 4);
    const yearFromQuery = `primary_release_date.gte=${yearOnlyString}-01-01`;
    const yearToQuery = `primary_release_date.lte=${yearOnlyString}-12-30`;

    const sortByQuery = `sort_by=${sortBy}`;

    return this.http.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${
        this.apiKey
      }&language=en-US&${sortByQuery}&include_adult=false&include_video=false&page=1&${genreQuery}&${yearFromQuery}&${yearToQuery}`
    );
  }

  getMDBMovie(movieId: string) {
    return this.http.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${
        this.apiKey
      }&language=en-US`
    );
  }

  getMovieCredits(movieId: string) {
    return this.http.get(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${
        this.apiKey
      }&language=en-US`
    );
  }

  getMovieImages(movieId: string) {
    return this.http.get(
      `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${
        this.apiKey
      }`
    );
  }

  getGenres() {
    return this.http.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}`
    );
  }

  getActors() {
    return this.http.get(
      `https://api.themoviedb.org/3/person/popular?api_key=${
        this.apiKey
      }&language=en-US`
    );
  }

  getActor(actorId: string) {
    return this.http.get(
      `https://api.themoviedb.org/3/person/${actorId}?api_key=${
        this.apiKey
      }&language=en-US`
    );
  }

  getActorMovies(actorId: string) {
    return this.http.get(
      `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${
        this.apiKey
      }&language=en-US`
    );
  }

  getActorImages(actorId: string) {
    return this.http.get(
      `https://api.themoviedb.org/3/person/${actorId}/images?api_key=${
        this.apiKey
      }&language=en-US`
    );
  }

  // methods below are only for local data (testing)
  getAllMovies() {
    return [...this.movies];
  }

  getMovie(movieId: string) {
    return {
      ...this.movies.find(movie => {
        return movie.id === movieId;
      })
    };
  }
}
