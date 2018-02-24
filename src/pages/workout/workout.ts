import { Component } from "@angular/core";
import { NavController, NavParams, ItemSliding, Item, AlertController, ModalController } from "ionic-angular";
import { FinishWorkoutPage } from "../finish-workout/finish-workout";

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
  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController) {
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
    item.setElementStyle("transform", "translate3d(85%, 0px, 0px)");
  }

  public close(item: ItemSliding) {
    item.close();
    item.setElementClass("active-sliding", false);
    item.setElementClass("active-slide", false);
    item.setElementClass("active-options-left", false);
  }

  public finishWorkout() {
    let modal = this.modalCtrl.create(FinishWorkoutPage).present();
  }
}
