import { Storage } from '@ionic/storage';
import { HogarListPage } from './../hogar/hogarList';
import { NavController, Navbar } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { AgentesSanitariosProvider } from '../../../providers/agentes-sanitarios/agendes-sanitarios';
import { IntegranteEditPage } from './integranteEdit';

@Component({
    selector: 'integranteList',
    templateUrl: 'integranteList.html'
})

export class IntegranteListPage {
    @ViewChild(Navbar) navBar: Navbar;
    integrantes;
    hogarId;

    constructor(
        public navCtrl: NavController,
        public agentesSanitariosProvider: AgentesSanitariosProvider,
        private storage: Storage
        ) {
    }

    ionViewDidLoad() {
        this.navBar.backButtonClick = async () => this.navCtrl.push(HogarListPage, { viviendaId: await this.storage.get('viviendaId')} );
    }

    async ionViewWillEnter() {
        this.hogarId = await this.storage.get('hogarId');
        this.integrantes = await this.agentesSanitariosProvider.getIntegrantesByHogarId(this.hogarId);
    }

    async nuevoIntegrante() {
        this.navCtrl.push(IntegranteEditPage, {hogarId: this.hogarId});
    }

    editarIntegrante(integrante) {
        this.navCtrl.push(IntegranteEditPage, {integrante: integrante});
    }

}
