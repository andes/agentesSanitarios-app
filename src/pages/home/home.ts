import { SQLite } from '@ionic-native/sqlite';
import { AgentesSanitariosProvider } from './../../providers/agentes-sanitarios/agendes-sanitarios';
import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
// import { NetworkProvider } from '../../providers/network';
// import { ToastProvider } from '../../providers/toast';

import { AuthProvider } from '../../providers/auth/auth';

// pages
import { LoginPage } from '../login/login';
import { DeviceProvider } from '../../providers/auth/device';
import { ErrorReporterProvider } from '../../providers/errorReporter';
import { ParcelaEditPage } from '../formularioFamiliar/parcela/parcelaEdit';
import { ParcelaListPage } from '../formularioFamiliar/parcela/parcelaList';
import { EscanerDniPage } from '../registro/escaner-dni/escaner-dni';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    started = false;
    user: any;
    showMpi = false;

    constructor(
        public sqlite: SQLite,
        public authService: AuthProvider,
        public deviceService: DeviceProvider,
        public navCtrl: NavController,
        public menuCtrl: MenuController,
        public reporter: ErrorReporterProvider,
        public agentesSanitariosProvider: AgentesSanitariosProvider,
        // public toastProvider: ToastProvider,
        // public network: NetworkProvider
        ) {

        this.user = this.authService.user;
    }

    ionViewWillEnter() {
        this.menuCtrl.enable(true);
    }

    async ionViewDidLoad() {
        await this.createDatabase();
        await this.agentesSanitariosProvider.createTables();
        setTimeout(() => this.started = true, 50);
    }

    async reset() {
        await this.agentesSanitariosProvider.dropTables();
        await this.agentesSanitariosProvider.createTables();
    }
    async testInserts() {
        return this.agentesSanitariosProvider.testQueries();
    }

    private async createDatabase() {
        try {
            const db = await this.sqlite.create({
                name: 'data.db',
                location: 'default' // the location field is required
            })
            await this.agentesSanitariosProvider.setDatabase(db);
        } catch (err) {
            return (err);
        }
    }

    isLogin() {
        return this.authService.user != null;
    }

    crearParcela() {
        if (this.isLogin()) {
            this.navCtrl.push(ParcelaEditPage);
        }
    }
    listarParcela() {
        if (this.isLogin()) {
            this.navCtrl.push(ParcelaListPage);
        }
    }

    scanDocumento() {
        if (this.isLogin()) {
            this.navCtrl.push(EscanerDniPage);
        }
    }

    login() {
        if (!this.isLogin()) {
            this.navCtrl.push(LoginPage);
        } else {
            //   this.reporter.report();
        }
    }

    // async sincronizar() {
    //     try {
    //         let estadoDispositivo = this.network.getCurrentNetworkStatus(); // online-offline

    //         if (estadoDispositivo === 'online') {
    //             // if (actualizar || actualizarProf || act) {
    //             //     this.actualizando = true;
    //             //     // if (estadoDispositivo === 'online') {
    //                 let params: any = {};
    //                 if (this.authService.user != null) {
    //                     params.usuario = {
    //                         email: this.authService.user.email,
    //                         password: this.authService.user.password
    //                     }
    //                 }

    //                 let body = {
    //                     idRegistro: 'XXX'
    //                 }
    //                 let migro = await this.agentesSanitariosProvider.sincronizarDatos(params, body);
    //             //     if (migro) {
    //             //         this.ultimaActualizacion = new Date();
    //             //         this.ultimaActualizacionProf = new Date();

    //             //     }
    //             //     this.actualizando = false;
    //             // }
    //         } else {
    //             this.toastProvider.danger('No hay conexión a internet.');
    //         }
    //         // this.periodo = await this.datosGestion.maxPeriodo();
    //         // this.perDesdeMort = await this.datosGestion.desdePeriodoMortalidad();
    //         // this.perHastaMort = await this.datosGestion.hastaPeriodoMortalidad();
    //     } catch (error) {
    //         return (error);
    //     }
    // }

}
