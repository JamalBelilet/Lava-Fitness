import { Component } from "@angular/core";
import { NavController, NavParams, ModalController } from "ionic-angular";
import { ClassShedulePage } from "../class-shedule/class-shedule";
import { BookPage } from "../book/book";
import { LavaProvider } from "../../providers/lava/lava";
import { Observable } from "rxjs/Observable";
import { ProfileProvider } from "../../providers/profile/profile";
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { ClassesBookingPage } from "../classes-booking/classes-booking";

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
  bookings$: Observable<Object>;
  // bookings$ = [
  //   {
  //     title: "Yoga",
  //     duration: "30 min",
  //     day: "today",
  //     time: "6:15 pm"
  //   },
  //   {
  //     title: "Yoga",
  //     duration: "30 min",
  //     day: "today",
  //     time: "6:15 pm"
  //   }
  // ];

  classShedule = ClassShedulePage;
  constructor(
    private photoViewer: PhotoViewer,
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private lavaProvider: LavaProvider,
    private profileProvider: ProfileProvider
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad StarPage");

    this.bookings$ = this.profileProvider.getServices();
    // this.bookings$ = this.lavaProvider.getExerciseReservations();
  }

  previewSchedule(imgURL) {
    this.photoViewer.show('https://mysite.com/path/to/image.jpg');
  }

  bookClass() {
    let BookingModal = this.modalCtrl.create(BookPage, {book: 'class'});

    BookingModal.present();
    // this.navCtrl.push(ClassesBookingPage);
  }

  bookSession() {
    let BookingModal = this.modalCtrl.create(BookPage, {book: 'session'});
    BookingModal.present();
  }
}
