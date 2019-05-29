import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  {
    path: 'main',
    children: [
      {
        path: '',
        loadChildren: './main/main.module#MainPageModule'
      },
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
        loadChildren: './actors/actors.module#ActorsPageModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
