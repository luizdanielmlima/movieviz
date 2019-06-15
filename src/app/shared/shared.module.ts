import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ImageviewerModalComponent } from './imageviewer-modal/imageviewer-modal.component';
import { VideoplayerModalComponent } from './videoplayer-modal/videoplayer-modal.component';
import { YoutubePipe } from './youtube.pipe';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [
    ImageviewerModalComponent,
    VideoplayerModalComponent,
    YoutubePipe
  ],
  entryComponents: [ImageviewerModalComponent, VideoplayerModalComponent]
})
export class SharedModule {}
