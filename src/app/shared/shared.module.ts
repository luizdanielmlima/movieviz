import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ImageviewerModalComponent } from '../components/imageviewer-modal/imageviewer-modal.component';
import { VideoplayerModalComponent } from '../components/videoplayer-modal/videoplayer-modal.component';
import { YoutubePipe } from './youtube.pipe';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [
    ImageviewerModalComponent,
    VideoplayerModalComponent,
    YoutubePipe,
  ],
  entryComponents: [
    ImageviewerModalComponent,
    VideoplayerModalComponent,
  ],
})
export class SharedModule {}
