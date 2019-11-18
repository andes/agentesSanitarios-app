import { ParcelaListPage } from './../parcela/parcelaList';
import { Storage } from '@ionic/storage';
import { ViviendaEditPage } from './viviendaEdit';
import { HogarListPage } from './../hogar/hogarList';
import { AgentesSanitariosProvider } from './../../../providers/agentes-sanitarios/agendes-sanitarios';
import { NavController, Navbar } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';

@Component({
    selector: 'viviendaList',
    templateUrl: 'viviendaList.html'
})
export class ViviendaListPage {
    @ViewChild(Navbar) navBar: Navbar;

    started = false;
    user: any;
    showMpi = false;
    provincias;
    parcelaId;
    viviendas;

    constructor(
        public navCtrl: NavController,
        public agentesSanitariosProvider: AgentesSanitariosProvider,
        private storage: Storage
    ) {}

    async ionViewWillEnter() {
        this.parcelaId = await this.storage.get('parcelaId');
        this.viviendas = await this.agentesSanitariosProvider.getViviendasByparcelaId(this.parcelaId);
    }

    ionViewDidLoad() {
        this.navBar.backButtonClick = () => this.navCtrl.push(ParcelaListPage, {parcelaId: this.parcelaId});
    }

    nuevaVivienda() {
        this.navCtrl.push(ViviendaEditPage, { parcelaId: this.parcelaId} );
    }

    editarVivienda(vivienda) {
        this.navCtrl.push(ViviendaEditPage, { vivienda: vivienda} );
    }

    async listadoHogares(vivienda) {
        this.storage.set('viviendaId', vivienda.id);
        this.navCtrl.push(HogarListPage);
    }
}
