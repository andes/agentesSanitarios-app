import { AgentesSanitariosProvider } from './../../providers/agentes-sanitarios/agendes-sanitarios';
import { ComponentesHogarPage } from './componentes-hogar/componentes-hogar';
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Provincias } from '../../assets/files/provincias';

import { FuentesAgua } from '../../assets/files/fuentas-agua';
import { MaterialesPared } from '../../assets/files/material-pared';
import { MaterialesPiso } from '../../assets/files/material-piso';
import { MaterialesTecho } from '../../assets/files/material-techo';
import { TiposBano } from '../../assets/files/tipos-baño';
import { TiposCasa } from '../../assets/files/tipos-casa';
import { IEncuesta } from '../../interfaces/encuesta.interface';

@Component({
    selector: 'encuesta1',
    templateUrl: 'encuesta1.html'
})
export class Encuesta1Page {
    started = false;
    user: any;
    showMpi = false;
    provincias;
    fuentesAgua;
    materialesPared;
    materialesPiso;
    materialesTecho;
    tiposBano;
    tiposCasa;

    encuesta: IEncuesta;

    constructor(
        public navCtrl: NavController,
        public agentesSanitariosProvider: AgentesSanitariosProvider
        ) {

        this.provincias = Provincias;
        this.fuentesAgua = FuentesAgua;
        this.materialesPared = MaterialesPared;
        this.materialesPiso = MaterialesPiso;
        this.materialesTecho = MaterialesTecho;
        this.tiposBano = TiposBano;
        this.tiposCasa = TiposCasa;
        this.fuentesAgua = FuentesAgua;

        this.nuevaEncuesta();
    }

    nuevaEncuesta() {
        this.encuesta = new IEncuesta();
        this.encuesta.fechaVisita = new Date();
        this.encuesta.provincia = 'San Juan';
    }

    async gotoComponentesHogar() {
        await this.agentesSanitariosProvider.insertEncuesta(this.encuesta)
        this.navCtrl.push(ComponentesHogarPage);
    }


}
