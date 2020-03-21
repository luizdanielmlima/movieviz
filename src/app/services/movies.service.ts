import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import apiData from '../../assets/mdb-api-key.json';

import { Movie } from '../models/movie.model';
import { Filters } from '../models/filters.model.js';

export interface ApiInfo {
  type: string;
  key: string;
}

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  apiKey: string;
  extData: ApiInfo = apiData;
  currentFilters: Filters = {
    genre: 'all',
    sortBy: 'popularity.desc',
    year: new Date().getFullYear().toString(),
  };
  imgConfig: any;
  baseURL: string;
  // movies: Movie[] = [
  //   {
  //     id: 'm1',
  //     title: 'Avengers: End Game',
  //     poster_path:
  //       'https://image.tmdb.org/t/p/w600_and_h900_bestv2/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
  //     release_date: '2019',
  //     vote_average: 8.3,
  //     overview: 'Lorem ipsum ',
  //   },
  //   {
  //     id: 'm2',
  //     title: 'Captain Marvel',
  //     poster_path:
  //       'https://image.tmdb.org/t/p/w600_and_h900_bestv2/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg',
  //     release_date: '2019',
  //     vote_average: 8.1,
  //     overview: 'Lorem ipsum ',
  //   },
  // ];

  constructor(private http: HttpClient) {
    this.apiKey = this.extData.key;
    // console.log(this.currentFilters);
  }

  setMDBImgConfig() {
    console.log(this.currentFilters);
    this.http
      .get(
        `https://api.themoviedb.org/3/configuration?api_key=${this.apiKey}&language=en-US`,
      )
      .subscribe((config: any) => {
        this.imgConfig = config.images;
        this.baseURL = this.imgConfig.secure_base_url;
      });
  }

  // IMPORTANT: image resolutions avaiable are described in the API here:
  // https://developers.themoviedb.org/3/configuration/get-api-configuration
  getPostersParams() {
    const posterParams = {
      baseURL: this.baseURL,
      hiRes: this.imgConfig.poster_sizes[5],
      lowRes: this.imgConfig.poster_sizes[2],
    };
    // console.log(posterParams);
    return posterParams;
  }

  getProfileImgParams() {
    const profileImgParams = {
      baseURL: this.baseURL,
      hiRes: this.imgConfig.profile_sizes[2],
      lowRes: this.imgConfig.profile_sizes[1],
    };
    // console.log(profileImgParams);
    return profileImgParams;
  }

  getBackdropImgParams() {
    const backdropImgParams = {
      baseURL: this.baseURL,
      hiRes: this.imgConfig.backdrop_sizes[2],
      lowRes: this.imgConfig.backdrop_sizes[0],
    };
    // console.log(backdropImgParams);
    return backdropImgParams;
  }

  setCurrentMovieFilters(
    genre: string,
    sortBy: string,
    year: string,
  ) {
    this.currentFilters = { genre, sortBy, year };
  }

  setGenre(genre: string) {
    this.currentFilters.genre = genre;
  }

  getCurrentMovieFilters(): Filters {
    return this.currentFilters;
  }

  getMDBMovies() {
    const genre = this.currentFilters.genre;
    const sortBy = this.currentFilters.sortBy;
    const year = this.currentFilters.year;
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
      `https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&language=en-US&${sortByQuery}&include_adult=false&include_video=false&page=1&${genreQuery}&${yearFromQuery}&${yearToQuery}`,
    );
  }

  getMDBMoviesOLD(genre: string, sortBy: string, year: string) {
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
      `https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&language=en-US&${sortByQuery}&include_adult=false&include_video=false&page=1&${genreQuery}&${yearFromQuery}&${yearToQuery}`,
    );
  }

  getMDBMovie(movieId: string) {
    return this.http.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${this.apiKey}&language=en-US`,
    );
  }

  getMovieCredits(movieId: string) {
    return this.http.get(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${this.apiKey}&language=en-US`,
    );
  }

  getMovieImages(movieId: string) {
    return this.http.get(
      `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${this.apiKey}`,
    );
  }

  getMovieTrailers(movieId: string) {
    return this.http.get(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${this.apiKey}`,
    );
  }

  getGenres() {
    return this.http.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}`,
    );
  }

  getActors() {
    return this.http.get(
      `https://api.themoviedb.org/3/person/popular?api_key=${this.apiKey}&language=en-US`,
    );
  }

  getActor(actorId: string) {
    return this.http.get(
      `https://api.themoviedb.org/3/person/${actorId}?api_key=${this.apiKey}&language=en-US`,
    );
  }

  getActorMovies(actorId: string) {
    return this.http.get(
      `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${this.apiKey}&language=en-US`,
    );
  }

  getActorImages(actorId: string) {
    return this.http.get(
      `https://api.themoviedb.org/3/person/${actorId}/images?api_key=${this.apiKey}&language=en-US`,
    );
  }

  // methods below are only for local data (testing)
  // getAllMovies() {
  //   return [...this.movies];
  // }

  // getMovie(movieId: string) {
  //   return {
  //     ...this.movies.find(movie => {
  //       return movie.id === movieId;
  //     }),
  //   };
  // }
}
