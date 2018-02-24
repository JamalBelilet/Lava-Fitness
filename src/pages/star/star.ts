import { Component } from "@angular/core";
import { NavController, NavParams, ModalController } from "ionic-angular";
import { ClassShedulePage } from "../class-shedule/class-shedule";
import { BookPage } from "../book/book";

/**
 * Generated class for the StarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-star",
  templateUrl: "star.html"
})
export class StarPage {
  bookings$ = [
    {
      title: "Yoga",
      duration: "30 min",
      day: "today",
      time: "6:15 pm"
    },
    {
      title: "Yoga",
      duration: "30 min",
      day: "today",
      time: "6:15 pm"
    }
  ];

  classShedule = ClassShedulePage;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad StarPage");
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
