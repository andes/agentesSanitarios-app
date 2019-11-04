import { SQLite } from '@ionic-native/sqlite';
import { AgentesSanitariosProvider } from './../../providers/agentes-sanitarios/agendes-sanitarios';
import { BuscadorEncuestasPage } from './../encuesta/consulta-encuestas/consulta-encuestas';
import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';

// pages
import { LoginPage } from '../login/login';
import { Encuesta1Page } from '../encuesta/encuesta1';
import { DeviceProvider } from '../../providers/auth/device';
import { ErrorReporterProvider } from '../../providers/errorReporter';
import { ParcelaCreatePage } from '../formularioFamiliar/parcela/parcelaCreate';

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
        public agentesSanitariosProvider: AgentesSanitariosProvider) {

        this.user = this.authService.user;
    }

    ionViewWillEnter() {
        this.menuCtrl.enable(true);
    }

    async ionViewDidLoad() {
        await this.createDatabase();
        console.log('gonna  create tables')
        await this.agentesSanitariosProvider.createTables();
        console.log('tables created')
        await this.testInserts();
        setTimeout(() => {
            this.started = true;
        }, 50);
    }

    async reset() {
        await this.agentesSanitariosProvider.dropTables();
        await this.agentesSanitariosProvider.createTables();
        return await this.agentesSanitariosProvider.testQueries();
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
            console.log('error al crear base de datos');
            console.log(err);
            return (err);
        }
    }

    isLogin() {
        // return this.authService.user != null;
        return true;
    }

    nuevaEncuesta() {
        if (this.isLogin()) {
            this.navCtrl.push(Encuesta1Page);
        }
    }

    crearParcela() {
        if (this.isLogin()) {
            console.log('por hacer push');
            this.navCtrl.push(ParcelaCreatePage);
            console.log('luego de hacer push');
        }
    }
    consultarEncuestas() {
        if (this.isLogin()) {
            this.navCtrl.push(BuscadorEncuestasPage);
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
