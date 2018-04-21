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
import { NavController, NavParams } from "ionic-angular";
import { LavaProvider } from "../../providers/lava/lava";
import { ProfileProvider } from "../../providers/profile/profile";
import { FormBuilder, Validators } from "@angular/forms";
/**
 * Generated class for the BookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var BookPage = /** @class */ (function () {
    function BookPage(formBuilder, navCtrl, navParams, assetsProvider, lavaProvider) {
        this.formBuilder = formBuilder;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.assetsProvider = assetsProvider;
        this.lavaProvider = lavaProvider;
        this.done = false;
        this._book = navParams.get("book");
        if (this._book == "class") {
            this.reserveExerciseForm = formBuilder.group({
                Exercise: [
                    "Choose a " + this._book,
                    Validators.compose([Validators.required])
                ],
                Date: [new Date().toISOString(), Validators.required]
            });
            console.log(this.reserveExerciseForm.controls.Exercise);
        }
        else if (this._book == "session") {
            this.reserveSessionForm = formBuilder.group({
                Service: [
                    "Choose a " + this._book,
                    Validators.compose([Validators.required])
                ],
                Date: [new Date().toISOString(), Validators.required]
            });
            console.log(this.reserveSessionForm.controls.Exercise);
        }
    }
    BookPage.prototype.selectChanges = function (selected) {
        if (this._book == "class") {
            this.selectedClass = selected;
        }
        else if (this._book == "session") {
            this.selectedSession = selected;
        }
    };
    BookPage.prototype.compareFn = function (e1, e2) {
        return e1 && e2 ? e1.ID === e2.ID : e1 === e2;
    };
    BookPage.prototype.ionViewDidLoad = function () {
        console.log("ionViewDidLoad BookPage");
        console.log(this._book);
        this.classes$ = this.lavaProvider.getExerciseSchedules();
        this.classes$.subscribe(function (res) {
            console.error(JSON.stringify(res));
        });
        // this.classes$ = this.assetsProvider.getClasses();
        this.sessions$ = this.lavaProvider.getMassageReservations();
    };
    BookPage.prototype.close = function () {
        this.navCtrl.pop();
    };
    BookPage.prototype.book = function () {
        var _this = this;
        if (this._book == "class") {
            this.lavaProvider.reserveExercise(this.reserveExerciseForm.value).subscribe(function (res) { return console.log('reserveExercise', JSON.stringify(res)); });
        }
        else if (this._book == "session") {
            this.lavaProvider.reserveMassageSession(this.reserveSessionForm.value).subscribe(function (res) { return console.log('reserveMassageSession', JSON.stringify(res)); });
        }
        this.done = true;
        setTimeout(function () {
            _this.navCtrl.pop();
        }, 3800);
    };
    BookPage = __decorate([
        Component({
            selector: "page-book",
            templateUrl: "book.html"
        }),
        __metadata("design:paramtypes", [FormBuilder,
            NavController,
            NavParams,
            ProfileProvider,
            LavaProvider])
    ], BookPage);
    return BookPage;
}());
export { BookPage };
//# sourceMappingURL=book.js.map