import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-videoplayer-modal',
  templateUrl: './videoplayer-modal.component.html',
  styleUrls: ['./videoplayer-modal.component.scss']
})
export class VideoplayerModalComponent implements OnInit {
  @Input() trailerID: string;
  fullURL: string;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    const baseURL = 'https://www.youtube.com/embed/';
    this.fullURL = `${baseURL}${this.trailerID}`;
  }

  onCancel() {
    this.modalCtrl.dismiss();
  }
}
