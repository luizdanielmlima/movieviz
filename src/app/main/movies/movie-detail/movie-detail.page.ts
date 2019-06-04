import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SegmentChangeEventDetail } from '@ionic/core';

import { MoviesService } from '../../../shared/movies.service';
import { Movie } from '../../../shared/movie.model';
import { Cast } from 'src/app/shared/cast.model';
import { Crew } from 'src/app/shared/crew.model';
import { Image } from 'src/app/shared/image.model';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss']
})
export class MovieDetailPage implements OnInit {
  loadedMovie: Movie;
  movieCast: Cast[];
  movieCrew: Crew[];
  movieImages: Image[];
  moviePosters: Image[];
  movieYear: string;
  showMode: string; // defines the information shown, when using the upper tabs

  constructor(
    private activatedRoute: ActivatedRoute,
    private moviesService: MoviesService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('movieId')) {
        // redirect
        return;
      }
      const movieId = paramMap.get('movieId');
      this.moviesService.getMDBMovie(movieId).subscribe((movie: Movie) => {
        this.loadedMovie = movie;
        this.getMovieCredits();
        this.getMovieImages();
        this.movieYear = movie.release_date.substring(0, 4);
        this.showMode = 'main';
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
        //console.table(this.movieImages);
      });
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
