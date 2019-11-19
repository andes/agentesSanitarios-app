import { SQLite } from '@ionic-native/sqlite';
import { AgentesSanitariosProvider } from './../../providers/agentes-sanitarios/agendes-sanitarios';
import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';

// pages
import { LoginPage } from '../login/login';
import { DeviceProvider } from '../../providers/auth/device';
import { ErrorReporterProvider } from '../../providers/errorReporter';
import { ParcelaEditPage } from '../formularioFamiliar/parcela/parcelaEdit';
import { ParcelaListPage } from '../formularioFamiliar/parcela/parcelaList';

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
        await this.agentesSanitariosProvider.createTables();
        await this.testInserts();
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
        // return this.authService.user != null;
        return true;
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
