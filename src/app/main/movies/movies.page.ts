import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController } from '@ionic/angular';

import { Movie } from '../../shared/movie.model';
import { Filters } from 'src/app/shared/filters.model';

import { MoviesService } from '../../shared/movies.service';
import { NavigationService } from 'src/app/shared/navigation.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  @ViewChild('f', { static: true }) form: NgForm;
  movies: Movie[];

  filters: Filters;

  movieRatingPct: string;
  isLoading = false;
  posterParams: any;

  constructor(
    private moviesService: MoviesService,
    private navigationService: NavigationService,
    private loadingCtrl: LoadingController,
  ) {}

  ngOnInit() {
    this.filters = this.moviesService.getCurrentMovieFilters();
    this.showMDBData();
  }

  ionViewWillEnter() {
    const filterParams = this.moviesService.getCurrentMovieFilters();
    this.filters.genre = filterParams.genre; // but it keeps the last filters used (sortby and year)
    this.showMDBData();
  }

  onSetFilters() {
    this.filters.genre = this.form.value['genre'];
    this.filters.sortBy = this.form.value['sortBy'];
    this.filters.year = this.form.value['date-picker'];
    // console.log(`movies.page|onSetFilters|${this.year}`);
    this.moviesService.setCurrentMovieFilters(
      this.filters.genre,
      this.filters.sortBy,
      this.filters.year,
    );
    this.showMDBData();
  }

  showMDBData() {
    this.movies = [];
    this.isLoading = true;
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Loading Data..' })
      .then(loadingEl => {
        loadingEl.present();
        this.moviesService.getMDBMovies().subscribe((data: any) => {
          this.movies = data.results;
          console.log(`showMDBData|this.movies`, this.movies);
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
        res === 'hi'
          ? this.posterParams.hiRes
          : this.posterParams.lowRes;
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
