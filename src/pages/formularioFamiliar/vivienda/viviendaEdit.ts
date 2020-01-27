import { ViviendaLetras } from './../../../assets/files/vivienda-letras';
import { TiposCasa } from './../../../assets/files/tipos-casa';
import { TiposBano } from './../../../assets/files/tipos-baño';
import { MaterialesTecho } from './../../../assets/files/material-techo';
import { MaterialesPiso } from './../../../assets/files/material-piso';
import { MaterialesPared } from './../../../assets/files/material-pared';
import { FuentesAgua } from './../../../assets/files/fuentas-agua';
// LIB
import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
// COMPONENTS
// import { ViviendaListPage } from './viviendaList';
// PROVIDERS
import { AgentesSanitariosProvider } from '../../../providers/agentes-sanitarios/agendes-sanitarios';
// ASSETS
import { Provincias } from '../../../assets/files/provincias';
import { Municipios } from '../../../assets/files/municipios';
import { ZonasUbicacion } from '../../../assets/files/zonasUbicacion';

// INTERFACES
import { IVivienda } from '../../../interfaces/vivienda.interface';
import { ViviendaListPage } from './viviendaList';


@Component({
    selector: 'viviendaEdit',
    templateUrl: 'ViviendaEdit.html'
})

export class ViviendaEditPage {
    parcelaId;

    started = false;
    user: any;
    showMpi = false;
    provincias;
    municipios;
    zonasUbicacion;
    idUsuarioCreacion;
    idUsuarioActualizacion;
    vivienda: IVivienda;

    viviendaLetras;
    fuentesAgua;
    materialesPared;
    materialesPiso;
    materialesTecho;
    tiposBano;
    tiposCasa;

    constructor(
        public navCtrl: NavController,
        public agentesSanitariosProvider: AgentesSanitariosProvider,
        public navParams: NavParams
        ) {

        this.provincias = Provincias;
        this.municipios = Municipios;
        this.zonasUbicacion = ZonasUbicacion;

        this.provincias = Provincias;
        this.viviendaLetras = ViviendaLetras;
        this.fuentesAgua = FuentesAgua;
        this.materialesPared = MaterialesPared;
        this.materialesPiso = MaterialesPiso;
        this.materialesTecho = MaterialesTecho;
        this.tiposBano = TiposBano;
        this.tiposCasa = TiposCasa;
        this.fuentesAgua = FuentesAgua;
        this.nuevaVivienda();
    }

    async ionViewWillEnter() {
        if (this.navParams.get('parcelaId')) {
            this.parcelaId = this.navParams.get('parcelaId');
            this.vivienda.parcelaId = this.parcelaId;
        } else if (this.navParams.get('vivienda')) {
            this.vivienda = this.navParams.get('vivienda');
        }
    }

    nuevaVivienda() {
        this.vivienda = new IVivienda();
        this.idUsuarioCreacion = 23
        this.idUsuarioActualizacion = 23;
        this.vivienda.parcelaId = this.parcelaId;
        this.vivienda.fechaCreacion = new Date();
        this.vivienda.fechaActualizacion = new Date();
    }

    async onClickGuardar() {
        await this.guardar();
        this.navCtrl.pop();
    }

    async guardar() {
        if (!this.vivienda.id) {
            return await this.agentesSanitariosProvider.insertVivienda(this.vivienda);
        } else {
            this.vivienda.idUsuarioActualizacion = 23;
            this.vivienda.fechaActualizacion = new Date();
            await this.agentesSanitariosProvider.updateVivienda(this.vivienda);
            return this.vivienda.id;
        }
    }
}
