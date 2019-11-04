import { HogarEditPage } from './hogarEdit';
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

    async nuevoHogar() {
        // let insertId = (await this.agentesSanitariosProvider.insertEncuesta(this.encuesta)).insertId;
        this.navCtrl.push(HogarEditPage, {viviendaId: this.viviendaId});
    }

}
