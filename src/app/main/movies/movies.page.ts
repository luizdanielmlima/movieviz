import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController } from '@ionic/angular';

import { Movie } from '../../models/movie.model';
import { Filters } from 'src/app/models/filters.model';

import { MoviesService } from '../../services/movies.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { MovieListComponent } from 'src/app/components/movie-list/movie-list.component';

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
    const curYear = new Date().getFullYear().toString();
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
}
