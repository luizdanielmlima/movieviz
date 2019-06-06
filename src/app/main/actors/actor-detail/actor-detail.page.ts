import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SegmentChangeEventDetail } from '@ionic/core';
import { ModalController } from '@ionic/angular';

import { MoviesService } from '../../../shared/movies.service';
import { Movie } from '../../../shared/movie.model';
import { Cast } from 'src/app/shared/cast.model';
import { Image } from 'src/app/shared/image.model';
import { ImageviewerModalComponent } from 'src/app/shared/imageviewer-modal/imageviewer-modal.component';

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
    private moviesService: MoviesService,
    private modalCtrl: ModalController
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
      this.getActorFilmography(actorId);
      this.moviesService.getActorImages(actorId).subscribe((images: any) => {
        this.actorImages = images.profiles;
        // console.log(this.actorImages);
      });
    });
  }

  openGalleryModal(imagePath: Image) {
    this.modalCtrl
      .create({
        component: ImageviewerModalComponent,
        componentProps: {
          imgPath: imagePath,
          title: 'Actor Gallery'
        }
      })
      .then(modalEl => {
        modalEl.present();
      });
  }

  getActorFilmography(actorId: string) {
    this.moviesService.getActorMovies(actorId).subscribe((credits: any) => {
      const tempMovieCredits = [...credits.cast];
      this.movieCredits = tempMovieCredits
        .filter(item => item.poster_path !== null)
        .sort((a, b) => {
          return (
            this.dateToNum(a.release_date) - this.dateToNum(b.release_date)
          );
        })
        .reverse();
      // console.log(this.movieCredits);
    });
  }

  dateToNum(date: string) {
    let dateAsNumber: number;
    if (!date) {
      dateAsNumber = 0;
    } else {
      dateAsNumber = Number(date.replace(/-/g, ''));
    }
    return dateAsNumber;
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
      const baseW = res === 'hi' ? '780' : '342';
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

  getYear(fullDate: string) {
    if (fullDate) {
      const movieYear = fullDate.substring(0, 4);
      return movieYear;
    } else {
      return '';
    }
  }
}
