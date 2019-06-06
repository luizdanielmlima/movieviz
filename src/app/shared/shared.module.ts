import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ImageviewerModalComponent } from './imageviewer-modal/imageviewer-modal.component';


@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [ImageviewerModalComponent],
  entryComponents: [ImageviewerModalComponent]
})
export class SharedModule {}
