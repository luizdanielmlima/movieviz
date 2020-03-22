import { Component, OnInit } from '@angular/core';

import { NavigationService } from '../services/navigation.service';
import { MoviesService } from '../services/movies.service';
import { WatchlistService } from '../services/watchlist.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  activeTab = 'movies';
  imgConfig: any;
  animIcon = false;

  constructor(
    private navigationService: NavigationService,
    private moviesService: MoviesService,
    private watchlistService: WatchlistService,
  ) {}

  ngOnInit() {
    // this saves, in the Service, the image resolutions for posters, backdrops, etc.
    this.moviesService.setMDBImgConfig();

    // This updates the watchlist when user adds/removes a movie by clicking the cover icon
    this.watchlistService.currentFavData.subscribe(data => {
      console.log('anim watchlist change');
      this.animIcon = true;
      setTimeout(() => (this.animIcon = false), 800);
    });
  }

  onTabClicked(whichTab: string) {
    // console.log('Current Tab: ' + this.activeTab);
    if (whichTab === this.activeTab) {
      // in this case it´s necessary to reset the actor or movie (solves bug when the same actor seen was clicked again)
      if (whichTab === 'movies') {
        this.navigationService.setCurrentMovie('noMovieDataYet');
      } else if (whichTab === 'actors') {
        this.navigationService.setCurrentActor('noActorDataYet');
      } else if (whichTab === 'watchlist') {
        // nothing here... for now
      }
    }
    this.activeTab = whichTab;
  }
}
