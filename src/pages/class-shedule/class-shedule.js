var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { BookPage } from '../book/book';
/**
 * Generated class for the ClassShedulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ClassShedulePage = /** @class */ (function () {
    function ClassShedulePage(modalCtrl, navCtrl, navParams) {
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ClassShedulePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ClassShedulePage');
    };
    ClassShedulePage.prototype.bookClass = function () {
        var BookingModal = this.modalCtrl.create(BookPage, { book: 'class' });
        BookingModal.present();
    };
    ClassShedulePage.prototype.bookSession = function () {
        var BookingModal = this.modalCtrl.create(BookPage, { book: 'session' });
        BookingModal.present();
    };
    ClassShedulePage = __decorate([
        Component({
            selector: 'page-class-shedule',
            templateUrl: 'class-shedule.html',
        }),
        __metadata("design:paramtypes", [ModalController,
            NavController, NavParams])
    ], ClassShedulePage);
    return ClassShedulePage;
}());
export { ClassShedulePage };
//# sourceMappingURL=class-shedule.js.map