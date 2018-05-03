import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { LavaProvider } from "../../providers/lava/lava";
import { Observable } from "rxjs/Observable";

/**
 * Generated class for the MyBookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-my-booking",
  templateUrl: "my-booking.html"
})
export class MyBookingPage {
  classeReservations$: Observable<Object>;
  serviceReservations$: Observable<Object>;
  selectedType = "classes";
  constructor(
    private lavaProvider: LavaProvider,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

  ionViewDidLoad() {
    this.classeReservations$ = this.lavaProvider.getExerciseReservations();
    this.serviceReservations$ = this.lavaProvider.getMassageReservations();
    console.log("ionViewDidLoad MyBookingPage");
  }

  cancelService(serviceID) {
    this.lavaProvider.updateServiceReservation(serviceID).subscribe(res => {});

  }

  cancelExercice(exerciseID) {
    this.lavaProvider
      .updateExerciseReservation(exerciseID)
      .subscribe(res => {});

  }
}
