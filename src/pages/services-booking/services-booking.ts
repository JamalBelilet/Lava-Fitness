import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  AlertController,
  LoadingController
} from "ionic-angular";
import { LavaProvider } from "../../providers/lava/lava";
import { Observable } from "rxjs/Observable";
import moment from "moment";
import { map } from "rxjs/operators";
import { AuthenticationProvider } from "../../providers/authentication/authentication";

/**
 * Generated class for the ServicesBookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-services-booking",
  templateUrl: "services-booking.html"
})
export class ServicesBookingPage {
  lang: string;
  services$: Observable<Object>;
  loading = this.loadingCtrl.create({
    spinner: "ios"
  });
  constructor(
    private alertCtrl: AlertController,
    private lavaProvider: LavaProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private authProvider: AuthenticationProvider
  ) {
    this.lang = this.authProvider.config.lang;
    console.log(navParams.data);
  }

  ionViewDidLoad() {
    this.loading.present();

    let date = new Date(
      moment(this.navParams.data.Date)
        .locale("en")
        .toISOString()
    ).getDate();
    console.log(date);
    this.services$ = this.lavaProvider
      .getAllMassageReservations(
        this.navParams.data.Branch.ID,
        this.navParams.data.Massager.ID,
        date,
        new Date(
          moment(this.navParams.data.Date)
            .locale("en")
            .toISOString()
        ).getMonth() + 1,
        new Date(
          moment(this.navParams.data.Date)
            .locale("en")
            .toISOString()
        ).getFullYear()
      )
      .pipe(
        map(res => {
          if (this.loading) {
            this.loading.dismiss();
            this.loading = null;
          }

          return res;
        })
      );
  }

  book(serviceC) {
    let alert = this.alertCtrl.create({
      title: "",
      message: "confirm the reservation of this message?",
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
            this.lavaProvider.reserveMassageSession(serviceC).subscribe(
              res => {
                setTimeout(() => {
                  // this.navCtrl.pop();
                }, 3800);
                console.log("reserveExercise", JSON.stringify(res));
              },
              error =>
                this.alertCtrl
                  .create()
                  .setMessage(error.error.errors)
                  .present()
            );
          }
        }
      ]
    });
    alert.present();
  }
}
