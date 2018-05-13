import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";

import { TabsPage } from "../pages/tabs/tabs";

import { LoginPage } from "../pages/login/login";

import moment from "moment";
// import { WeightLogHistoryPage } from "../pages/weight-log-history/weight-log-history";
// import { SurvayPage } from "../pages/survay/survay";
// import { GuidebookMachinesPage } from "../pages/guidebook-machines/guidebook-machines";
// import { GuidebookMusclesPage } from "../pages/guidebook-muscles/guidebook-muscles";
import { Storage } from "@ionic/storage";
import { AuthenticationProvider } from "../providers/authentication/authentication";

import * as firebase from "firebase/app";
import { AngularFireAuth } from "angularfire2/auth";

import { TranslateService } from "@ngx-translate/core";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any;

  constructor(
    translate: TranslateService,
    afAuth: AngularFireAuth,
    // private alertCtrl: AlertController,
    private auth: AuthenticationProvider,
    platform: Platform,
    statusBar: StatusBar,
    private storage: Storage
  ) {
    translate.setDefaultLang("ar");

    this.rootPage = LoginPage;
    translate.use("ar");


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.storage.set("AccessToken", "fb85615cdb316e80787e5a08184f2d04");

      this.storage
        .get("AccessToken")
        .then(val => {
          if (val) {
            this.auth.config.AccessToken = val;
            this.rootPage = TabsPage;
          }
        })
        .catch(e => {
          this.rootPage = LoginPage;
        });

      this.storage
        .get("lang")
        .then(val => {
          if (val) {
            this.auth.config.lang = val;
            // this.rootPage = TabsPage;
          }
        })
        .catch(e => {
          // this.rootPage = LoginPage;
        });

      // statusBar.styleDefault();
      // statusBar.backgroundColorByHexString("fefefe");
      statusBar.overlaysWebView(true);

      moment.locale("en");

      // this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(c => {}).catch(error => {});
    });
  }
}
