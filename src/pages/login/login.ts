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
  signupForm: FormGroup;
  verifyForm: FormGroup;
  signinForm: FormGroup;
  loginstate = "signin";

  cities$: Observable<Object>;



  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private auth: AuthenticationProvider,
    private alertCtrl: AlertController,
    private profileProvider: ProfileProvider,
    public loadingCtrl: LoadingController
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
      // FullName: [
      //   "",
      //   Validators.compose([
      //     Validators.required,
      //     Validators.maxLength(30),
      //     Validators.pattern(/[a-zA-Z0-9_]+/)
      //   ])
      // ],
      MobileNumber: [
        "",
        Validators.compose([
          Validators.required,
          Validators.maxLength(30),
          Validators.pattern(/[a-zA-Z0-9_]+/)
        ])
      ],
      CityID: [
        "Choose your city",
        Validators.compose([
          Validators.required,
          Validators.maxLength(30),
          Validators.pattern(/[a-zA-Z0-9_]+/)
        ])
      ]
      // RegionID: ['', Validators.compose([Validators.required, Validators.maxLength(30),
      //   Validators.pattern(/[a-zA-Z0-9_]+/)]),
      // ],
      // Email: ['', Validators.compose(
      //   [Validators.required, Validators.maxLength(40),
      //     Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])],

      // NationalityID: ['', Validators.compose([Validators.required, Validators.maxLength(30),
      //   Validators.pattern(/[a-zA-Z0-9_]+/)]),
      // ],
      // Language: ['', Validators.compose([Validators.required, Validators.maxLength(30),
      //   Validators.pattern(/[a-zA-Z0-9_]+/)]),
      // ],
      // BirthDate: ['', Validators.compose([Validators.required, Validators.maxLength(30),
      //   Validators.pattern(/[a-zA-Z0-9_]+/)]),
      // ],
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");

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
        if (this.loginstate == "signin") {
          this.loginstate = "verify";

          this.verifyForm.controls.MobileNumber.setValue(
            this.signinForm.value.MobileNumber
          );

          return;
        }
        this.navCtrl.setRoot(TabsPage);

        // let alert = this.alertCtrl.create({
        //   title: "Enter verification code",
        //   message: "The code we sent to " + this.signinForm.value.MobileNumber,
        //   inputs: [
        //     {
        //       name: "code",
        //       placeholder: "code",
        //       type: "number"
        //     }
        //   ],
        //   buttons: [
        //     {
        //       text: "cancel",
        //       role: "cancel",
        //       handler: () => {
        //         console.log("Cancel clicked");
        //       }
        //     },
        //     {
        //       text: "Log in",
        //       handler: () => {
        //         this.navCtrl.setRoot(TabsPage);
        //       }
        //     }
        //   ]
        // });
        // alert.present();
      },
      error => {
        loading.dismiss();
        let alert = this.alertCtrl.create({
          // message: error.error.errors,
          message: error.error.errors || "Check your network connection !",
          buttons: [
            {
              text: "cancel",
              role: "cancel",
              handler: () => {
                console.log("Cancel clicked");
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
        return;
        // let alert = this.alertCtrl.create({
        //   title: "Enter verification code",
        //   message: "The code we sent to " + this.signupForm.value.MobileNumber,
        //   inputs: [
        //     {
        //       name: "code",
        //       placeholder: "code",
        //       type: "number"
        //     }
        //   ],
        //   buttons: [
        //     {
        //       text: "cancel",
        //       role: "cancel",
        //       handler: () => {
        //         console.log("Cancel clicked");
        //       }
        //     },
        //     {
        //       text: "Log in",
        //       handler: () => {
        //         this.navCtrl.setRoot(TabsPage);
        //       }
        //     }
        //   ]
        // });
        // alert.present();
      },
      error => {
        loading.dismiss();
        let alert = this.alertCtrl.create({
          // message: error.error.errors,
          message: error.error.errors || "Check your network connection !",
          buttons: [
            {
              text: "cancel",
              role: "cancel",
              handler: () => {
                console.log("Cancel clicked");
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
}
