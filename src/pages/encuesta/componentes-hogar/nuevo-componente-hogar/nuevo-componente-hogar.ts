import { Component } from '@angular/core';

@Component({
    selector: 'nuevo-componente-hogar',
    templateUrl: 'nuevo-componente-hogar.html'
})
export class NuevoComponenteHogarPage {
    started = false;
    user: any;
    showMpi = false;
    provincias;

    constructor(
        // public navCtrl: NavController,
        ) {
    }
    // ionViewWillEnter() {
    //     this.menuCtrl.enable(true);
    // }

    // ionViewDidLoad() {
    //     setTimeout(() => {
    //         this.started = true;
    //     }, 50);
    // }

    // isLogin() {
    //     return this.authService.user != null;
    // }

    // nuevaEncuesta() {
    //     if (this.isLogin()) {
    //         this.navCtrl.push(Encuesta1Page);
    //     }
    // }

    // isProfesional() {
    //     return this.authService.user && this.authService.user.profesionalId != null;
    // }

    // login() {
    //     if (!this.isLogin()) {
    //         this.navCtrl.push(LoginPage);
    //     } else {
    //         //   this.reporter.report();
    //     }
    // }



}
