import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MoviesService } from '../../../shared/movies.service';
import { Movie } from '../../../shared/movie.model';
import { Cast } from 'src/app/shared/cast.model';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss']
})
export class MovieDetailPage implements OnInit {
  loadedMovie: Movie;
  movieCast: Cast[];
  movieYear: string;

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
        this.movieYear = movie.release_date.substring(0, 4);
        // console.log(this.loadedMovie);
      });
    });
  }

  getMovieCredits() {
    this.moviesService
      .getMovieCredits(this.loadedMovie.id)
      .subscribe((movieCredits: any) => {
        this.movieCast = movieCredits.cast;
        // console.table(this.movieCast);
      });
  }

  getFullImgPath(target: any, resolution: string) {
    let fullImgPath: string;
    const imgW = resolution === 'hi' ? '600' : '300';
    const imgH = resolution === 'hi' ? '900' : '450';
    const imgBasePath = `https://image.tmdb.org/t/p/w${imgW}_and_h${imgH}_bestv2`;
    if (target.character) {
      // it´s a cast, because movies don´t have this parameter
      fullImgPath = imgBasePath + target.profile_path;
    } else {
      fullImgPath = imgBasePath + this.loadedMovie.poster_path;
    }

    return fullImgPath;
  }
}
