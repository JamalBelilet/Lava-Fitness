import { Component, ViewChild } from "@angular/core";

import {
  NavController,
  ModalController,
  Tabs,
  AlertController
} from "ionic-angular";
import { WorkoutPage } from "../workout/workout";
import { LavaProvider } from "../../providers/lava/lava";
import { Observable } from "rxjs/Observable";
import { ProfileProvider } from "../../providers/profile/profile";
import { BookPage } from "../book/book";

import { map } from "rxjs/operators/map";
import { fromPromise } from "rxjs/observable/fromPromise";

import { Health } from "@ionic-native/health";
import { LavaHealthProvider } from "../../providers/lava-health/lava-health";

import moment from "moment";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  workoutsSums$: Observable<void>;
  mySteps: any;
  myDistance: any;
  workoutsC$: Observable<Object>;

  upcommingExercises: Observable<Object>;
  profile$: Observable<Object>;
  ExerciseReservations$: Observable<Object>;
  workoutPage = WorkoutPage;

  myActivity = {
    startDate: 2,
    endDate: 3,
    value: {
      still: { duration: 520000, calories: 30, distance: 0 },
      walking: { duration: 223000, calories: 20, distance: 15 }
    },
    unit: "activitySummary"
  };

  myHeartRate: any = [];

  myCalories: any[] = [];
  myCaloriesActive: any = [];
  myCaloriesBasal: any = [];

  public event = {
    startDate:
      new Date().getMonth() +
      "/" +
      new Date().getDate() +
      "/" +
      new Date().getFullYear(),
    startTime: new Date().getHours() + ":" + new Date().getMinutes() + " ",
    hours: undefined,
    minutes: undefined,
    seconds: undefined,
    endDate: new Date(),
    dataType: "activity",
    steps: 0,
    calories: 0,
    value: 0,
    sourceName: "lava",
    sourceBundleId: "io.ionic.starter"
  };

  constructor(
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    private lavaProvider: LavaProvider,
    private profileProvider: ProfileProvider,
    private alertCtrl: AlertController,
    private health: Health,
    private LavaHealth: LavaHealthProvider
  ) {}

  ionViewDidLoad() {
    this.ExerciseReservations$ = this.lavaProvider.getExerciseReservations();
    this.profile$ = this.profileProvider.getProfile();
    this.profile$.subscribe(profile => {
      this.profileProvider.localProfile = (profile as any).data;
    });

    this.upcommingExercises = this.lavaProvider.getExerciseReservations();

    this.workoutsC$ = this.profileProvider
      .getMemberPrograms()

      .pipe(
        map(value => {
          let array = (value as any).data;

          function* values(obj) {
            for (let prop of Object.keys(obj)) yield obj[prop];
          }

          let arr = Array.from(values(array));
          let arr_f = arr.map(val => {
            val.CardioProgrameDetail = Array.from(values(val.CardioProgrameDetail));
            val.BodybuildingProgrameDetail = Array.from(values(val.BodybuildingProgrameDetail));
            return val;
          });

          console.log("arr_f", arr);


          const wokroutsC = {
            workouts: arr,
            sumOfNumberOfWorkoutFinishers: 0,
            sumOfWeekRepetitions: 0
          };

          wokroutsC.workouts.forEach(item => {
            if(item.numberOfWorkoutFinishers) {

              wokroutsC.sumOfNumberOfWorkoutFinishers += item.numberOfWorkoutFinishers
            }

            if(item.weekRepetitions) {

              wokroutsC.sumOfWeekRepetitions += item.weekRepetitions
            }
          })


          return wokroutsC;
        })
      );

    // this.workoutsSums$ = this.workouts$.pipe(
    //   map(value => {


    //     return;
    //   })
    // );
    // this.workoutsSums$.subscribe(res => {});

    this.health
      .isAvailable()
      .then((available: boolean) => {
        console.log(available);
        this.health
          .requestAuthorization([
            {
              read: ["steps"] //read only permission
            }
          ])
          .then(res => {
            this.getSteps();
            this.getDistance();
          })
          .catch(e => this.presentAlert(JSON.stringify(e)));
      })
      .catch(e => this.presentAlert(JSON.stringify(e)));

    // map(this.workouts$ => {
    //   let array = (value as any).data;

    //   function* values(obj) {
    //     for (let prop of Object.keys(obj))
    //       yield obj[prop]
    //   }

    //   let arr = Array.from(values(array));

    //   console.log(arr);

    // });

    let BookingModal = this.modalCtrl.create(BookPage, { book: "class" });

    // BookingModal.present();
  }

  bookClass() {
    // let BookingModal = this.modalCtrl.create(BookPage, {book: 'class'});

    // BookingModal.present();

    this.navCtrl.parent.select(0);
  }

  // this.paymentTabs.select(1);

  getActivity() {
    this.LavaHealth.getActivity()
      .then(data => {
        (this.myActivity as any) = data;
        if (this.myActivity && (this.myActivity as any).length) {
          this.myActivity = this.myActivity[0];

          (this.myActivity as any).startDate = moment(
            this.myActivity.startDate
          ).fromNow();
          (this.myActivity as any).endDate = moment(this.myActivity.endDate).fromNow();
        }
      })
      .catch(error => this.presentAlert(JSON.stringify(error)));
  }

  getSteps() {
    this.LavaHealth.getSteps()
      .then(data => {
        this.mySteps = (data as any).value;
      })
      .catch(error => this.presentAlert(JSON.stringify(error)));
  }
  getDistance() {
    this.LavaHealth.getDistance()
      .then(data => {
        this.myDistance = (data as any).value;
      })
      .catch(error => this.presentAlert(JSON.stringify(error)));
  }

  setSteps(steps: any = 200) {
    this.event.value = steps;
    this.LavaHealth.storeSteps(this.event)
      .then(response => {
        this.presentAlert(JSON.stringify(response));
      })
      .catch(error => {
        this.presentAlert(JSON.stringify(error));
      });
  }

  getCalories() {
    this.LavaHealth.getCalories(
      new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000)
    )
      .then(data => {
        // this.myCalories = Object.keys(data);
        for (var p in data) {
          this.myCalories.push({
            name: data[p].startDate.getDate(),
            value: Math.floor(data[p].value)
          });
        }
      })
      .catch(error => {
        this.presentAlert(JSON.stringify(error));
      });
  }

  isArray(array) {
    return Array.isArray(array);
  }

  getCaloriesActive() {
    this.LavaHealth.getCaloriesActive(
      new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000)
    )
      .then(data => {
        this.myCaloriesActive = data;
      })
      .catch(error => {
        this.presentAlert(JSON.stringify(error));
      });
  }

  getCaloriesBasal() {
    this.LavaHealth.getCaloriesBasal(
      new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000)
    )
      .then(data => {
        this.myCaloriesBasal = data;
      })
      .catch(error => {
        this.presentAlert(JSON.stringify(error));
      });
  }

  setCalories() {
    let nutritionData = {
      startDate: new Date(new Date().getTime() - 9 * 60 * 60 * 1000), // three hours ago
      endDate: new Date(new Date().getTime() - 4 * 60 * 60 * 1000),
      dataType: "calories",
      value: 8000,
      sourceName: "lava",
      sourceBundleId: "io.ionic.starter"
    };
    this.LavaHealth.setCalories(nutritionData)
      .then(response => {
        this.presentAlert(JSON.stringify(response));
      })
      .catch(error => {
        this.presentAlert(JSON.stringify(error));
      });
  }

  presentAlert(msg) {
    let alert = this.alertCtrl.create({
      title: "LavaHealth extension",
      subTitle: msg,
      buttons: ["Dismiss"]
    });
    alert.present();
  }
}
