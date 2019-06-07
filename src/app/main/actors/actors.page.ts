import { Component, OnInit } from '@angular/core';

import { LoadingController } from '@ionic/angular';

import { MoviesService } from 'src/app/shared/movies.service';
import { Cast } from 'src/app/shared/cast.model';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.page.html',
  styleUrls: ['./actors.page.scss']
})
export class ActorsPage implements OnInit {
  actors: Cast[];
  isLoading = false;

  constructor(
    private moviesService: MoviesService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.getActorsData();
  }

  getActorsData() {
    this.actors = [];
    this.isLoading = true;
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Loading Data..' })
      .then(loadingEl => {
        loadingEl.present();
        this.moviesService.getActors().subscribe((data: any) => {
          this.actors = data.results;
          // console.table(this.actors);
          this.isLoading = false;
          loadingEl.dismiss();
        });
      });
  }

  // I created this function to filter TV series, since it doesn´t have a title
  // it was generating erros when trying to display it below the actor´s name
  getKnownMoviesOnly(actor: Cast) {
    return actor.known_for.filter(item => item.media_type === 'movie');
  }

  // IMPORTANT: image resolutions avaiable are described in the API here:
  // https://developers.themoviedb.org/3/configuration/get-api-configuration
  // --
  getFullImgPath(target: any, type: string, res: string) {
    let fullImgPath: string;
    const imgBasePath = `https://image.tmdb.org/t/p`;
    if (type === 'actor') {
      const baseW = res === 'hi' ? '632' : '185';
      fullImgPath = `${imgBasePath}/w${baseW}${target.profile_path}`;
    }
    return fullImgPath;
  }
}
