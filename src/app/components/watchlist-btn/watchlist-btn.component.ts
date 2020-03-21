import { Component, OnInit, Input } from '@angular/core';

import { Movie } from 'src/app/models/movie.model';
import { WatchlistService } from 'src/app/services/watchlist.service';

@Component({
  selector: 'app-watchlist-btn',
  templateUrl: './watchlist-btn.component.html',
  styleUrls: ['./watchlist-btn.component.scss'],
})
export class WatchlistBtnComponent implements OnInit {
  @Input() movie: Movie;
  @Input() mode = 'compact';

  constructor(private watchlistService: WatchlistService) {}

  ngOnInit() {}

  setFav() {
    console.log(`fav-button|setFav:`);
    this.watchlistService.setMovieFav(this.movie);
  }

  isFav(): boolean {
    return this.watchlistService.movieIsFavorite(this.movie.id);
  }
}
