import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  movieNavMode = 'noNavDataYet';
  actorNavMode = 'noNavDataYet';
  currentMovie = 'noMovieDataYet';
  currentActor = 'noActorDataYet';

  constructor() {}

  // Methods to persist navigation (ion-segment checked buttons)
  setMovieNavMode(nav: string) {
    this.movieNavMode = nav;
  }

  setActorNavMode(nav: string) {
    this.actorNavMode = nav;
  }

  getMovieNavMode() {
    return this.movieNavMode;
  }

  getActorNavMode() {
    return this.actorNavMode;
  }

  // Methods to save current actor and movie, to avoid re-loading data
  setCurrentMovie(id: string) {
    this.currentMovie = id;
    console.log(`NavigationService|setCurrentMovie: ${this.currentMovie}`);
  }

  setCurrentActor(id: string) {
    this.currentActor = id;
    console.log(`NavigationService|setCurrentActor: ${this.currentActor}`);
  }

  getCurrentMovie() {
    return this.currentMovie;
  }

  getCurrentActor() {
    return this.currentActor;
  }
}
