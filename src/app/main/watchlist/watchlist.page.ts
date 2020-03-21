import { Component, OnInit, ViewChild } from '@angular/core';

import { Movie } from 'src/app/models/movie.model';
import { WatchlistService } from 'src/app/services/watchlist.service';
import { MoviesService } from 'src/app/services/movies.service';
import { Filters } from 'src/app/models/filters.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.page.html',
  styleUrls: ['./watchlist.page.scss'],
})
export class WatchlistPage implements OnInit {
  @ViewChild('f', { static: true }) form: NgForm;
  watchlist: Movie[];
  filteredWatchlist: Movie[];
  posterParams: any;
  filters: Filters;

  constructor(
    private watchlistService: WatchlistService,
    private moviesService: MoviesService,
  ) {}

  ngOnInit() {
    this.filters = this.moviesService.getCurrentMovieFilters();
  }

  ionViewWillEnter() {
    const filterParams = this.moviesService.getCurrentMovieFilters();
    this.filters.genre = filterParams.genre; // but it keeps the last filters used (sortby and year)
    this.posterParams = this.moviesService.getPostersParams();
    this.watchlist = this.watchlistService.getMovieFavs();
    console.log('watchlist: ', this.watchlist);
    this.filteredWatchlist = [...this.watchlist];
  }

  onSetFilters() {
    this.filteredWatchlist = [];
    this.filters.genre = this.form.value['genre'];

    if (this.filters.genre === 'all') {
      this.filteredWatchlist = [...this.watchlist];
    } else {
      this.watchlist.forEach(movie => {
        const hasGenre = movie.genre_ids.includes(
          +this.filters.genre,
        );
        // console.log(
        //   `movie ${movie.title} has genre ${this.filters.genre}? ${hasGenre}`,
        // );
        if (hasGenre) {
          this.filteredWatchlist.push(movie);
        }
      });
    }
  }
}
