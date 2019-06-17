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
  posterParams: any;

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
            this.navigationService.setCurrentMovie('noMovieDataYet'); // resets current movie
            this.posterParams = this.moviesService.getPostersParams();
            this.isLoading = false;
            loadingEl.dismiss();
          });
      });
  }

  getMovieRatingPct(movie: Movie) {
    return (this.movieRatingPct = movie.vote_average * 10 + '%');
  }

  getFullImgPath(type: string, res: string, filePath: string) {
    let fullImgPath: string;
    if (filePath === null) {
      fullImgPath = '../../../../assets/placeholder.png';
    } else {
      const baseURL = this.posterParams.baseURL;
      const size =
        res === 'hi' ? this.posterParams.hiRes : this.posterParams.lowRes;
      fullImgPath = `${baseURL}/${size}${filePath}`;
    }
    // console.log(fullImgPath);
    return fullImgPath;
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
