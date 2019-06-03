import { Component, OnInit } from '@angular/core';

import { MoviesService } from 'src/app/shared/movies.service';
import { Cast } from 'src/app/shared/cast.model';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.page.html',
  styleUrls: ['./actors.page.scss']
})
export class ActorsPage implements OnInit {
  actors: Cast[];

  constructor(private moviesService: MoviesService) {}

  ngOnInit() {
    this.getActorsData();
  }

  getActorsData() {
    this.actors = [];
    this.moviesService.getActors().subscribe((data: any) => {
      this.actors = data.results;
      //console.log(`actors.page|showMDBData|${this.actors}`);
    });
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
