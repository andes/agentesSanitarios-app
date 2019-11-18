import { HomePage } from './../../home/home';
import { Storage } from '@ionic/storage';
import { NavController, Navbar } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { AgentesSanitariosProvider } from '../../../providers/agentes-sanitarios/agendes-sanitarios';
import { ParcelaCreatePage } from './parcelaCreate';
import { ViviendaListPage } from '../vivienda/viviendaList';

@Component({
    selector: 'parcelaList',
    templateUrl: 'parcelaList.html'
})
export class ParcelaListPage {
    @ViewChild(Navbar) navBar: Navbar;
    parcelas;

    constructor(
        private navCtrl: NavController,
        private agentesSanitariosProvider: AgentesSanitariosProvider,
        private storage: Storage
    ) {
    }

    ionViewDidLoad() {
        this.navBar.backButtonClick = () => this.navCtrl.setRoot(HomePage);
    }

    async ionViewWillEnter() {
        this.parcelas = await this.agentesSanitariosProvider.obtenerParcelas();
    }

    crearParcela() {
        this.navCtrl.push(ParcelaCreatePage);
    }

    editarParcela(parcela) {
        this.navCtrl.push(ParcelaCreatePage, { parcela: parcela});
    }

    async listadoViviendas(parcela) {
        this.storage.set('parcelaId', parcela.id);
        this.navCtrl.push(ViviendaListPage, { parcelaId: parcela.id});
    }
}
