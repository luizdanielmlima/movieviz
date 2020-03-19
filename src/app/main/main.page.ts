import { Component, OnInit } from '@angular/core';

import { NavigationService } from '../services/navigation.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  activeTab = 'movies';
  imgConfig: any;

  constructor(
    private navigationService: NavigationService,
    private moviesService: MoviesService,
  ) {}

  ngOnInit() {
    // this saves, in the Service, the image resolutions for posters, backdrops, etc.
    this.moviesService.setMDBImgConfig();
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
