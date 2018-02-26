import { Component, ViewChild } from "@angular/core";
import { NavController, ModalController, Tabs } from "ionic-angular";
import { WorkoutPage } from "../workout/workout";
import { LavaProvider } from "../../providers/lava/lava";
import { Observable } from "rxjs/Observable";
import { ProfileProvider } from "../../providers/profile/profile";
import { BookPage } from "../book/book";

import { map } from "rxjs/operators/map";

import { Health } from "@ionic-native/health";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  workouts$: Observable<Object>;
  // @ViewChild("paymentTabs") paymentTabs: Tabs;

  upcommingExercises: Observable<Object>;
  profile$: Observable<Object>;
  ExerciseReservations$: Observable<Object>;
  workoutPage = WorkoutPage;
  user = {
    name: "Sara Alhumaid",
    active: "Active Member",
    today: {
      floors: 11,

      steps: 2321
    },
    workouts: [
      {
        title: "Upperbody Day",
        exercice: "Tone muscies",
        time: "30 min",
        average: "1/wk",
        state: "Sarted",
        exercices: [
          {
            name: "Walk",
            meta: "10 mins Mis-Speed",
            state: "ios-checkmark-circle",
            minutes: 25,
            calories: 126
          },

          {
            name: "Walk",
            meta: "10 mins Mis-Speed",
            state: "ios-checkmark-circle",
            minutes: 3,
            calories: 50
          },
          {
            name: "Walk",
            meta: "10 mins Mis-Speed",
            state: "ios-checkmark-circle",
            minutes: 6,
            calories: 65
          },
          {
            name: "Walk",
            meta: "10 mins Mis-Speed",
            state: "ios-radio-button-off",
            minutes: 6,
            calories: 75
          },
          {
            name: "Walk",
            meta: "10 mins Mis-Speed",
            state: "ios-radio-button-off",
            minutes: 6,
            calories: 95
          },
          {
            name: "Walk",
            meta: "10 mins Mis-Speed",
            state: "ios-radio-button-off",
            minutes: 2,
            calories: 40
          },
          {
            name: "Walk",
            meta: "10 mins Mis-Speed",
            state: "ios-radio-button-off",
            minutes: 50,
            calories: 126
          },
          {
            name: "Walk",
            meta: "10 mins Mis-Speed",
            state: "ios-radio-button-off",
            minutes: 20,
            calories: 126
          },
          {
            name: "Walk",
            meta: "10 mins Mis-Speed",
            state: "ios-radio-button-off",
            minutes: 10,
            calories: 126
          },
          {
            name: "Walk",
            meta: "10 mins Mis-Speed",
            state: "ios-radio-button-off",
            minutes: 5,
            calories: 126
          },
          {
            name: "Walk",
            meta: "10 mins Mis-Speed",
            state: "ios-radio-button-off",
            minutes: 25,
            calories: 126
          }
        ]
      },
      {
        title: "Upperbody Day",
        exercice: "tone muscies",
        time: "30 min",
        average: "1/wk",
        state: "Sarted"
      },
      {
        title: "Upperbody Day",
        exercice: "tone muscies",
        time: "30 min",
        average: "1/wk",
        state: "Sarted"
      },
      {
        title: "Upperbody Day",
        exercice: "tone muscies",
        time: "30 min",
        average: "1/wk",
        state: "Sarted"
      },
      {
        title: "Upperbody Day",
        exercice: "tone muscies",
        time: "30 min",
        average: "1/wk",
        state: "Sarted"
      }
    ],
    bookings: [
      {
        title: "Yoga",
        duration: "30 min",
        day: "today",
        time: "6:15 pm"
      },
      {
        title: "Yoga",
        duration: "30 min",
        day: "today",
        time: "6:15 pm"
      }
    ]
  };

  constructor(
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    private lavaProvider: LavaProvider,
    private profileProvider: ProfileProvider,
    private health: Health
  ) {}

  ionViewDidLoad() {
    this.ExerciseReservations$ = this.lavaProvider.getExerciseReservations();
    this.profile$ = this.profileProvider.getProfile();
    this.upcommingExercises = this.lavaProvider.getExerciseReservations();

    this.workouts$ = this.profileProvider
      .getMemberPrograms()

      .pipe(
        map(value => {
          let array = (value as any).data;

          function* values(obj) {
            for (let prop of Object.keys(obj)) yield obj[prop];
          }

          let arr = Array.from(values(array));
          let arr_f = arr.map(val => {
            val.ProgrameDetail = Array.from(values(val.ProgrameDetail));
            return val;
          });

          console.log(arr_f);
          return arr_f;
        })
      );

    this.health
      .isAvailable()
      .then((available: boolean) => {
        console.log(available);
        this.health
          .requestAuthorization([
            "distance",
            "nutrition", //read and write permissions
            {
              read: ["steps"], //read only permission
              write: ["height", "weight"] //write only permission
            }
          ])
          .then(res => console.log(res))
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));

    // map(this.workouts$ => {
    //   let array = (value as any).data;

    //   function* values(obj) {
    //     for (let prop of Object.keys(obj))
    //       yield obj[prop]
    //   }

    //   let arr = Array.from(values(array));

    //   console.log(arr);

    // });
  }

  bookClass() {
    // let BookingModal = this.modalCtrl.create(BookPage, {book: 'class'});

    // BookingModal.present();

    this.navCtrl.parent.select(0);
  }

  // this.paymentTabs.select(1);
}
