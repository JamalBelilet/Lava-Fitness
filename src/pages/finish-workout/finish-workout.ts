import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { ProfileProvider } from "../../providers/profile/profile";
import { TabsPage } from "../tabs/tabs";

/**
 * Generated class for the FinishWorkoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-finish-workout",
  templateUrl: "finish-workout.html"
})
export class FinishWorkoutPage {
  workoutID: any;
  constructor(
    private profileProvider: ProfileProvider,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.workoutID = navParams.data.workoutID;
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad FinishWorkoutPage");
  }

  evaluate(level) {
    this.profileProvider
      .evaluateProgram(this.workoutID, level)
      .subscribe(res => {
        this.navCtrl.pop();
        this.navCtrl.setRoot(TabsPage);
      });
  }

  close() {
    this.navCtrl.pop();
  }
}
