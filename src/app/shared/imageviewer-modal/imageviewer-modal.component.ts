import { Component, OnInit, Input } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { Image } from '../image.model';

@Component({
  selector: 'app-imageviewer-modal',
  templateUrl: './imageviewer-modal.component.html',
  styleUrls: ['./imageviewer-modal.component.scss']
})
export class ImageviewerModalComponent implements OnInit {
  @Input() fullPath: string;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    // console.log(this.fullPath);
  }

  onCancel() {
    this.modalCtrl.dismiss();
  }
}
