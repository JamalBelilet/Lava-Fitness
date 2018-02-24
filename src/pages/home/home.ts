import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { WorkoutPage } from "../workout/workout";
import { LavaProvider } from "../../providers/lava/lava";
import { Observable } from "rxjs/Observable";
import { ProfileProvider } from "../../providers/profile/profile";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
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
          {name:'Walk', meta: '10 mins Mis-Speed', state: 'ios-checkmark-circle'},

          {name:'Walk', meta: '10 mins Mis-Speed', state: 'ios-checkmark-circle'},
          {name:'Walk', meta: '10 mins Mis-Speed', state: 'ios-checkmark-circle'},
          {name:'Walk', meta: '10 mins Mis-Speed', state: 'ios-radio-button-off'},
          {name:'Walk', meta: '10 mins Mis-Speed', state: 'ios-radio-button-off'},
          {name:'Walk', meta: '10 mins Mis-Speed', state: 'ios-radio-button-off'},
          {name:'Walk', meta: '10 mins Mis-Speed', state: 'ios-radio-button-off'},
          {name:'Walk', meta: '10 mins Mis-Speed', state: 'ios-radio-button-off'},
          {name:'Walk', meta: '10 mins Mis-Speed', state: 'ios-radio-button-off'},
          {name:'Walk', meta: '10 mins Mis-Speed', state: 'ios-radio-button-off'},
          {name:'Walk', meta: '10 mins Mis-Speed', state: 'ios-radio-button-off'},
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

  constructor(public navCtrl: NavController, private lavaProvider: LavaProvider, private profileProvider: ProfileProvider) {}

  ionViewDidLoad(){
   this.ExerciseReservations$ = this.lavaProvider.getExerciseReservations();
   this.profile$ = this.profileProvider.getProfile();
  }
}
