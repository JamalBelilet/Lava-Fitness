import { Component } from "@angular/core";
import { NavController, NavParams, ModalController } from "ionic-angular";
import { ClassShedulePage } from "../class-shedule/class-shedule";
import { BookPage } from "../book/book";
import { LavaProvider } from "../../providers/lava/lava";
import { Observable } from "rxjs/Observable";
import { ProfileProvider } from "../../providers/profile/profile";
import { PhotoViewer } from "@ionic-native/photo-viewer";
import { ClassesBookingPage } from "../classes-booking/classes-booking";
import { AuthenticationProvider } from "../../providers/authentication/authentication";

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
  lang: string;
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
    private profileProvider: ProfileProvider,
    private authProvider: AuthenticationProvider
  ) {
    this.lang = this.authProvider.config.lang;
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad StarPage");

    this.bookings$ = this.profileProvider.getServices();
    // this.bookings$ = this.lavaProvider.getExerciseReservations();
  }

  previewSchedule(imgURL) {
    this.photoViewer.show("http://via.placeholder.com/350x150", "Schedule", {
      share: true
    });
  }

  bookClass() {
    let BookingModal = this.modalCtrl.create(BookPage, { book: "class" });

    BookingModal.present();
    // this.navCtrl.push(ClassesBookingPage);
  }

  bookSession() {
    let BookingModal = this.modalCtrl.create(BookPage, { book: "session" });
    BookingModal.present();
  }
}
