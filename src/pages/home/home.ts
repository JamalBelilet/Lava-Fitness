import { Component } from "@angular/core";

import {
  NavController,
  ModalController,
  // Tabs,
  AlertController,
  LoadingController,
  // Config,
  Platform
} from "ionic-angular";
import { WorkoutPage } from "../workout/workout";
import { LavaProvider } from "../../providers/lava/lava";
import { Observable } from "rxjs/Observable";
import { ProfileProvider } from "../../providers/profile/profile";
// import { BookPage } from "../book/book";

import { map } from "rxjs/operators/map";
// import { fromPromise } from "rxjs/observable/fromPromise";

import { Health, HealthData } from "@ionic-native/health";
import { LavaHealthProvider } from "../../providers/lava-health/lava-health";

import moment from "moment";

import { InAppBrowser } from "@ionic-native/in-app-browser";
import { switchMap, catchError } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";
import { AuthenticationProvider } from "../../providers/authentication/authentication";
import { SplashScreen } from "@ionic-native/splash-screen";
import { of } from "rxjs/observable/of";
import { Subject } from "rxjs/Subject";
// import { NgxChartsModule } from "@swimlane/ngx-charts";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  view: number[];
  lang;
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

  single: any[] = [{ name: "finishes", value: 0 }];
  colorScheme = {
    domain: ["#f8cb4f"]
  };


  constructor(
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    private lavaProvider: LavaProvider,
    private profileProvider: ProfileProvider,
    private alertCtrl: AlertController,
    private health: Health,
    private LavaHealth: LavaHealthProvider,
    private iab: InAppBrowser,
    private loadingCtrl: LoadingController,
    private translate: TranslateService,
    private authProvider: AuthenticationProvider,
    private platform: Platform,
    private splashScreen: SplashScreen
  ) {
    this.lang = this.authProvider.config.lang;
    moment.locale("en");
  }

  ionViewDidLoad() {
    this.splashScreen.hide();

    let loading = this.loadingCtrl.create({
      spinner: "ios"
    });
    loading.present();

    setTimeout(() => {
      if (loading) {
        loading.dismiss();
        loading = null;
      }
    }, 2000);

    this.ExerciseReservations$ = this.lavaProvider.getExerciseReservations();
    this.profile$ = this.profileProvider.getProfile();
    this.profile$.subscribe(profile => {
      this.profileProvider.localProfile = (profile as any).data;
    });

    this.upcommingExercises = this.lavaProvider.getExerciseReservations().pipe(
      map(res => {
        (res as any).data = (res as any).data.filter(data => {
          return new Date(data.Date) > new Date();
        });
        return res;
      })
    );

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
            val.CardioProgrameDetail = Array.from(
              values(val.CardioProgrameDetail)
            );
            val.BodybuildingProgrameDetail = Array.from(
              values(val.BodybuildingProgrameDetail)
            );

            val.BodybuildingProgrameDetail = val.BodybuildingProgrameDetail.map(
              exo => {
                exo.Calories = 0;
                return exo;
              }
            );
            return val;
          });

          const wokroutsC = {
            workouts: arr_f,
            sumOfNumberOfWorkoutFinishers: 0,
            sumOfWeekRepetitions: 0
          };

          wokroutsC.workouts.forEach(item => {
            if (item.NumberOfWorkoutFinishers) {
              wokroutsC.sumOfNumberOfWorkoutFinishers += Number(
                item.NumberOfWorkoutFinishers
              );
              item.numberOfWorkoutFinishersT = new Array(
                Number(item.NumberOfWorkoutFinishers)
              );
            }

            if (item.WeekRepetitions) {
              wokroutsC.sumOfWeekRepetitions += item.WeekRepetitions;
            }
          });

          if (loading) {
            loading.dismiss();
            loading = null;
          }

          this.single = [
            { name: "finiches", value: wokroutsC.sumOfNumberOfWorkoutFinishers }
          ];

          return wokroutsC;
        })
      ).pipe(
        catchError((error) => {
          // it's important that we log an error here.
          // Otherwise you won't see an error in the console.
          console.error('error loading the list of users', error);
          if (loading) {
            loading.dismiss();
            loading = null;
          }
          new Subject<boolean>().next(true);
          return of();
        })
      );

    // this.workoutsC$.subscribe(
    //   () => {},
    //   error => {
    //     if (loading) {
    //       loading.dismiss();
    //       loading = null;
    //     }
    //   }
    // );

    // this.workoutsC$.subscribe(workoutsC=> {
    //   let workoutsCC = this.workoutsC$;
    //   (workoutsC as any).workouts.forEach(workout => {
    //     workoutsCC = this.pipeWorkoutsFilter(workoutsCC, workout.ID)
    //   });
    //   this.workoutsC$=workoutsCC;
    // })

    // this.workoutsC$.subscribe(res => {})
    // this.workoutsSums$ = this.workouts$.pipe(
    //   map(value => {

    //     return;
    //   })
    // );
    // this.workoutsSums$.subscribe(res => {});

    // this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(c => {
    this.health
      .isAvailable()
      .then((available: boolean) => {
        this.health
          .requestAuthorization([
            "distance",
            {
              read: ["steps"] //read only permission
            }
          ])
          .then(res => {
            // this.alertCtrl
            //   .create()
            //   .setMessage("is available \n" + JSON.stringify(res))
            //   .present();

            // this.health
            //   .query({
            //     startDate: new Date(
            //       new Date().getTime() - 3 * 24 * 60 * 60 * 1000
            //     ), // three days ago
            //     endDate: new Date(), //now
            //     dataType: "steps"
            //   })
            //   .then((value: HealthData) => {
            //     console.info("Before Convertion");
            //     console.info("Before For loop");
            //     for (let val in value) {
            //       console.info(
            //         "HealthData data  " + JSON.stringify(value[val].value)
            //       );
            //       console.info(
            //         "HealthData data  " + JSON.stringify(value[val])
            //       );
            //     }

            //     this.alertCtrl
            //       .create()
            //       .setMessage("query steps " + JSON.stringify(value)).present();
            //   })
            //   .catch((e: any) => {
            //     console.error("HealthData ERROR:---" + e);
            //   });

            this.getSteps();
            this.getDistance();
          })
          .catch(e => this.presentAlert(JSON.stringify(e)));
      })
      .catch(e => {
        this.platform.ready().then(() => {
          if (this.platform.is("android")) {
            this.translate.get("GetGoogleFit").subscribe((res: string) => {
              let alert = this.alertCtrl.create({
                title: "",
                message: res["message"],
                buttons: [
                  {
                    text: res["buttons"]["Cancel"],
                    role: "cancel",
                    handler: () => {}
                  },
                  {
                    text: res["buttons"]["GetGoogleFit"],
                    handler: () => {
                      this.iab.create(
                        "https://play.google.com/store/apps/details?id=com.google.android.apps.fitness",
                        "_system"
                      );
                    }
                  }
                ]
              });
              alert.present();
            });
          }
          if (this.platform.is("ios")) {
            this.translate.get("HealthKit").subscribe((res: string) => {
              let alert = this.alertCtrl.create({
                title: "",
                message: res["message"],
                buttons: [
                  {
                    text: res["buttons"]["Cancel"],
                    role: "cancel",
                    handler: () => {}
                  },
                  {
                    text: res["buttons"]["HealthKit"],
                    handler: () => {
                      this.iab.create(
                        "https://www.apple.com/lae/ios/health/",
                        "_system"
                      );
                    }
                  }
                ]
              });
              alert.present();
            });
          }
        });
      });

    //   this.health
    //     .query({
    //       startDate: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000), // three days ago
    //       endDate: new Date(), //now
    //       dataType: "steps"
    //     })
    //     .then((value: HealthData) => {
    //       console.info("Before Convertion");
    //       console.info("Before For loop");
    //       for (let val in value) {
    //         console.info("HealthData data  " + JSON.stringify(value[val].value));
    //         console.info("HealthData data  " + JSON.stringify(value[val]));
    //       }

    //       this.alertCtrl
    //         .create()
    //         .setMessage("query steps " + JSON.stringify(value)).present();
    //     })
    //     .catch((e: any) => {
    //       console.error("HealthData ERROR:---" + e);
    //     });
  }

  bookClass() {
    this.navCtrl.parent.select(0);
  }

  getSteps() {
    this.LavaHealth.getSteps()
      .then(data => {
        let _steps = 0;
        (data as any).forEach(cSteps => {
          _steps += cSteps;
        });
        this.mySteps = Math.floor(_steps);
      })
      .catch(error => this.presentAlert(JSON.stringify(error)));
  }

  getDistance() {
    this.LavaHealth.getDistance()
      .then(data => {
        let _distance = 0;
        (data as any).forEach(cDistance => {
          _distance += cDistance;
        });
        this.myDistance = Math.floor(data[(data as any).length - 1].value);
      })
      .catch(error => this.presentAlert(JSON.stringify(error)));
  }

  isArray(array) {
    return Array.isArray(array);
  }


  presentAlert(msg) {
    this.translate.get("Dismiss").subscribe((res: string) => {
      let alert = this.alertCtrl.create({
        title: "LavaHealth extension",
        subTitle: msg,
        buttons: [res]
      });
      alert.present();
    });
  }

  goToProfile() {
    this.navCtrl.parent.select(4);
  }

  showUpcomingBookingsDetails(booking) {
    this.translate.get("Dismiss").subscribe((res: string) => {
      let alert = this.alertCtrl.create({
        title: booking.ExerciseTitle,
        subTitle: booking.BranchName,
        message:
          "مع " +
          booking.CoachName +
          "، يوم " +
          moment(booking.Date).format("DD-MM-YYYY"),
        buttons: [res]
      });
      alert.present();
    });
  }

  pipeWorkoutsFilter(workoutsC, workoutID) {
    return workoutsC.pipe(
      switchMap(resC => {
        return this.lavaProvider.getMemberReadouts(workoutID).pipe(
          map(res => {
            (resC as any).workouts.forEach(workout => {
              workout.CardioProgrameDetail.forEach(cardioExercise => {
                (res as any).data.Cardio.forEach(cardio => {
                  if (cardioExercise.Equipment.ID == cardio.Equipment.ID) {
                    cardioExercise.state = "done";
                  }
                });
              });
            });

            return resC;
          })
        );
      })
    );
  }

}
