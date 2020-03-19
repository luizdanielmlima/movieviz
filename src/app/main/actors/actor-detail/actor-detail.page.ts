import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SegmentChangeEventDetail } from '@ionic/core';
import { ModalController, LoadingController } from '@ionic/angular';

import { MoviesService } from '../../../shared/movies.service';
import { NavigationService } from 'src/app/shared/navigation.service';
import { Movie } from '../../../models/movie.model';
import { Cast } from 'src/app/models/cast.model';
import { Image } from 'src/app/models/image.model';
import { ImageviewerModalComponent } from 'src/app/shared/imageviewer-modal/imageviewer-modal.component';

@Component({
  selector: 'app-actor-detail',
  templateUrl: './actor-detail.page.html',
  styleUrls: ['./actor-detail.page.scss'],
})
export class ActorDetailPage implements OnInit {
  loadedActor: Cast;
  actorId: string;
  movieCredits: any[];
  actorImages: Image[];
  showMode: string; // defines the information shown, when using the upper tabs
  isLoading = false;
  profileParams: any;
  posterParams: any;
  backdropParams: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private moviesService: MoviesService,
    private navigationService: NavigationService,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
  ) {}

  ngOnInit() {
    this.showMode = 'main';
    this.navigationService.setActorNavMode(this.showMode);
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('actorId')) {
        // redirect
        return;
      }
      this.actorId = paramMap.get('actorId');

      // Should only load new Data if current actor is different!
      const currentLoadedActor = this.navigationService.getCurrentActor();
      if (this.actorId !== currentLoadedActor) {
        this.navigationService.setCurrentActor(this.actorId);
        this.loadActorData();
      }
    });
  }

  loadActorData() {
    this.isLoading = true;
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Loading Data..' })
      .then(loadingEl => {
        loadingEl.present();
        this.moviesService
          .getActor(this.actorId)
          .subscribe((actor: Cast) => {
            this.loadedActor = actor;
            this.showMode = 'main';
            this.getActorFilmography();
            this.getActorImages();
            this.posterParams = this.moviesService.getPostersParams();
            this.profileParams = this.moviesService.getProfileImgParams();
            this.backdropParams = this.moviesService.getBackdropImgParams();

            // sets the active segment, so when navigating back from Actors content, it shows the last segment visited
            this.showMode = this.navigationService.getActorNavMode();

            // hides loader
            this.isLoading = false;
            loadingEl.dismiss();
          });
      });
  }

  resetActor() {
    this.navigationService.setCurrentActor('noActorDataYet');
  }

  getActorImages() {
    this.moviesService
      .getActorImages(this.actorId)
      .subscribe((images: any) => {
        this.actorImages = images.profiles;
      });
  }

  getActorFilmography() {
    this.moviesService
      .getActorMovies(this.actorId)
      .subscribe((credits: any) => {
        const tempMovieCredits = [...credits.cast];
        this.movieCredits = tempMovieCredits
          .filter(item => item.poster_path !== null)
          .sort((a, b) => {
            return (
              this.dateToNum(a.release_date) -
              this.dateToNum(b.release_date)
            );
          })
          .reverse();
        // console.log(this.movieCredits);
      });
  }

  openGalleryModal(fullImgPath: string) {
    this.modalCtrl
      .create({
        component: ImageviewerModalComponent,
        cssClass: 'mediaviewer-modal',
        componentProps: {
          fullPath: fullImgPath,
        },
      })
      .then(modalEl => {
        modalEl.present();
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
    this.navigationService.setActorNavMode(this.showMode);
  }

  getFullImgPath(type: string, res: string, filePath: string) {
    let fullImgPath: string;
    if (filePath === null) {
      fullImgPath = '../../../../assets/placeholder.png';
    } else {
      let baseURL: string;
      let size: string;
      if (type === 'profile') {
        baseURL = this.profileParams.baseURL;
        size =
          res === 'hi'
            ? this.profileParams.hiRes
            : this.profileParams.lowRes;
      } else if (type === 'poster') {
        baseURL = this.posterParams.baseURL;
        size =
          res === 'hi'
            ? this.posterParams.hiRes
            : this.posterParams.lowRes;
      } else if (type === 'backdrop') {
        baseURL = this.backdropParams.baseURL;
        size =
          res === 'hi'
            ? this.backdropParams.hiRes
            : this.backdropParams.lowRes;
      }
      fullImgPath = `${baseURL}${size}${filePath}`;
    }
    // console.log(`actor-detail|fullImgPath: ${fullImgPath}`);
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
