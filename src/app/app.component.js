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
import { Platform, AlertController } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { TabsPage } from "../pages/tabs/tabs";
import { LoginPage } from "../pages/login/login";
import moment from "moment";
import { Storage } from "@ionic/storage";
import { AuthenticationProvider } from "../providers/authentication/authentication";
import { InAppBrowser } from '@ionic-native/in-app-browser';
var MyApp = /** @class */ (function () {
    function MyApp(iab, alertCtrl, auth, platform, statusBar, splashScreen, storage) {
        var _this = this;
        this.iab = iab;
        this.alertCtrl = alertCtrl;
        this.auth = auth;
        this.storage = storage;
        this.rootPage = LoginPage;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.storage.set("AccessToken", "fb85615cdb316e80787e5a08184f2d04");
            _this.storage.get("AccessToken").then(function (val) {
                if (val) {
                    _this.auth.config.AccessToken = val;
                    _this.rootPage = TabsPage;
                }
            });
            statusBar.styleDefault();
            splashScreen.hide();
            moment.locale("en");
            // this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(c => {}).catch(error => {});
            var alert = _this.alertCtrl.create({
                title: '',
                message: 'To get all the features of Lava Fitness, you have to install Google fit from Playstore',
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: function () {
                            console.log('Cancel clicked');
                        }
                    },
                    {
                        text: 'Get Google Fit',
                        handler: function () {
                            _this.iab.create('https://play.google.com/store/apps/details?id=com.google.android.apps.fitness', '_system');
                        }
                    }
                ]
            });
            alert.present();
        });
    }
    MyApp = __decorate([
        Component({
            templateUrl: "app.html"
        }),
        __metadata("design:paramtypes", [InAppBrowser,
            AlertController,
            AuthenticationProvider,
            Platform,
            StatusBar,
            SplashScreen,
            Storage])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map