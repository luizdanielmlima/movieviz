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
        path: 'movies',
        children: [
          {
            path: '',
            loadChildren: './movies/movies.module#MoviesPageModule'
          },
          {
            path: ':movieId',
            loadChildren:
              './movies/movie-detail/movie-detail.module#MovieDetailPageModule'
          }
        ]
      },
      {
        path: 'actors',
        children: [
          {
            path: '',
            loadChildren: './actors/actors.module#ActorsPageModule'
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
