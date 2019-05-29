import { Injectable } from '@angular/core';

import { Movie } from './movie.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private movies: Movie[] = [
    {
      id: 'm1',
      title: 'Avengers: End Game',
      poster_path:
        'https://image.tmdb.org/t/p/w300_and_h450_bestv2/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
      release_date: '2019',
      rating: 8.3,
      overview:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti reiciendis quam soluta cumque earum quo. Explicabo magni nemo iste voluptatibus, unde facilis deserunt, adipisci in sequi aperiam ex blanditiis. Nesciunt.'
    },
    {
      id: 'm2',
      title: 'Captain Marvel',
      poster_path:
        'https://image.tmdb.org/t/p/w300_and_h450_bestv2/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg',
      release_date: '2019',
      rating: 8.1,
      overview:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti reiciendis quam soluta cumque earum quo. Explicabo magni nemo iste voluptatibus, unde facilis deserunt, adipisci in sequi aperiam ex blanditiis. Nesciunt.'
    },
    {
      id: 'm3',
      title: 'Shazam!',
      poster_path:
        'https://image.tmdb.org/t/p/w300_and_h450_bestv2/xnopI5Xtky18MPhK40cZAGAOVeV.jpg',
      release_date: '2019',
      rating: 7.8,
      overview:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti reiciendis quam soluta cumque earum quo. Explicabo magni nemo iste voluptatibus, unde facilis deserunt, adipisci in sequi aperiam ex blanditiis. Nesciunt.'
    },
    {
      id: 'm4',
      title: 'Aladdin',
      poster_path:
        'https://image.tmdb.org/t/p/w300_and_h450_bestv2/3iYQTLGoy7QnjcUYRJy4YrAgGvp.jpg',
      release_date: '2019',
      rating: 7.9,
      overview:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti reiciendis quam soluta cumque earum quo. Explicabo magni nemo iste voluptatibus, unde facilis deserunt, adipisci in sequi aperiam ex blanditiis. Nesciunt.'
    },
    {
      id: 'm5',
      title: 'The Hustle',
      poster_path:
        'https://image.tmdb.org/t/p/w300_and_h450_bestv2/qibqW5Dnvqp4hcEnoTARbQgxwJy.jpg',
      release_date: '2019',
      rating: 6.7,
      overview:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti reiciendis quam soluta cumque earum quo. Explicabo magni nemo iste voluptatibus, unde facilis deserunt, adipisci in sequi aperiam ex blanditiis. Nesciunt.'
    },
    {
      id: 'm6',
      title: 'Glass',
      poster_path:
        'https://image.tmdb.org/t/p/w300_and_h450_bestv2/svIDTNUoajS8dLEo7EosxvyAsgJ.jpg',
      release_date: '2019',
      rating: 6.2,
      overview:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti reiciendis quam soluta cumque earum quo. Explicabo magni nemo iste voluptatibus, unde facilis deserunt, adipisci in sequi aperiam ex blanditiis. Nesciunt.'
    },
    {
      id: 'm7',
      title: 'A Hidden Life',
      poster_path:
        'https://image.tmdb.org/t/p/w300_and_h450_bestv2/gRgkGpaeoBY6IrHP9FbLrVwdb6F.jpg',
      release_date: '2019',
      rating: 6.4,
      overview:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti reiciendis quam soluta cumque earum quo. Explicabo magni nemo iste voluptatibus, unde facilis deserunt, adipisci in sequi aperiam ex blanditiis. Nesciunt.'
    },
    {
      id: 'm8',
      title: 'Cold Pursuit',
      poster_path:
        'https://image.tmdb.org/t/p/w300_and_h450_bestv2/otK0H9H1w3JVGJjad5Kzx3Z9kt2.jpg',
      release_date: '2019',
      rating: 7.2,
      overview:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti reiciendis quam soluta cumque earum quo. Explicabo magni nemo iste voluptatibus, unde facilis deserunt, adipisci in sequi aperiam ex blanditiis. Nesciunt.'
    }
  ];

  constructor() {}

  getAllMovies() {
    return [...this.movies];
  }

  getMovie(movieId: string) {
    return {
      ...this.movies.find(movie => {
        return movie.id === movieId;
      })
    };
  }
}
