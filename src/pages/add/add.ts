import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  AlertController,
  App,
  ActionSheetController
} from "ionic-angular";
import { MembershipPage } from "../membership/membership";
import { SurvayPage } from "../survay/survay";
import { GuidebookMachinesPage } from "../guidebook-machines/guidebook-machines";
import { GuidebookMusclesPage } from "../guidebook-muscles/guidebook-muscles";
import { Observable } from "rxjs/Observable";
import { ProfileProvider } from "../../providers/profile/profile";

import { Storage } from "@ionic/storage";
import { LoginPage } from "../login/login";

import { SocialSharing } from "@ionic-native/social-sharing";

import { LaunchNavigator } from "@ionic-native/launch-navigator";
import { MyBookingPage } from "../my-booking/my-booking";
import { TranslateService } from "@ngx-translate/core";
import { AuthenticationProvider } from "../../providers/authentication/authentication";
import { TabsPage } from "../tabs/tabs";

/**
 * Generated class for the AddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-add",
  templateUrl: "add.html"
})
export class AddPage {
  lang: string;
  membershipPage = MembershipPage;
  survayPage = SurvayPage;
  guidebookMachines = GuidebookMachinesPage;
  guidebookMuscles = GuidebookMusclesPage;

  myBooking = MyBookingPage;

  selectedBranch = "Alquds branch";

  branches$: Observable<Object>;
  constructor(
    private launchNavigator: LaunchNavigator,
    private socialSharing: SocialSharing,
    private actionSheetController: ActionSheetController,
    public app: App,
    private alertCtrl: AlertController,
    private storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams,
    private profileProvider: ProfileProvider,
    private translate: TranslateService,
    public authProvider: AuthenticationProvider
  ) {
    this.lang = this.authProvider.config.lang;
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad AddPage");

    this.branches$ = this.profileProvider.getBranches();

    this.branches$.subscribe(branch => {
      this.selectedBranch = (branch as any).data[3];
      console.log(this.selectedBranch);
    });
  }

  langSelected(langS) {
    if (langS == "rtl") {
      this.translate.use("ar");
      this.navCtrl.popToRoot();

      this.app.getRootNav().setRoot(TabsPage);
      this.app.getRootNav().getActiveChildNav().select(4);
    } else {
      this.translate.use("en");
      this.navCtrl.popToRoot();
      this.app.getRootNav().setRoot(TabsPage);
      this.app.getRootNav().getActiveChildNav().select(4);

    }
  }

  signout() {
    this.translate.get("signout").subscribe((translated: string) => {
      let alert = this.alertCtrl.create({
        title: translated["Sign out"],
        message: translated["Do you want to sign out?"],
        buttons: [
          {
            text: translated["Cancel"],
            role: "cancel",
            handler: () => {}
          },
          {
            text: translated["Sign out"],
            handler: () => {
              this.storage.set("AccessToken", null);
              // this.navCtrl.popTo(LoginPage);
              // this.navCtrl.setRoot(LoginPage);
              this.app.getRootNav().setRoot(LoginPage);
            }
          }
        ]
      });
      alert.present();
    });
  }

  // myBooking() {
  //   console.log(this.navCtrl.parent.select(2));
  // }

  sendInvitation() {
    this.translate.get("sendInvitation").subscribe((translated: string) => {
      let sharePortionActionSheet = this.actionSheetController.create({
        title: translated["Invite your friends"],
        buttons: [
          {
            text: translated["share Lava on Facebook"],
            icon: "logo-facebook",
            handler: () => {
              this.socialSharing.shareViaFacebook(
                "Lava Fitness",
                null,
                "http://lava.sa"
              );
            }
          },
          {
            text: translated["share Lava on Twitter"],
            icon: "logo-twitter",
            handler: () => {
              this.socialSharing.shareViaTwitter(
                "Lava Fitness",
                null,
                "http://lava.sa"
              );
            }
          },
          {
            text: translated["Invite ..."],
            icon: "ios-text-outline",
            handler: () => {
              this.socialSharing.share(
                "Lava Fitness",
                null,
                null,
                "http://lava.sa"
              );
            }
          },
          {
            text: translated["Cancel"],
            role: "destructive"
          }
        ]
      });
      sharePortionActionSheet.present();
    });
  }

  navigateTo(address) {
    this.launchNavigator
      .navigate(address)
      .then(
        success => console.log("Launched navigator"),
        error => console.log("Error launching navigator", error)
      );
  }
}
