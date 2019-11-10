import { ViviendaListPage } from './../vivienda/viviendaList';
import { ViviendaEditPage } from './../vivienda/viviendaEdit';
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
    selector: 'parcelaCreate',
    templateUrl: 'parcelaCreate.html'
})

export class ParcelaCreatePage {
    started = false;
    user: any;
    showMpi = false;
    provincias;
    municipios;
    zonasUbicacion;
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
        this.zonasUbicacion = ZonasUbicacion;
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
        this.idUsuarioCreacion = 23
        this.idUsuarioActualizacion = 23;
        this.parcela.fechaCreacion = new Date();
        this.parcela.fechaActualizacion = new Date();
        this.parcela.provincia = 'San Juan';
    }

    async gotoParcelaList() {
        let parcelaId = await this.guardar();
        this.navCtrl.push(ViviendaListPage, { parcelaId: parcelaId });
    }

    async guardar() {
        if (!this.parcela.id) {
            return await this.agentesSanitariosProvider.insertParcela(this.parcela);
        } else {
            await this.agentesSanitariosProvider.updateParcela(this.parcela);
            return this.parcela.id;
        }
    }

}
