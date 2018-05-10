import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { BookPage } from '../book/book';

/**
 * Generated class for the ClassShedulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-class-shedule',
  templateUrl: 'class-shedule.html',
})
export class ClassShedulePage {

  constructor(
    private modalCtrl: ModalController,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  bookClass() {
    let BookingModal = this.modalCtrl.create(BookPage, {book: 'class'});

    BookingModal.present();
  }

  bookSession() {
    let BookingModal = this.modalCtrl.create(BookPage, {book: 'session'});
    BookingModal.present();
  }

}
