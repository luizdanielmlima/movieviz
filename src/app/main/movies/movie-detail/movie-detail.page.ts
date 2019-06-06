import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SegmentChangeEventDetail } from '@ionic/core';
import { ModalController, LoadingController } from '@ionic/angular';

import { MoviesService } from '../../../shared/movies.service';
import { Movie } from '../../../shared/movie.model';
import { Cast } from 'src/app/shared/cast.model';
import { Crew } from 'src/app/shared/crew.model';
import { Image } from 'src/app/shared/image.model';
import { ImageviewerModalComponent } from 'src/app/shared/imageviewer-modal/imageviewer-modal.component';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss']
})
export class MovieDetailPage implements OnInit {
  loadedMovie: Movie;
  movieId: string;
  movieCast: Cast[];
  movieCrew: Crew[];
  movieRatingPct: string;
  movieImages: Image[];
  moviePosters: Image[];
  movieYear: string;
  showMode: string; // defines the information shown, when using the upper tabs
  isLoading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private moviesService: MoviesService,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('movieId')) {
        // redirect
        return;
      }
      this.movieId = paramMap.get('movieId');
      this.loadMovieData();
    });
  }

  loadMovieData() {
    this.isLoading = true;
    this.loadingCtrl
    .create({ keyboardClose: true, message: 'Loading Data..' })
    .then(loadingEl => {
      loadingEl.present();
      this.moviesService.getMDBMovie(this.movieId).subscribe((movie: Movie) => {
        this.loadedMovie = movie;
        this.getMovieCredits();
        this.getMovieImages();
        this.movieYear = movie.release_date.substring(0, 4);
        this.movieRatingPct = (movie.vote_average * 10) +"%";
        this.showMode = 'main';
        this.isLoading = false;
        loadingEl.dismiss();
        // console.log(this.loadedMovie);
      });
    });
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
    }
  }

  openGalleryModal(imagePath: Image) {
    this.modalCtrl
      .create({
        component: ImageviewerModalComponent,
        componentProps: {
          imgPath: imagePath,
          title: 'Movie Gallery'
        }
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
          (crewMember, idx) => idx < 10 // just take the first 10 crew members, please
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
          poster => poster.iso_639_1 === 'en'
        );
        // console.table(this.movieImages);
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

  // THIS FUNCTION WAS REPLACED BY JUST USING PIPES IN THE HTML...!!
  moneyToString(money: number) {
    const moneyStr = money.toString();
    const numLength = moneyStr.length;
    const rest = numLength % 3;
    const lastNum = rest === 0 ? 3 : rest;
    let hundreds, thousands, millions, billions;
    if (numLength <= 3) {
      hundreds = moneyStr.substr(-3, numLength);
      return `$ ${hundreds}.00`;
    } else if (numLength > 3 && numLength <= 6) {
      hundreds = moneyStr.substr(-3, 3);
      thousands = moneyStr.substr(-6, lastNum);
      return `$ ${thousands},${hundreds}.00`;
    } else if (numLength > 6 && numLength <= 9) {
      hundreds = moneyStr.substr(-3, 3);
      thousands = moneyStr.substr(-6, 3);
      millions = moneyStr.substr(-9, lastNum);
      return `$ ${millions},${thousands},${hundreds}.00`;
    } else if (numLength > 9 && numLength <= 12) {
      hundreds = moneyStr.substr(-3, 3);
      thousands = moneyStr.substr(-6, 3);
      millions = moneyStr.substr(-9, 3);
      billions = moneyStr.substr(-12, lastNum);
      return `$ ${billions},${millions},${thousands},${hundreds}.00`;
    }
  }

  // IMPORTANT: image resolutions avaiable are described in the API here:
  // https://developers.themoviedb.org/3/configuration/get-api-configuration
  // --
  getFullImgPath(target: any, type: string, res: string) {
    let fullImgPath: string;
    const imgBasePath = `https://image.tmdb.org/t/p`;
    if (type === 'cast') {
      const baseW = res === 'hi' ? '632' : '185';
      fullImgPath = `${imgBasePath}/w${baseW}${target.profile_path}`;
    } else if (type === 'poster') {
      const baseW = res === 'hi' ? '780' : '342';
      fullImgPath = `${imgBasePath}/w${baseW}${target.file_path}`;
    } else if (type === 'backdrop') {
      const baseW = res === 'hi' ? '1280' : '300';
      fullImgPath = `${imgBasePath}/w${baseW}${target.file_path}`;
    } else if (type === 'main-poster') {
      const baseW = res === 'hi' ? '780' : '342';
      fullImgPath = `${imgBasePath}/w${baseW}${this.loadedMovie.poster_path}`;
    }

    return fullImgPath;
  }
}
