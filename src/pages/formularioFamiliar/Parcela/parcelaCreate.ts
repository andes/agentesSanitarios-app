// LIB
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
// COMPONENTS
import { ParcelaListPage } from './parcelaList';
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
        public agentesSanitariosProvider: AgentesSanitariosProvider
        ) {

        this.provincias = Provincias;
        this.municipios = Municipios;
        this.zonasUbicacion = ZonasUbicacion;
        this.nuevaParcela();
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
        console.log(this.parcela);
        await this.agentesSanitariosProvider.insertParcela(this.parcela)
        console.log('se guardo!');
        this.navCtrl.push(ParcelaListPage);
    }


}
