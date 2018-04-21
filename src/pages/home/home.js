var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Component } from "@angular/core";
import { NavController, ModalController, AlertController } from "ionic-angular";
import { WorkoutPage } from "../workout/workout";
import { LavaProvider } from "../../providers/lava/lava";
import { ProfileProvider } from "../../providers/profile/profile";
import { BookPage } from "../book/book";
import { map } from "rxjs/operators/map";
import { Health } from "@ionic-native/health";
import { LavaHealthProvider } from "../../providers/lava-health/lava-health";
import moment from "moment";
import { AngularFireAuth } from "angularfire2/auth";
var HomePage = /** @class */ (function () {
    function HomePage(afAuth, modalCtrl, navCtrl, lavaProvider, profileProvider, alertCtrl, health, LavaHealth) {
        this.afAuth = afAuth;
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.lavaProvider = lavaProvider;
        this.profileProvider = profileProvider;
        this.alertCtrl = alertCtrl;
        this.health = health;
        this.LavaHealth = LavaHealth;
        this.workoutPage = WorkoutPage;
        this.myActivity = {
            startDate: 2,
            endDate: 3,
            value: {
                still: { duration: 520000, calories: 30, distance: 0 },
                walking: { duration: 223000, calories: 20, distance: 15 }
            },
            unit: "activitySummary"
        };
        this.myHeartRate = [];
        this.myCalories = [];
        this.myCaloriesActive = [];
        this.myCaloriesBasal = [];
        this.event = {
            startDate: new Date().getMonth() +
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
    }
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.ExerciseReservations$ = this.lavaProvider.getExerciseReservations();
        this.profile$ = this.profileProvider.getProfile();
        this.profile$.subscribe(function (profile) {
            _this.profileProvider.localProfile = profile.data;
        });
        this.upcommingExercises = this.lavaProvider.getExerciseReservations();
        this.workoutsC$ = this.profileProvider
            .getMemberPrograms()
            .pipe(map(function (value) {
            var array = value.data;
            function values(obj) {
                var _i, _a, prop;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _i = 0, _a = Object.keys(obj);
                            _b.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 4];
                            prop = _a[_i];
                            return [4 /*yield*/, obj[prop]];
                        case 2:
                            _b.sent();
                            _b.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            }
            var arr = Array.from(values(array));
            var arr_f = arr.map(function (val) {
                val.CardioProgrameDetail = Array.from(values(val.CardioProgrameDetail));
                val.BodybuildingProgrameDetail = Array.from(values(val.BodybuildingProgrameDetail));
                return val;
            });
            var wokroutsC = {
                workouts: arr,
                sumOfNumberOfWorkoutFinishers: 0,
                sumOfWeekRepetitions: 0
            };
            wokroutsC.workouts.forEach(function (item) {
                if (item.NumberOfWorkoutFinishers) {
                    wokroutsC.sumOfNumberOfWorkoutFinishers += Number(item.NumberOfWorkoutFinishers);
                    item.numberOfWorkoutFinishersT = new Array(Number(item.NumberOfWorkoutFinishers));
                }
                if (item.WeekRepetitions) {
                    wokroutsC.sumOfWeekRepetitions += item.WeekRepetitions;
                }
            });
            return wokroutsC;
        }));
        // this.workoutsSums$ = this.workouts$.pipe(
        //   map(value => {
        //     return;
        //   })
        // );
        // this.workoutsSums$.subscribe(res => {});
        // this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(c => {
        this.health
            .isAvailable()
            .then(function (available) {
            console.log(available);
            _this.health
                .requestAuthorization([
                {
                    read: ["steps"] //read only permission
                }
            ])
                .then(function (res) {
                _this.getSteps();
                _this.getDistance();
            })
                .catch(function (e) { return _this.presentAlert(JSON.stringify(e)); });
        })
            .catch(function (e) { return _this.presentAlert(JSON.stringify(e)); });
        // }).catch(error => {});
        // map(this.workouts$ => {
        //   let array = (value as any).data;
        //   function* values(obj) {
        //     for (let prop of Object.keys(obj))
        //       yield obj[prop]
        //   }
        //   let arr = Array.from(values(array));
        //   console.log(arr);
        // });
        var BookingModal = this.modalCtrl.create(BookPage, { book: "class" });
        // BookingModal.present();
    };
    HomePage.prototype.bookClass = function () {
        // let BookingModal = this.modalCtrl.create(BookPage, {book: 'class'});
        // BookingModal.present();
        this.navCtrl.parent.select(0);
    };
    // this.paymentTabs.select(1);
    HomePage.prototype.getActivity = function () {
        var _this = this;
        this.LavaHealth.getActivity()
            .then(function (data) {
            _this.myActivity = data;
            if (_this.myActivity && _this.myActivity.length) {
                _this.myActivity = _this.myActivity[0];
                _this.myActivity.startDate = moment(_this.myActivity.startDate).fromNow();
                _this.myActivity.endDate = moment(_this.myActivity.endDate).fromNow();
            }
        })
            .catch(function (error) { return _this.presentAlert(JSON.stringify(error)); });
    };
    HomePage.prototype.getSteps = function () {
        var _this = this;
        this.LavaHealth.getSteps()
            .then(function (data) {
            _this.mySteps = data.value;
        })
            .catch(function (error) { return _this.presentAlert(JSON.stringify(error)); });
    };
    HomePage.prototype.getDistance = function () {
        var _this = this;
        this.LavaHealth.getDistance()
            .then(function (data) {
            _this.myDistance = data.value;
        })
            .catch(function (error) { return _this.presentAlert(JSON.stringify(error)); });
    };
    HomePage.prototype.setSteps = function (steps) {
        var _this = this;
        if (steps === void 0) { steps = 200; }
        this.event.value = steps;
        this.LavaHealth.storeSteps(this.event)
            .then(function (response) {
            _this.presentAlert(JSON.stringify(response));
        })
            .catch(function (error) {
            _this.presentAlert(JSON.stringify(error));
        });
    };
    HomePage.prototype.getCalories = function () {
        var _this = this;
        this.LavaHealth.getCalories(new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000))
            .then(function (data) {
            // this.myCalories = Object.keys(data);
            for (var p in data) {
                _this.myCalories.push({
                    name: data[p].startDate.getDate(),
                    value: Math.floor(data[p].value)
                });
            }
        })
            .catch(function (error) {
            _this.presentAlert(JSON.stringify(error));
        });
    };
    HomePage.prototype.isArray = function (array) {
        return Array.isArray(array);
    };
    HomePage.prototype.getCaloriesActive = function () {
        var _this = this;
        this.LavaHealth.getCaloriesActive(new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000))
            .then(function (data) {
            _this.myCaloriesActive = data;
        })
            .catch(function (error) {
            _this.presentAlert(JSON.stringify(error));
        });
    };
    HomePage.prototype.getCaloriesBasal = function () {
        var _this = this;
        this.LavaHealth.getCaloriesBasal(new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000))
            .then(function (data) {
            _this.myCaloriesBasal = data;
        })
            .catch(function (error) {
            _this.presentAlert(JSON.stringify(error));
        });
    };
    HomePage.prototype.setCalories = function () {
        var _this = this;
        var nutritionData = {
            startDate: new Date(new Date().getTime() - 9 * 60 * 60 * 1000),
            endDate: new Date(new Date().getTime() - 4 * 60 * 60 * 1000),
            dataType: "calories",
            value: 8000,
            sourceName: "lava",
            sourceBundleId: "io.ionic.starter"
        };
        this.LavaHealth.setCalories(nutritionData)
            .then(function (response) {
            _this.presentAlert(JSON.stringify(response));
        })
            .catch(function (error) {
            _this.presentAlert(JSON.stringify(error));
        });
    };
    HomePage.prototype.presentAlert = function (msg) {
        var alert = this.alertCtrl.create({
            title: "LavaHealth extension",
            subTitle: msg,
            buttons: ["Dismiss"]
        });
        alert.present();
    };
    HomePage.prototype.goToProfile = function () {
        this.navCtrl.parent.select(4);
    };
    HomePage = __decorate([
        Component({
            selector: "page-home",
            templateUrl: "home.html"
        }),
        __metadata("design:paramtypes", [AngularFireAuth,
            ModalController,
            NavController,
            LavaProvider,
            ProfileProvider,
            AlertController,
            Health,
            LavaHealthProvider])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map