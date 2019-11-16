import { ViviendaEditPage } from './viviendaEdit';
import { HogarListPage } from './../hogar/hogarList';
import { AgentesSanitariosProvider } from './../../../providers/agentes-sanitarios/agendes-sanitarios';
import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
    selector: 'viviendaList',
    templateUrl: 'viviendaList.html'
})
export class ViviendaListPage {
    started = false;
    user: any;
    showMpi = false;
    provincias;
    parcelaId;
    viviendas;

    constructor(
        public navCtrl: NavController,
        public agentesSanitariosProvider: AgentesSanitariosProvider,
        public navParams: NavParams
        ) {
            this.parcelaId = this.navParams.get('parcelaId');
    }

    nuevaVivienda() {
        this.navCtrl.push(ViviendaEditPage, { parcelaId: this.parcelaId} );
    }

    editarVivienda(vivienda) {
        this.navCtrl.push(ViviendaEditPage, { vivienda: vivienda} );
    }

    listadoHogares(vivienda) {
        this.navCtrl.push(HogarListPage, { viviendaId: vivienda['id'] });
    }

    async ionViewWillEnter() {
        this.parcelaId = this.navParams.get('parcelaId');
        this.viviendas = await this.agentesSanitariosProvider.getViviendasByparcelaId(this.parcelaId);
        console.log(this.viviendas)
    }
}
