import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Movie } from '../../shared/movie.model';

import { MoviesService } from '../../shared/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss']
})
export class MoviesPage implements OnInit {
  @ViewChild('f') form: NgForm;
  movies: Movie[];
  movieYear = '2019-05-31T00:14:09.369Z';
  genre = 'all';
  sortBy = 'popularity.desc';

  constructor(private moviesService: MoviesService) {}

  ngOnInit() {
    this.showMDBData();
  }

  onSetFilters() {
    this.genre = this.form.value['genre'];
    this.sortBy = this.form.value['sortBy'];
    this.movieYear = this.form.value['date-picker'];
    //console.log(`movies.page|onSetFilters|${this.movieYear}`);
    this.showMDBData();
  }

  showMDBData() {
    this.movies = [];
    this.moviesService
      .getMDBMovies(this.genre, this.sortBy, this.movieYear)
      .subscribe((data: any) => {
        this.movies = data.results;
        //console.log(`movies.page|showMDBData|${this.movies}`);
      });
  }

  getFullPosterPathOLD(movie: Movie, resolution: string) {
    const posterW = resolution === 'hi' ? '600' : '300';
    const posterH = resolution === 'hi' ? '900' : '450';
    const imgBasePath = `https://image.tmdb.org/t/p/w${posterW}_and_h${posterH}_bestv2`;
    const fullPosterPath = imgBasePath + movie.poster_path;
    return fullPosterPath;
  }

  getFullPosterPath(movie: Movie, res: string) {
    let fullPosterPath: string;
    const imgBasePath = `https://image.tmdb.org/t/p`;
    const baseW = res === 'hi' ? '780' : '342';
    fullPosterPath = `${imgBasePath}/w${baseW}${movie.poster_path}`;
    return fullPosterPath;
  }
}
