import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { HttpClientModule } from "@angular/common/http";
// import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { MyApp } from "./app.component";

import { HomePage } from "../pages/home/home";
import { PersonPage } from "../pages/person/person";
import { StarPage } from "../pages/star/star";
import { HeartPage } from "../pages/heart/heart";
import { AddPage } from "../pages/add/add";

import { FinishWorkoutPage } from "../pages/finish-workout/finish-workout";

import { TabsPage } from "../pages/tabs/tabs";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { LoginPage } from "../pages/login/login";
import { AuthenticationProvider } from "../providers/authentication/authentication";
import { WorkoutPage } from "../pages/workout/workout";
import { ProfileProvider } from "../providers/profile/profile";
import { LavaProvider } from "../providers/lava/lava";
import { ClassShedulePage } from "../pages/class-shedule/class-shedule";
import { BookPage } from "../pages/book/book";
import { WeightLogHistoryPage } from "../pages/weight-log-history/weight-log-history";

// import { NgCircleProgressModule } from 'ng-circle-progress';

import { Health } from "@ionic-native/health";
import { LavaHealthProvider } from "../providers/lava-health/lava-health";
import { MomentPipe } from "../pipes/moment/moment";
import { BodyWeightLogHistoryPage } from "../pages/body-weight-log-history/body-weight-log-history";
import { MembershipPage } from "../pages/membership/membership";
import { SurvayPage } from "../pages/survay/survay";
import { GuidebookMachinesPage } from "../pages/guidebook-machines/guidebook-machines";
import { ExpandableComponent } from "../components/expandable/expandable";
import { GuidebookMusclesPage } from "../pages/guidebook-muscles/guidebook-muscles";

import { IonicStorageModule } from "@ionic/storage";

import { ChartModule } from "angular2-chartjs";

import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";

// import { RoundProgressModule } from "angular-svg-round-progressbar";

import { SocialSharing } from "@ionic-native/social-sharing";
import { LaunchNavigator } from "@ionic-native/launch-navigator";

import { InAppBrowser } from "@ionic-native/in-app-browser";
import { PhotoViewer } from "@ionic-native/photo-viewer";
import { ClassesBookingPage } from "../pages/classes-booking/classes-booking";
import { ServicesBookingPage } from "../pages/services-booking/services-booking";
import { MyBookingPage } from "../pages/my-booking/my-booking";
import { IsNewPipe } from "../pipes/is-new/is-new";

import { TranslateModule } from "@ngx-translate/core";

import { ChartsModule } from 'ng2-charts';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const FIREBASE_CREDENTIALS = {
  apiKey: "AIzaSyAggtWMxyL84Eq8ZV8X6Hce9Atpu2W-wi8",
  authDomain: "lava-fitness.firebaseapp.com",
  databaseURL: "https://lava-fitness.firebaseio.com",
  projectId: "lava-fitness",
  storageBucket: "lava-fitness.appspot.com",
  messagingSenderId: "478955498356"
};

import { TranslateLoader } from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
export function setTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

import {NgxChartsModule} from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    MyApp,
    PersonPage,
    StarPage,
    HeartPage,
    AddPage,
    HomePage,
    TabsPage,
    LoginPage,
    WorkoutPage,
    FinishWorkoutPage,
    ClassShedulePage,
    BookPage,
    MembershipPage,
    SurvayPage,
    GuidebookMachinesPage,
    WeightLogHistoryPage,
    BodyWeightLogHistoryPage,
    GuidebookMusclesPage,
    IsNewPipe,

    MomentPipe,
    ExpandableComponent,
    ClassesBookingPage,
    ServicesBookingPage,
    MyBookingPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp, {
      mode: "ios",
      backButtonText: "",
      iconMode: "ios",
      modalEnter: "modal-slide-in",
      modalLeave: "modal-slide-out",
      tabbarPlacement: "bottom",
      pageTransition: "ios",
      animate: false
    }),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    // RoundProgressModule,
    ChartModule,
    AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
    AngularFireAuthModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (setTranslateLoader),
        deps: [HttpClient]
      }
    }),
    ChartsModule,

    NgxChartsModule
  ],

  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PersonPage,
    StarPage,
    HeartPage,
    AddPage,
    HomePage,
    TabsPage,
    LoginPage,
    WorkoutPage,
    FinishWorkoutPage,
    ClassShedulePage,
    BookPage,
    MembershipPage,
    SurvayPage,
    GuidebookMachinesPage,
    WeightLogHistoryPage,
    BodyWeightLogHistoryPage,
    GuidebookMusclesPage,
    ExpandableComponent,
    ClassesBookingPage,
    ServicesBookingPage,

    MyBookingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthenticationProvider,
    ProfileProvider,
    LavaProvider,
    Health,
    LavaHealthProvider,
    SocialSharing,
    LaunchNavigator,
    InAppBrowser,
    PhotoViewer
  ]
})
export class AppModule {}
