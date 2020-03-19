import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SegmentChangeEventDetail } from '@ionic/core';
import { ModalController, LoadingController } from '@ionic/angular';

import { MoviesService } from '../../../services/movies.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { Movie } from '../../../models/movie.model';
import { Cast } from 'src/app/models/cast.model';
import { Crew } from 'src/app/models/crew.model';
import { Image } from 'src/app/models/image.model';
import { Trailer } from 'src/app/models/trailer.model';

import { ImageviewerModalComponent } from 'src/app/shared/imageviewer-modal/imageviewer-modal.component';
import { VideoplayerModalComponent } from 'src/app/shared/videoplayer-modal/videoplayer-modal.component';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
})
export class MovieDetailPage implements OnInit {
  loadedMovie: Movie;
  movieId: string;
  movieCast: Cast[];
  movieCrew: Crew[];
  movieRatingPct: string;
  movieImages: Image[];
  moviePosters: Image[];
  movieTrailers: Trailer[];
  movieYear: string;
  showMode: string; // defines the information shown, when using the upper tabs
  currentImgType: string;
  isLoading = false;
  genres: any;
  profileParams: any;
  posterParams: any;
  backdropParams: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private moviesService: MoviesService,
    private navigationService: NavigationService,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
  ) {}

  ngOnInit() {
    // console.log('movie-detail|ngOnInit');
    this.showMode = 'main';
    this.navigationService.setMovieNavMode(this.showMode);
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('movieId')) {
        // redirect
        return;
      }
      this.movieId = paramMap.get('movieId');

      // Should only load new Data if current movie is different!
      const currentLoadedMovie = this.navigationService.getCurrentMovie();
      if (this.movieId !== currentLoadedMovie) {
        this.navigationService.setCurrentMovie(this.movieId);
        this.loadMovieData();
      }
    });
  }

  loadMovieData() {
    this.isLoading = true;
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Loading Data..' })
      .then(loadingEl => {
        loadingEl.present();
        this.moviesService
          .getMDBMovie(this.movieId)
          .subscribe((movie: Movie) => {
            this.loadedMovie = movie;
            this.getMovieCredits();
            this.getMovieImages();
            this.getMovieTrailers();
            this.getGenres();
            this.posterParams = this.moviesService.getPostersParams();
            this.profileParams = this.moviesService.getProfileImgParams();
            this.backdropParams = this.moviesService.getBackdropImgParams();
            this.movieYear = movie.release_date.substring(0, 4);
            this.movieRatingPct = movie.vote_average * 10 + '%';

            // sets the active segment, so when navigating back from Actors content, it shows the last segment visited
            this.showMode = this.navigationService.getMovieNavMode();

            // hides loader
            this.isLoading = false;
            loadingEl.dismiss();
          });
      });
  }

  setGenreAndNavToMovies(genre: any) {
    this.moviesService.setGenre(genre.id.toString());
    this.router.navigate(['/main/tabs/', 'movies']);
  }

  resetMovie() {
    this.navigationService.setCurrentMovie('noMovieDataYet'); // resets current movie
  }

  getGenres() {
    this.moviesService.getGenres().subscribe((data: any) => {
      this.genres = data.genres;
    });
  }

  getGenreName(genreId: number) {
    const result = this.genres.filter(genre => genre.id === genreId);
    return result[0].name;
  }

  onSegmentChange(event: CustomEvent<SegmentChangeEventDetail>) {
    if (event.detail.value === 'main') {
      this.showMode = 'main';
    } else if (event.detail.value === 'cast') {
      this.showMode = 'cast';
    } else if (event.detail.value === 'gallery') {
      this.showMode = 'gallery';
    } else if (event.detail.value === 'posters') {
      this.showMode = 'posters';
    } else if (event.detail.value === 'trailers') {
      this.showMode = 'trailers';
    }
    this.navigationService.setMovieNavMode(this.showMode);
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

  openVideoPlayerModal(trailerID: string) {
    this.modalCtrl
      .create({
        component: VideoplayerModalComponent,
        componentProps: {
          trailerID: trailerID,
        },
      })
      .then(modalEl => {
        modalEl.present();
      });
  }

  getMovieCredits() {
    this.moviesService
      .getMovieCredits(this.loadedMovie.id)
      .subscribe((movieCredits: any) => {
        this.movieCast = movieCredits.cast;
        this.movieCrew = movieCredits.crew.filter(
          (crewMember, idx) => idx < 10, // just take the first 10 crew members, please
        );
        // console.table(this.movieCrew);
      });
  }

  getMovieImages() {
    this.moviesService
      .getMovieImages(this.loadedMovie.id)
      .subscribe((imgData: any) => {
        this.movieImages = imgData.backdrops;
        this.moviePosters = imgData.posters.filter(
          poster => poster.iso_639_1 === 'en',
        );
      });
  }

  getMovieTrailers() {
    this.moviesService
      .getMovieTrailers(this.loadedMovie.id)
      .subscribe((data: any) => {
        this.movieTrailers = data.results.filter(
          trailer => trailer.type === 'Trailer',
        );
      });
  }

  getMovieDuration(totalMin: number) {
    const hours = totalMin / 60;
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes);
    if (rminutes === 0) {
      return rhours + ' h';
    } else {
      return rhours + ' h  ' + rminutes + ' min';
    }
  }

  getTrailerThumbPath(trailerID: string) {
    return `https://img.youtube.com/vi/${trailerID}/mqdefault.jpg`;
  }

  getFullImgPath(type: string, res: string, filePath: string) {
    // Saving this so I can adjust modal ratio accordingly (poster = portrait...)
    this.currentImgType = type;

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
    // console.log(`movie-detail|fullImgPath: ${fullImgPath}`);
    return fullImgPath;
  }
}
