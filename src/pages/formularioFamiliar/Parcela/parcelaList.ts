import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { AgentesSanitariosProvider } from '../../../providers/agentes-sanitarios/agendes-sanitarios';
import { ParcelaCreatePage } from './parcelaCreate';
import { ViviendaListPage } from '../vivienda/viviendaList';

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
        console.log('this.parcelas', this.parcelas)
    }

    crearParcela() {
        this.navCtrl.push(ParcelaCreatePage);
    }

    editarParcela(parcela) {
        this.navCtrl.push(ParcelaCreatePage, { parcela: parcela});
    }

    listadoViviendas(parcela) {
        console.log('parcelaId', parcela['id']);
        this.navCtrl.push(ViviendaListPage, { parcelaId: parcela['id']});
    }
}
