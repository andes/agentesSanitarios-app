import { ParcelaListPage } from './parcelaList';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// LIB
// COMPONENTS
// PROVIDERS
import { AgentesSanitariosProvider } from '../../../providers/agentes-sanitarios/agendes-sanitarios';
// ASSETS
import { Provincias } from '../../../assets/files/provincias';
import { Municipios } from '../../../assets/files/municipios';
import { ZonasUbicacion } from '../../../assets/files/zonasUbicacion';
// INTERFACES
import { IParcela } from '../../../interfaces/parcela.interface';


@Component({
    selector: 'parcelaEdit',
    templateUrl: 'parcelaEdit.html'
})

export class ParcelaEditPage {
    started = false;
    user: any;
    showMpi = false;
    provincias;
    municipios;
    tipoZonas;
    idUsuarioCreacion;
    idUsuarioActualizacion;
    parcela: IParcela;

    constructor(
        public navCtrl: NavController,
        public agentesSanitariosProvider: AgentesSanitariosProvider,
        public navParams: NavParams
        ) {

        this.provincias = Provincias;
        this.municipios = Municipios;
        this.tipoZonas = ZonasUbicacion;
        this.nuevaParcela();
    }

    async ionViewWillEnter() {
        if (this.navParams.get('parcela')) {
            this.parcela = this.navParams.get('parcela');
        } else {
            this.nuevaParcela();
        }
    }

    nuevaParcela() {
        this.parcela = new IParcela();
        this.parcela.idUsuarioCreacion = 23
        this.parcela.idUsuarioActualizacion = 23;
        this.parcela.fechaCreacion = new Date();
        this.parcela.fechaActualizacion = new Date();
        this.parcela.provincia = 'San Juan';
    }

    async onClickGuardar() {
        await this.guardar();
        this.navCtrl.push(ParcelaListPage);
    }

    async guardar() {
        if (!this.parcela.id) {
            return await this.agentesSanitariosProvider.insertParcela(this.parcela);
        } else {
            this.parcela.idUsuarioActualizacion = 23;
            this.parcela.fechaActualizacion = new Date();
            await this.agentesSanitariosProvider.updateParcela(this.parcela);
            return this.parcela.id;
        }
    }

}
