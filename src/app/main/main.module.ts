import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: MainPage,
    children: [
      {
        path: '',
        redirectTo: 'movies',
        pathMatch: 'full'
      },
      {
        path: 'movies',
        children: [
          {
            path: '',
            loadChildren: () => import('./movies/movies.module').then(m => m.MoviesPageModule)
          },
          {
            path: ':movieId',
            loadChildren:
              () => import('./movies/movie-detail/movie-detail.module').then(m => m.MovieDetailPageModule)
          }
        ]
      },
      {
        path: 'actors',
        children: [
          {
            path: '',
            loadChildren: () => import('./actors/actors.module').then(m => m.ActorsPageModule)
          },
          {
            path: ':actorId',
            loadChildren:
              () => import('./actors/actor-detail/actor-detail.module').then(m => m.ActorDetailPageModule)
          }
        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MainPage]
})
export class MainPageModule {}
