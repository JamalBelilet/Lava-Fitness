import { Component } from "@angular/core";
import { NavController, NavParams, AlertController } from "ionic-angular";
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
    public navParams: NavParams,
    public alertCtrl: AlertController
  ) {}

  ionViewDidLoad() {
    this.classeReservations$ = this.lavaProvider.getExerciseReservations();
    this.serviceReservations$ = this.lavaProvider.getMassageReservations();
    console.log("ionViewDidLoad MyBookingPage");
  }

  cancelService(serviceID) {
    let alert = this.alertCtrl.create({
      title: "",
      message: "confirm the reservation of this class?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Confirm",
          handler: () => {
            this.lavaProvider.updateServiceReservation(serviceID).subscribe(
              res => {
                this.serviceReservations$ = this.lavaProvider.getMassageReservations();
              },
              error => {
                this.alertCtrl
                  .create()
                  .setMessage(error.error.errors)
                  .present();
              }
            );
          }
        }
      ]
    });
    alert.present();
  }

  cancelExercice(exerciseID) {
    let alert = this.alertCtrl.create({
      title: "",
      message: "confirm the reservation of this class?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Confirm",
          handler: () => {
            this.lavaProvider.updateExerciseReservation(exerciseID).subscribe(
              res => {
                this.classeReservations$ = this.lavaProvider.getExerciseReservations();
              },
              error => {
                this.alertCtrl
                  .create()
                  .setMessage(error.error.errors)
                  .present();
              }
            );
          }
        }
      ]
    });
    alert.present();
  }
}
