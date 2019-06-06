import { Component, OnInit, Input } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { Image } from '../image.model';

@Component({
  selector: 'app-imageviewer-modal',
  templateUrl: './imageviewer-modal.component.html',
  styleUrls: ['./imageviewer-modal.component.scss'],
})
export class ImageviewerModalComponent implements OnInit {
  @Input() title = 'Pick Location';
  @Input() imgPath: string;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss();
  }

  getFullImgPath(type: string, res: string) {
    let fullImgPath: string;
    const imgBasePath = `https://image.tmdb.org/t/p`;
    let baseW: string;
    if (type === 'cast') {
      baseW = res === 'hi' ? '632' : '185';
    } else if (type === 'poster') {
      baseW = res === 'hi' ? '780' : '342';
    } else if (type === 'backdrop') {
      baseW = res === 'hi' ? '1280' : '300';      
    }
    fullImgPath = `${imgBasePath}/w${baseW}${this.imgPath}`;
    return fullImgPath;
  }

}
