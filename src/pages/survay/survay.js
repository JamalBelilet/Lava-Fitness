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
import { NavController, NavParams } from 'ionic-angular';
/**
 * Generated class for the SurvayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SurvayPage = /** @class */ (function () {
    function SurvayPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.survay = [];
    }
    SurvayPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SurvayPage');
        this.survay = [
            {
                question: 'Non sunt fugiat ut labore ipsum reprehenderit eiusmod ?',
                answer: { text: 'Very Good', value: 3 },
                options: [
                    { text: 'Very Good', value: 3 },
                    { text: 'Needs Improvments', value: 2 },
                    { text: 'Very Bad', value: 1 },
                ]
            },
            {
                question: 'Adipisicing voluptate in aliquip Lorem ?',
                answer: { text: 'Very Good', value: 3 },
                options: [
                    { text: 'Very Good', value: 3 },
                    { text: 'Needs Improvments', value: 2 },
                    { text: 'Very Bad', value: 1 },
                ]
            },
            {
                question: 'Aliquip aliqua cupidatat ad amet officia non culpa dolore ?',
                answer: { text: 'Very Good', value: 3 },
                options: [
                    { text: 'Very Good', value: 3 },
                    { text: 'Needs Improvments', value: 2 },
                    { text: 'Very Bad', value: 1 },
                ]
            },
            {
                question: 'Culpa velit consequat pariatur esse ut est ?',
                answer: { text: 'Very Good', value: 3 },
                options: [
                    { text: 'Very Good', value: 3 },
                    { text: 'Needs Improvments', value: 2 },
                    { text: 'Very Bad', value: 1 },
                ]
            }
        ];
    };
    SurvayPage.prototype.submit = function () {
        this.navCtrl.pop();
    };
    SurvayPage = __decorate([
        Component({
            selector: 'page-survay',
            templateUrl: 'survay.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], SurvayPage);
    return SurvayPage;
}());
export { SurvayPage };
//# sourceMappingURL=survay.js.map