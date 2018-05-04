import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  AlertController,
  LoadingController
} from "ionic-angular";
import { LavaProvider } from "../../providers/lava/lava";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";

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
  classeReservations;
  serviceReservations;
  selectedType = "classes";

  loading = this.loadingCtrl.create({
    spinner: "ios"
  });

  constructor(
    private lavaProvider: LavaProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  ionViewDidLoad() {
    this.loading.present();

    this.lavaProvider.getExerciseReservations().pipe(
      map(res => {
        if (this.loading) {
          this.loading.dismiss();
          this.loading = null;
        }

        return res;
      })
    ).subscribe(res => {
      this.classeReservations = res;
    })
   this.lavaProvider.getMassageReservations().pipe(
      map(res => {
        if (this.loading) {
          this.loading.dismiss();
          this.loading = null;
        }

        return res;
      })
    ).subscribe(res => {
      this.serviceReservations = res;
    })
    console.log("ionViewDidLoad MyBookingPage");
  }

  segmentChanged(event) {
    this.loading = this.loadingCtrl.create({
      spinner: "ios"
    });
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
