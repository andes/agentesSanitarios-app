import { NavController, NavParams } from 'ionic-angular';
import { Component, ɵConsole } from '@angular/core';
import { AgentesSanitariosProvider } from '../../../providers/agentes-sanitarios/agendes-sanitarios';
import { IntegranteEditPage } from './integranteEdit';

@Component({
    selector: 'integranteList',
    templateUrl: 'integranteList.html'
})
export class IntegranteListPage {
    integrantes;
    hogarId;

    constructor(
        public navCtrl: NavController,
        public agentesSanitariosProvider: AgentesSanitariosProvider,
        public navParams: NavParams
        ) {
    }

    async ionViewWillEnter() {
        this.hogarId = this.navParams.get('hogarId');
        console.log('this.hogarId', this.hogarId)
        this.integrantes = await this.agentesSanitariosProvider.getIntegrantesByHogarId(this.hogarId);
        console.log('integrantes', this.integrantes);
    }

    async nuevoIntegrante() {
        // let insertId = (await this.agentesSanitariosProvider.insertEncuesta(this.encuesta)).insertId;
        this.navCtrl.push(IntegranteEditPage, {hogarId: this.hogarId});
    }

    clickIntegrante(integrante) {
        this.navCtrl.push(IntegranteEditPage, {integrante: integrante});
    }

}
