import { Component, Output, EventEmitter } from "@angular/core";
import {
  NavController,
  NavParams,
  ItemSliding,
  Item,
  AlertController,
  ModalController
} from "ionic-angular";
import { FinishWorkoutPage } from "../finish-workout/finish-workout";
import { ProfileProvider } from "../../providers/profile/profile";
import { LavaProvider } from "../../providers/lava/lava";

/**
 * Generated class for the WorkoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-workout",
  templateUrl: "workout.html"
})
export class WorkoutPage {
  workout;
  // @Output() finish = new EventEmitter();
  constructor(
    private profileProvider: ProfileProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private lavaProvider: LavaProvider
  ) {
    this.workout = navParams.data;
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad WorkoutPage");
  }

  public open($event, itemSlide: ItemSliding, item: Item) {
    // reproduce the slide on the click
    $event.stopPropagation();
    $event.preventDefault();
    itemSlide.setElementClass("active-sliding", true);
    itemSlide.setElementClass("active-slide", true);
    itemSlide.setElementClass("active-options-left", true);
    item.setElementStyle("transform", "translate3d(90.04%, 0px, 0px)");
  }

  public close(item: ItemSliding) {
    item.close();
    item.setElementClass("active-sliding", false);
    item.setElementClass("active-slide", false);
    item.setElementClass("active-options-left", false);
  }

  public finishWorkout() {
    this.profileProvider.finishProgram(this.workout.ID).subscribe(res => {
      // this.finish.emit(this.workout);
    });
    let modal = this.modalCtrl
      .create(FinishWorkoutPage, { workoutID: this.workout.ID })
      .present();
  }


//   "24": {
//     "Equipment": {
//         "ID": 1,
//         "NameEN": "Treadmill",
//         "NameAR": "جهاز سير",
//         "Photo": null
//     },
//     "Duration": 1,
//     "Speed": 0,
//     "Level": 1,
//     "HeartRate": "101 - 110"
// }
  endCardioReadout(exersice, workoutID) {
    this.lavaProvider.addCardioReadout(exersice, workoutID).subscribe(
      res=> console.log(res)
    );
  }

  endBodyBuildingReadout(exersice, workoutID) {
    this.lavaProvider.addBoddyBuildingReadout(exersice, workoutID).subscribe(
      res=> console.log(res)
    );
  }
}
