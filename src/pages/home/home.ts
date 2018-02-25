import { Component, ViewChild } from "@angular/core";
import { NavController, ModalController, Tabs } from "ionic-angular";
import { WorkoutPage } from "../workout/workout";
import { LavaProvider } from "../../providers/lava/lava";
import { Observable } from "rxjs/Observable";
import { ProfileProvider } from "../../providers/profile/profile";
import { BookPage } from "../book/book";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {

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
          {name:'Walk', meta: '10 mins Mis-Speed', state: 'ios-checkmark-circle', minutes: 25, calories: 126},

          {name:'Walk', meta: '10 mins Mis-Speed', state: 'ios-checkmark-circle', minutes: 3, calories: 50},
          {name:'Walk', meta: '10 mins Mis-Speed', state: 'ios-checkmark-circle', minutes: 6, calories: 65},
          {name:'Walk', meta: '10 mins Mis-Speed', state: 'ios-radio-button-off', minutes: 6, calories: 75},
          {name:'Walk', meta: '10 mins Mis-Speed', state: 'ios-radio-button-off', minutes: 6, calories: 95},
          {name:'Walk', meta: '10 mins Mis-Speed', state: 'ios-radio-button-off', minutes: 2, calories: 40},
          {name:'Walk', meta: '10 mins Mis-Speed', state: 'ios-radio-button-off', minutes: 50, calories: 126},
          {name:'Walk', meta: '10 mins Mis-Speed', state: 'ios-radio-button-off', minutes: 20, calories: 126},
          {name:'Walk', meta: '10 mins Mis-Speed', state: 'ios-radio-button-off', minutes: 10, calories: 126},
          {name:'Walk', meta: '10 mins Mis-Speed', state: 'ios-radio-button-off', minutes: 5, calories: 126},
          {name:'Walk', meta: '10 mins Mis-Speed', state: 'ios-radio-button-off', minutes: 25, calories: 126},
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
        title: 'Yoga',
        duration: '30 min',
        day: 'today',
        time: '6:15 pm'
      },
      {
        title: 'Yoga',
        duration: '30 min',
        day: 'today',
        time: '6:15 pm'
      }
    ]
  };

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, private lavaProvider: LavaProvider, private profileProvider: ProfileProvider) {}

  ionViewDidLoad(){
   this.ExerciseReservations$ = this.lavaProvider.getExerciseReservations();
   this.profile$ = this.profileProvider.getProfile();
   this.upcommingExercises = this.lavaProvider.getExerciseReservations()


   this.workouts = this.profileProvider.
  }

  bookClass() {
    // let BookingModal = this.modalCtrl.create(BookPage, {book: 'class'});

    // BookingModal.present();

    this.navCtrl.parent.select(0);
  }

  // this.paymentTabs.select(1);

}
