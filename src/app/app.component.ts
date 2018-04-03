import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
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
@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any = LoginPage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private storage: Storage,
    private auth: AuthenticationProvider
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // this.storage.set("AccessToken", "5976f7468abec99a11468516351e9662");

      this.storage.get("AccessToken").then(val => {
        if (val) {


        this.auth.config.AccessToken = val;
        this.rootPage = TabsPage;
      }
      });

      statusBar.styleDefault();
      splashScreen.hide();

      moment.locale("en");
    });
  }
}
