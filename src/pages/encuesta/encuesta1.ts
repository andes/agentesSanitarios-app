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

    constructor(
        public navCtrl: NavController,
        ) {

        this.provincias = Provincias;
        this.fuentesAgua = FuentesAgua;
        this.materialesPared = MaterialesPared;
        this.materialesPiso = MaterialesPiso;
        this.materialesTecho = MaterialesTecho;
        this.tiposBano = TiposBano;
        this.tiposCasa = TiposCasa;
    }

    gotoComponentesHogar() {
        this.navCtrl.push(ComponentesHogarPage);
    }


}
