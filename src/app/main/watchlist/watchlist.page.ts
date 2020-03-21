import { Component, OnInit } from '@angular/core';

import { Movie } from 'src/app/models/movie.model';
import { WatchlistService } from 'src/app/services/watchlist.service';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.page.html',
  styleUrls: ['./watchlist.page.scss'],
})
export class WatchlistPage implements OnInit {
  watchlist: Movie[];
  posterParams: any;

  constructor(
    private watchlistService: WatchlistService,
    private moviesService: MoviesService,
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.posterParams = this.moviesService.getPostersParams();
    this.watchlist = this.watchlistService.getMovieFavs();
  }
}
