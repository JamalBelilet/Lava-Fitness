import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  AlertController,
  LoadingController
} from "ionic-angular";

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthenticationProvider } from "../../providers/authentication/authentication";
import { TabsPage } from "../tabs/tabs";
import { ProfileProvider } from "../../providers/profile/profile";
import { Observable } from "rxjs/Observable";

import { ViewChild } from "@angular/core";
import { Slides } from "ionic-angular";

import { Storage } from '@ionic/storage';
import { SplashScreen } from "@ionic-native/splash-screen";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  currentIndex: number = 0;
  hideSlides: boolean;
  signupForm: FormGroup;
  verifyForm: FormGroup;
  signinForm: FormGroup;
  loginstate = "signup";

  cities$: Observable<Object>;

  @ViewChild(Slides) slides: Slides;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private auth: AuthenticationProvider,
    private alertCtrl: AlertController,
    private profileProvider: ProfileProvider,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    private splashScreen: SplashScreen,
  ) {
    this.signinForm = formBuilder.group({
      MobileNumber: ["", Validators.required]
    });
    this.verifyForm = formBuilder.group({
      MobileNumber: ["", Validators.required],
      VerifyNumber: ["", Validators.required]
    });

    // "AuthorizationKey":"as@dL8]Rn3$2S!anR",
    // "FullName":"Turki Alomari",
    // "MobileNumber":"966541114424",
    // "CityID": "1",
    // "RegionID":null,
    // "Email":null,
    // "NationalityID":null,
    // "Language":null,
    // "BirthDate":null

    this.signupForm = formBuilder.group({
      FullName: [
        "",
        Validators.compose([
          Validators.required,
          Validators.maxLength(30),
          Validators.pattern(/[a-zA-Z0-9_]+/)
        ])
      ],
      MobileNumber: [
        "",
        Validators.compose([
          Validators.required,
          Validators.maxLength(30),
          Validators.pattern(/[a-zA-Z0-9_]+/)
        ])
      ],
      CityID: [
        "الرياض",
        Validators.compose([
          Validators.required,
          Validators.maxLength(30),
          Validators.pattern(/[a-zA-Z0-9_]+/)
        ])
      ],
      // RegionID: ['', Validators.compose([Validators.required, Validators.maxLength(30),
      //   Validators.pattern(/[a-zA-Z0-9_]+/)]),
      // ],
      Email: [
        "",
        Validators.compose([
          Validators.required,
          Validators.maxLength(40),
          Validators.pattern(
            /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
          )
        ])
      ]
    });
  }

  ionViewDidLoad() {
    this.splashScreen.hide();
    this.cities$ = this.profileProvider.getCities();
  }

  onSignIn() {
    let loading = this.loadingCtrl.create({
      spinner: "hide",
      content: "Please Wait..."
    });
    loading.present();
    this.auth.login(this.signinForm.value).subscribe(
      res => {
        loading.dismiss();
        this.loginstate = "verify";
        this.auth.config.AccessToken = (res as any).data.AccessToken;
        this.verifyForm.controls.MobileNumber.setValue(
          this.signinForm.value.MobileNumber
        );
      },
      error => {
        loading.dismiss();
        let alert = this.alertCtrl.create({
          // message: error.error.errors,
          message: error.error.errors || JSON.stringify(error),
          buttons: [
            {
              text: "cancel",
              role: "cancel",
              handler: () => {
              }
            }
          ]
        });
        alert.present();
      }
    );
  }

  onVerify() {
    let loading = this.loadingCtrl.create({
      spinner: "hide",
      content: "Please Wait..."
    });
    loading.present();
    this.auth.verify(this.verifyForm.value).subscribe(
      res => {
        loading.dismiss();
        this.auth.config.AccessToken = (res as any).data.AccessToken;
        this.navCtrl.setRoot(TabsPage);


        this.storage.set("AccessToken", (res as any).data.AccessToken);
      },
      error => {
        loading.dismiss();
        let alert = this.alertCtrl.create({
          // message: error.error.errors,
          message: error.error.errors || JSON.stringify(error),
          buttons: [
            {
              text: "cancel",
              role: "cancel",
              handler: () => {
              }
            }
          ]
        });
        alert.present();
      }
    );
  }

  onSignUp(user) {
    let loading = this.loadingCtrl.create({
      spinner: "hide",
      content: "Please Wait..."
    });
    loading.present();
    this.auth.register(this.signupForm.value).subscribe(
      res => {
        loading.dismiss();

        this.loginstate = "verify";
        this.auth.config.AccessToken = (res as any).data.AccessToken;
        this.verifyForm.controls.MobileNumber.setValue(
          this.signupForm.value.MobileNumber
        );

        this.auth.config.AccessToken = (res as any).data.AccessToken;
        return;
      },
      error => {
        loading.dismiss();
        let alert = this.alertCtrl.create({
          message: error.error.errors || JSON.stringify(error),
          buttons: [
            {
              text: "cancel",
              role: "cancel",
              handler: () => {
              }
            }
          ]
        });
        alert.present();
      }
    );
  }

  // toggleShowLogin($event) {
  //   $event.preventDefault();
  //   this.loginOrSignUp = !this.loginOrSignUp;
  // }

  nextloginstate($event, nextstate) {
    $event.preventDefault();
    this.loginstate = nextstate;
  }

  goToSlide() {
    this.slides.slideTo(3, 500);
    this.hideSlides = true;
    this.currentIndex = 4;
  }

  slideChanged() {
    if (this.slides.getActiveIndex() > 3) return;
    this.currentIndex = this.slides.getActiveIndex();
    // this.hideSlides = currentIndex > 3;
  }

  changeState(state) {
    this.loginstate = state;
  }
}
