import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Movie } from 'src/app/models/movie.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
  @Input() movies: Movie[];
  @Input() posterParams: any;
  movieRatingPct: string;
  isLoading = false;

  constructor(private router: Router) {}

  ngOnInit() {
    console.log(this.movies);
  }

  goToMoviePage(id: string) {
    this.router.navigate(['/main/tabs/movies', id]);
  }

  getFullImgPath(type: string, res: string, filePath: string) {
    let fullImgPath: string;
    if (filePath === null) {
      fullImgPath = '../../../../assets/placeholder.png';
    } else {
      const baseURL = this.posterParams.baseURL;
      const size =
        res === 'hi'
          ? this.posterParams.hiRes
          : this.posterParams.lowRes;
      fullImgPath = `${baseURL}/${size}${filePath}`;
    }
    // console.log(fullImgPath);
    return fullImgPath;
  }

  getMovieRatingPct(movie: Movie) {
    return (this.movieRatingPct = movie.vote_average * 10 + '%');
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
