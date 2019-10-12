import { AgentesSanitariosProvider } from './../../../providers/agentes-sanitarios/agendes-sanitarios';
import { NavController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'consulta-encuestas',
    templateUrl: 'consulta-encuestas.html'
})
export class BuscadorEncuestasPage implements OnInit {
    encuestas;
    constructor(
        public navCtrl: NavController,
        public agentesSanitariosProvider: AgentesSanitariosProvider
        ) {
    }

    async ngOnInit() {
        this.encuestas = await this.agentesSanitariosProvider.obtenerEncuestas();
    }
}
