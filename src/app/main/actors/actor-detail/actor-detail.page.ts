import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SegmentChangeEventDetail } from '@ionic/core';

import { MoviesService } from '../../../shared/movies.service';
import { Movie } from '../../../shared/movie.model';
import { Cast } from 'src/app/shared/cast.model';
import { Image } from 'src/app/shared/image.model';

@Component({
  selector: 'app-actor-detail',
  templateUrl: './actor-detail.page.html',
  styleUrls: ['./actor-detail.page.scss']
})
export class ActorDetailPage implements OnInit {
  loadedActor: Cast;
  movieCredits: any[];
  actorImages: Image[];
  showMode: string; // defines the information shown, when using the upper tabs

  constructor(
    private activatedRoute: ActivatedRoute,
    private moviesService: MoviesService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('actorId')) {
        // redirect
        return;
      }
      const actorId = paramMap.get('actorId');
      this.moviesService.getActor(actorId).subscribe((actor: Cast) => {
        this.loadedActor = actor;
        this.showMode = 'main';
        // console.log(this.loadedActor);
      });
      this.moviesService.getActorMovies(actorId).subscribe((credits: any) => {
        this.movieCredits = credits.cast;
        // console.log(this.movieCredits);
      });
      this.moviesService.getActorImages(actorId).subscribe((images: any) => {
        this.actorImages = images.profiles;
        console.log(this.actorImages);
      });
    });
  }

  onSegmentChange(event: CustomEvent<SegmentChangeEventDetail>) {
    if (event.detail.value === 'main') {
      this.showMode = 'main';
    } else if (event.detail.value === 'credits') {
      this.showMode = 'credits';
    } else if (event.detail.value === 'gallery') {
      this.showMode = 'gallery';
    }
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
    } else if (type === 'backdrop') {
      const baseW = res === 'hi' ? '1280' : '300';
      fullImgPath = `${imgBasePath}/w${baseW}${target.file_path}`;
    } else if (type === 'poster') {
      const baseW = res === 'hi' ? '780' : '342';
      fullImgPath = `${imgBasePath}/w${baseW}${target.poster_path}`;
    }
    return fullImgPath;
  }
}
