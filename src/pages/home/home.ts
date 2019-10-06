import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';

// pages
import { LoginPage } from '../login/login';
import { Encuesta1Page } from '../encuesta/encuesta1';
import { DeviceProvider } from '../../providers/auth/device';
import { ErrorReporterProvider } from '../../providers/errorReporter';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    started = false;
    user: any;
    showMpi = false;

    constructor(
        public authService: AuthProvider,
        public deviceService: DeviceProvider,
        public navCtrl: NavController,
        public menuCtrl: MenuController,
        public reporter: ErrorReporterProvider) {

        this.user = this.authService.user;
    }
    ionViewWillEnter() {
        this.menuCtrl.enable(true);
    }

    ionViewDidLoad() {
        setTimeout(() => {
            this.started = true;
        }, 50);
    }

    isLogin() {
        return this.authService.user != null;
    }

    nuevaEncuesta() {
        if (this.isLogin()) {
            this.navCtrl.push(Encuesta1Page);
        }
    }

    isProfesional() {
        return this.authService.user && this.authService.user.profesionalId != null;
    }

    login() {
        if (!this.isLogin()) {
            this.navCtrl.push(LoginPage);
        } else {
            //   this.reporter.report();
        }
    }

}
