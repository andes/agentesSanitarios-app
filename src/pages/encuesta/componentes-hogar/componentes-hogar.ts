import { AgentesSanitariosProvider } from './../../../providers/agentes-sanitarios/agendes-sanitarios';
import { NuevoComponenteHogarPage } from './nuevo-componente-hogar/nuevo-componente-hogar';
import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
    selector: 'componentes-hogar',
    templateUrl: 'componentes-hogar.html'
})
export class ComponentesHogarPage {
    started = false;
    user: any;
    showMpi = false;
    provincias;
    componentesHogar;

    encuestaId;


    constructor(
        public navCtrl: NavController,
        public agentesSanitariosProvider: AgentesSanitariosProvider,
        public navParams: NavParams
        ) {
            this.encuestaId = this.navParams.get('encuestaId');
    }

    nuevoComponenteHogar() {
        this.navCtrl.push(NuevoComponenteHogarPage, { encuestaId: this.encuestaId} );
    }

    async ionViewWillEnter() {
        this.componentesHogar = await this.agentesSanitariosProvider.obtenerComponentesHogar(this.encuestaId);
        console.log(this.componentesHogar)

    }
}
