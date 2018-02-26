import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { HttpClientModule } from "@angular/common/http";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
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
import { LavaProvider } from '../providers/lava/lava';
import { ClassShedulePage } from "../pages/class-shedule/class-shedule";
import { BookPage } from "../pages/book/book";

import { NgCircleProgressModule } from 'ng-circle-progress';
import {RoundProgressModule} from 'angular-svg-round-progressbar';

import { Health } from '@ionic-native/health';
import { LavaHealthProvider } from '../providers/lava-health/lava-health';
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
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: "",
      iconMode: "ios",
      modalEnter: "modal-slide-in",
      modalLeave: "modal-slide-out",
      tabbarPlacement: "bottom",
      pageTransition: "ios",
      animate: false
    }),
    HttpClientModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    }),
    RoundProgressModule

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
    BookPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthenticationProvider,
    ProfileProvider,
    LavaProvider,
    Health,
    LavaHealthProvider

  ]
})
export class AppModule {}
