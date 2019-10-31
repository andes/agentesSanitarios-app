import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { AgentesSanitariosProvider } from '../../../providers/agentes-sanitarios/agendes-sanitarios';

@Component({
    selector: 'parcelaList',
    templateUrl: 'parcelaList.html'
})
export class ParcelaListPage {
    parcelas;

    constructor(
        public navCtrl: NavController,
        public agentesSanitariosProvider: AgentesSanitariosProvider
        ) {
    }

    async ionViewWillEnter() {
        this.parcelas = await this.agentesSanitariosProvider.obtenerParcelas();
    }
}