import { Component, OnInit } from '@angular/core';

import { LoadingController } from '@ionic/angular';

import { MoviesService } from 'src/app/shared/movies.service';
import { NavigationService } from 'src/app/shared/navigation.service';
import { Cast } from 'src/app/shared/cast.model';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.page.html',
  styleUrls: ['./actors.page.scss']
})
export class ActorsPage implements OnInit {
  actors: Cast[];
  isLoading = false;
  profileImgParams: any;

  constructor(
    private moviesService: MoviesService,
    private loadingCtrl: LoadingController,
    private navigationService: NavigationService
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
          this.navigationService.setCurrentActor('noActorDataYet');
          this.profileImgParams = this.moviesService.getProfileImgParams();
          this.isLoading = false;
          loadingEl.dismiss();
        });
      });
  }

  // I created this function to filter out the TV series
  // it was generating erros when trying to display it below the actor´s name
  getKnownMoviesOnly(actor: Cast) {
    return actor.known_for.filter(item => item.media_type === 'movie');
  }

  getFullImgPath(type: string, res: string, filePath: string) {
    const baseURL = this.profileImgParams.baseURL;
    const size =
      res === 'low'
        ? this.profileImgParams.hiRes
        : this.profileImgParams.lowRes;
    const fullImgPath = `${baseURL}/${size}${filePath}`;
    return fullImgPath;
  }
}
