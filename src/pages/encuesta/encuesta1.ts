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

    encuesta = {
        nroFormulario: null,
        nroPlantilla: null,
        nroParcela: null,
        nroVivienda: null,
        nroHogar: null,
        nombreEncuestador: null,
        apellidoEncuestador: null,
        fechaVisita: null,
        fechaVisita1: null,
        fechaVisita2: null,
        provicia: null,
        municipio: null,
        localidad: null,
        barrio: null,
        direccion: null,
        etnia: null,
        materialPiso: null,
        materialPared: null,
        materialTecho: null,
        cantidadHabitacionesSinServicio: null,
        tieneInstalacionesElectricas: false,
        tieneTratamientoBasura: false,
        tipoCasa: null,
        fuenteAgua: null,
        tipoBano: null,
        tieneAnimalesConsumo: false,
        animalesConsumoVacunados: false,
        animalesConsumoDesparasitados: false,
        tieneAnimalesDomestico: false,
        animalesDomesticosVacunados: false,
        animalesDomesticosDesparasitados: false
    }

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
    }

    async gotoComponentesHogar() {
        await this.agentesSanitariosProvider.insertEncuesta(this.encuesta)
        this.navCtrl.push(ComponentesHogarPage);
    }


}
