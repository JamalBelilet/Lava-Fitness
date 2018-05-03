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
import { map, switchMap } from "rxjs/operators";
import { of } from "rxjs/observable/of";
import { Observable } from "rxjs/Observable";

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
  workout$: Observable<any>;
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

    // this.workoutsC$.subscribe(workoutsC=> {
    //   let workoutsCC = this.workoutsC$;
    //   (workoutsC as any).workouts.forEach(workout => {
    //     workoutsCC = this.pipeWorkoutsFilter(workoutsCC, workout.ID)
    //   });
    //   this.workoutsC$=workoutsCC;
    // })
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad WorkoutPage");

    this.workout$ = this.lavaProvider.getMemberReadouts(this.workout.ID).pipe(
      switchMap(res => {
        this.workout.CardioProgrameDetail = this.workout.CardioProgrameDetail.map(
          cardioExercise => {
            (res as any).data.Cardio.forEach(cardio => {
              if (cardioExercise.Equipment.ID == cardio.Equipment.ID) {
                cardioExercise.state = "done";
              }
            });
            return cardioExercise;
          }
        );

        this.workout.BodybuildingProgrameDetail = this.workout.BodybuildingProgrameDetail.map(
          bodybuildingExerciseExercise => {
            (res as any).data.Bodybuilding.forEach(bodybuilding => {
              if (
                bodybuildingExerciseExercise.Equipment.ID ==
                bodybuilding.Equipment.ID
              ) {
                bodybuildingExerciseExercise.state = "done";
              }
            });
            return bodybuildingExerciseExercise;
          }
        );
        return of(this.workout);
      })
    );
  }

  decreaseDuration($event, slidingItem, item, exersice) {
    exersice.Duration = exersice.Duration - 1;
    this.stopPropagation($event, slidingItem, item);
  }
  encreaseDuration($event, slidingItem, item, exersice) {
    exersice.Duration = exersice.Duration + 1;
    this.stopPropagation($event, slidingItem, item);
  }

  decreaseCalories($event, slidingItem, item, exersice) {
    exersice.Calories = exersice.Calories - 1;
    this.stopPropagation($event, slidingItem, item);
  }
  encreaseCalories($event, slidingItem, item, exersice) {
    exersice.Calories = exersice.Calories + 1;
    this.stopPropagation($event, slidingItem, item);
  }

  decreaseSpeed($event, slidingItem, item, exersice) {
    exersice.Speed = exersice.Speed - 1;
    this.stopPropagation($event, slidingItem, item);
  }
  encreaseSpeed($event, slidingItem, item, exersice) {
    exersice.Speed = exersice.Speed + 1;
    this.stopPropagation($event, slidingItem, item);
  }

  stopPropagation($event, slidingItem, item) {
    $event.stopPropagation();

    $event.preventDefault();

    slidingItem.setElementClass("active-sliding", true);
    slidingItem.setElementClass("active-sliding", true);
    slidingItem.setElementClass("active-slide", true);
    slidingItem.setElementClass("active-options-left", true);

    setTimeout(
      () => {
        slidingItem.setElementClass("active-sliding", true);
        slidingItem.setElementClass("active-sliding", true);
        slidingItem.setElementClass("active-slide", true);
        slidingItem.setElementClass("active-options-left", true);
      },
      350,
      400,
      450,
      500,
      650,
      900
    );
    // "active-slide active-options-left";
    item.setElementStyle("transform", "translate3d(0, 0px, 0px)");
    item.setElementStyle("transform", "translate3d(90.04%, 0px, 0px)");
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
    this.lavaProvider.addCardioReadout(exersice, workoutID).subscribe(res => {
      {
      }
    });
  }

  endBodyBuildingReadout(exersice, workoutID) {
    this.lavaProvider
      .addBoddyBuildingReadout(exersice, workoutID)
      .subscribe(res => {});
  }
}
