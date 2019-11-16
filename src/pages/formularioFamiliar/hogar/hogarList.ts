import { HogarEditPage } from './hogarEdit';
import { IntegranteListPage } from './../integrante/integranteList';
import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { AgentesSanitariosProvider } from '../../../providers/agentes-sanitarios/agendes-sanitarios';

@Component({
    selector: 'hogarList',
    templateUrl: 'hogarList.html'
})
export class HogarListPage {
    hogares;
    viviendaId;

    constructor(
        public navCtrl: NavController,
        public agentesSanitariosProvider: AgentesSanitariosProvider,
        public navParams: NavParams
        ) {
    }

    async ionViewWillEnter() {
        this.viviendaId = this.navParams.get('viviendaId');
        this.hogares = await this.agentesSanitariosProvider.getHogaresByViviendaId(this.viviendaId);
        console.log('hogares', this.hogares);

    }

    editarHogar(hogar) {
        this.navCtrl.push(HogarEditPage, {hogar: hogar});
    }

    async nuevoHogar() {
        // let insertId = (await this.agentesSanitariosProvider.insertEncuesta(this.encuesta)).insertId;
        this.navCtrl.push(HogarEditPage, {viviendaId: this.viviendaId});
    }

    listadoIntegrantes(hogar) {
        this.navCtrl.push(IntegranteListPage, { hogarId: hogar['id'] });
    }
}
