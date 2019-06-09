import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController } from '@ionic/angular';

import { Movie } from '../../shared/movie.model';
import { MoviesService } from '../../shared/movies.service';
import { NavigationService } from 'src/app/shared/navigation.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss']
})
export class MoviesPage implements OnInit {
  @ViewChild('f') form: NgForm;
  movies: Movie[];
  movieYear = '2019-05-31T00:14:09.369Z';
  movieRatingPct: string;
  genre = 'all';
  sortBy = 'popularity.desc';
  isLoading = false;

  constructor(
    private moviesService: MoviesService,
    private navigationService: NavigationService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.showMDBData();
  }

  onSetFilters() {
    this.genre = this.form.value['genre'];
    this.sortBy = this.form.value['sortBy'];
    this.movieYear = this.form.value['date-picker'];
    // console.log(`movies.page|onSetFilters|${this.movieYear}`);
    this.showMDBData();
  }

  showMDBData() {
    this.movies = [];
    this.isLoading = true;
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Loading Data..' })
      .then(loadingEl => {
        loadingEl.present();
        this.moviesService
          .getMDBMovies(this.genre, this.sortBy, this.movieYear)
          .subscribe((data: any) => {
            this.movies = data.results;
            this.navigationService.setCurrentMovie('noMovieDataYet'); // resets current actor
            this.isLoading = false;
            loadingEl.dismiss();
          });
      });
  }

  getMovieRatingPct(movie: Movie) {
    return (this.movieRatingPct = movie.vote_average * 10 + '%');
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

  getYear(fullDate: string) {
    if (fullDate) {
      const movieYear = fullDate.substring(0, 4);
      return movieYear;
    } else {
      return '';
    }
  }
}
