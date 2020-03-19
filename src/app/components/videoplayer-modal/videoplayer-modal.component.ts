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
    const params = '?showinfo=0&modestbranding=1';
    this.fullURL = `${baseURL}${this.trailerID}${params}`;
    // console.log(this.fullURL);
  }

  onCancel() {
    this.modalCtrl.dismiss();
  }
}
