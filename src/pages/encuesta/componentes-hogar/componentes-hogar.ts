import { AgentesSanitariosProvider } from './../../../providers/agentes-sanitarios/agendes-sanitarios';
import { NuevoComponenteHogarPage } from './nuevo-componente-hogar/nuevo-componente-hogar';
import { NavController } from 'ionic-angular';
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
    componentesHogar

    constructor(
        public navCtrl: NavController,
        public agentesSanitariosProvider: AgentesSanitariosProvider
        ) {
    }

    nuevoComponenteHogar() {
        this.navCtrl.push(NuevoComponenteHogarPage);
    }

    async ionViewWillEnter() {
        this.componentesHogar = await this.agentesSanitariosProvider.obtenerComponentesHogar(null);
    }
}
