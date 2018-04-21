var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "@angular/core";
import { NavController, NavParams, AlertController, LoadingController } from "ionic-angular";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthenticationProvider } from "../../providers/authentication/authentication";
import { TabsPage } from "../tabs/tabs";
import { ProfileProvider } from "../../providers/profile/profile";
import { ViewChild } from "@angular/core";
import { Slides } from "ionic-angular";
import { Storage } from '@ionic/storage';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, formBuilder, auth, alertCtrl, profileProvider, loadingCtrl, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.auth = auth;
        this.alertCtrl = alertCtrl;
        this.profileProvider = profileProvider;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.currentIndex = 0;
        this.loginstate = "signup";
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
                    Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)
                ])
            ]
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
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log("ionViewDidLoad LoginPage");
        this.cities$ = this.profileProvider.getCities();
        this.cities$.subscribe(function (res) { return console.log(JSON.stringify(res)); });
    };
    LoginPage.prototype.onSignIn = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            spinner: "hide",
            content: "Please Wait..."
        });
        loading.present();
        this.auth.login(this.signinForm.value).subscribe(function (res) {
            loading.dismiss();
            _this.loginstate = "verify";
            _this.auth.config.AccessToken = res.data.AccessToken;
            _this.verifyForm.controls.MobileNumber.setValue(_this.signinForm.value.MobileNumber);
        }, function (error) {
            loading.dismiss();
            var alert = _this.alertCtrl.create({
                // message: error.error.errors,
                message: error.error.errors || JSON.stringify(error),
                buttons: [
                    {
                        text: "cancel",
                        role: "cancel",
                        handler: function () {
                            console.log("Cancel clicked");
                        }
                    }
                ]
            });
            alert.present();
        });
    };
    LoginPage.prototype.onVerify = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            spinner: "hide",
            content: "Please Wait..."
        });
        loading.present();
        this.auth.verify(this.verifyForm.value).subscribe(function (res) {
            loading.dismiss();
            _this.auth.config.AccessToken = res.data.AccessToken;
            _this.navCtrl.setRoot(TabsPage);
            _this.storage.set("AccessToken", res.data.AccessToken);
        }, function (error) {
            loading.dismiss();
            var alert = _this.alertCtrl.create({
                // message: error.error.errors,
                message: error.error.errors || JSON.stringify(error),
                buttons: [
                    {
                        text: "cancel",
                        role: "cancel",
                        handler: function () {
                            console.log("Cancel clicked");
                        }
                    }
                ]
            });
            alert.present();
        });
    };
    LoginPage.prototype.onSignUp = function (user) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            spinner: "hide",
            content: "Please Wait..."
        });
        loading.present();
        this.auth.register(this.signupForm.value).subscribe(function (res) {
            loading.dismiss();
            _this.loginstate = "verify";
            _this.auth.config.AccessToken = res.data.AccessToken;
            _this.verifyForm.controls.MobileNumber.setValue(_this.signupForm.value.MobileNumber);
            // this.navCtrl.setRoot(TabsPage);
            _this.auth.config.AccessToken = res.data.AccessToken;
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
        }, function (error) {
            loading.dismiss();
            var alert = _this.alertCtrl.create({
                // message: error.error.errors,
                message: error.error.errors || JSON.stringify(error),
                buttons: [
                    {
                        text: "cancel",
                        role: "cancel",
                        handler: function () {
                            console.log("Cancel clicked");
                        }
                    }
                ]
            });
            alert.present();
        });
    };
    // toggleShowLogin($event) {
    //   $event.preventDefault();
    //   this.loginOrSignUp = !this.loginOrSignUp;
    // }
    LoginPage.prototype.nextloginstate = function ($event, nextstate) {
        $event.preventDefault();
        this.loginstate = nextstate;
    };
    LoginPage.prototype.goToSlide = function () {
        this.slides.slideTo(3, 500);
        this.hideSlides = true;
        this.currentIndex = 4;
    };
    LoginPage.prototype.slideChanged = function () {
        if (this.slides.getActiveIndex() > 3)
            return;
        this.currentIndex = this.slides.getActiveIndex();
        // this.hideSlides = currentIndex > 3;
    };
    LoginPage.prototype.changeState = function (state) {
        this.loginstate = state;
    };
    __decorate([
        ViewChild(Slides),
        __metadata("design:type", Slides)
    ], LoginPage.prototype, "slides", void 0);
    LoginPage = __decorate([
        Component({
            selector: "page-login",
            templateUrl: "login.html"
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            FormBuilder,
            AuthenticationProvider,
            AlertController,
            ProfileProvider,
            LoadingController,
            Storage])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map