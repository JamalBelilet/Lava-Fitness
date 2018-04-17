import { Component } from "@angular/core";
import { Platform, AlertController } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { TabsPage } from "../pages/tabs/tabs";

import { LoginPage } from "../pages/login/login";

import moment from "moment";
import { WeightLogHistoryPage } from "../pages/weight-log-history/weight-log-history";
import { SurvayPage } from "../pages/survay/survay";
import { GuidebookMachinesPage } from "../pages/guidebook-machines/guidebook-machines";
import { GuidebookMusclesPage } from "../pages/guidebook-muscles/guidebook-muscles";
import { Storage } from "@ionic/storage";
import { AuthenticationProvider } from "../providers/authentication/authentication";
import { InAppBrowser } from '@ionic-native/in-app-browser';




@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any = LoginPage;

  constructor(
    private iab: InAppBrowser,
    private alertCtrl: AlertController,
    private auth: AuthenticationProvider,
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private storage: Storage,
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.storage.set("AccessToken", "fb85615cdb316e80787e5a08184f2d04")


      this.storage.get("AccessToken").then(val => {
        if (val) {


        this.auth.config.AccessToken = val;
        this.rootPage = TabsPage;
      }
      });

      statusBar.styleDefault();
      splashScreen.hide();

      moment.locale("en");

      // this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(c => {}).catch(error => {});


      let alert = this.alertCtrl.create({
        title: '',
        message: 'To get all the features of Lava Fitness, you have to install Google fit from Playstore',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Get Google Fit',
            handler: () => {
              this.iab.create('https://play.google.com/store/apps/details?id=com.google.android.apps.fitness', '_system');
            }
          }
        ]
      });
      alert.present();

    });
  }


}
