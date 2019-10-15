import { AgentesSanitariosProvider } from './../../../providers/agentes-sanitarios/agendes-sanitarios';
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
    selector: 'consulta-encuestas',
    templateUrl: 'consulta-encuestas.html'
})
export class BuscadorEncuestasPage {
    encuestas;

    constructor(
        public navCtrl: NavController,
        public agentesSanitariosProvider: AgentesSanitariosProvider
        ) {
    }

    async ionViewWillEnter() {
        this.encuestas = await this.agentesSanitariosProvider.obtenerEncuestas();
    }
}
