import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ImageviewerModalComponent } from '../components/imageviewer-modal/imageviewer-modal.component';
import { VideoplayerModalComponent } from '../components/videoplayer-modal/videoplayer-modal.component';
import { YoutubePipe } from './youtube.pipe';
import { MovieListComponent } from '../components/movie-list/movie-list.component';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [
    ImageviewerModalComponent,
    VideoplayerModalComponent,
    MovieListComponent,
    YoutubePipe,
  ],
  exports: [MovieListComponent],
  entryComponents: [
    ImageviewerModalComponent,
    VideoplayerModalComponent,
  ],
})
export class SharedModule {}
