import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

// Providers...
import { DeviceProvider } from '../../providers/auth/device';
import { AuthProvider } from '../../providers/auth/auth';
import { ToastProvider } from '../../providers/toast';
import { ConstanteProvider } from '../../providers/constantes';

// PAGES...

import { PrincipalPage } from '../principal/principal';
// import { OrganizacionesPage } from './organizaciones/organizaciones';
import { VerificaCodigoPage } from '../registro/verifica-codigo/verifica-codigo';
import { InformacionValidacionPage } from '../registro/informacion-validacion/informacion-validacion';
import { RecuperarPasswordPage } from '../registro/recuperar-password/recuperar-password';
import { HomePage } from '../home/home';
import { RegistroUserDataPage } from '../registro/user-data/user-data';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    email: string;
    password: string;
    inProgress = false;
    emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    dniRegex = /^[0-9]{7,8}$/;

    constructor(
        public assetsService: ConstanteProvider,
        private toastCtrl: ToastProvider,
        public deviceProvider: DeviceProvider,
        public authService: AuthProvider,
        public loadingCtrl: LoadingController,
        public navCtrl: NavController,
        public navParams: NavParams) {

    }

    ionViewDidLoad() {
    }


    public onKeyPress($event, tag) {
        if ($event.keyCode === 13) {
            if (tag === 'submit') {
                this.login();
            } else {
                let element = document.getElementById(tag);
                if (element) {
                    element.focus();
                }
            }
        }
    }

    public registro() {
        this.navCtrl.push(InformacionValidacionPage);

    }

    public recuperarPassword() {
        this.navCtrl.push(RecuperarPasswordPage);
    }

    public codigo() {
        this.navCtrl.push(VerificaCodigoPage);
    }

    public login() {
        if (!this.email || !this.password) {
            this.toastCtrl.danger('Complete los datos para ingresar.');
            return;
        }
            let credenciales = {
                usuario: this.email,
                password: this.password,
                mobile: true
            }
            this.inProgress = true;
            this.authService.loginProfesional(credenciales).then((resultado) => {
                this.inProgress = false;
                this.deviceProvider.sync();
                let params = {
                    esGestion: resultado.user.esGestion ? resultado.user.esGestion : false,
                    mantenerSesion: resultado.user.mantenerSesion ? resultado.user.mantenerSesion : true
                };
                // this.navCtrl.setRoot(OrganizacionesPage);

                this.navCtrl.setRoot(HomePage);
            }).catch(() => {
                this.inProgress = false;
                this.toastCtrl.danger('Credenciales incorrectas');
            });

    }

}
