import { IntegranteListPage } from './../integrante/integranteList';
import { HogarListPage } from './../hogar/hogarList';
// LIB
import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
// COMPONENTS
// PROVIDERS
import { AgentesSanitariosProvider } from '../../../providers/agentes-sanitarios/agendes-sanitarios';
// INTERFACES
import { IHogar } from '../../../interfaces/hogar.interface';


@Component({
    selector: 'hogarEdit',
    templateUrl: 'hogarEdit.html'
})

export class HogarEditPage {
    started = false;
    user: any;
    showMpi = false;
    provincias;
    municipios;
    zonasUbicacion;
    idUsuarioCreacion;
    idUsuarioActualizacion;
    hogar: IHogar;
    hogarId;

    constructor(
        public navCtrl: NavController,
        public agentesSanitariosProvider: AgentesSanitariosProvider,
        public navParams: NavParams
        ) {

        this.nuevaHogar();
    }

    nuevaHogar() {
        this.hogar = new IHogar();
        this.hogar.viviendaId = this.navParams.get('viviendaId');
        this.idUsuarioCreacion = 23
        this.idUsuarioActualizacion = 23;
        // this.hogar.fechaCreacion = new Date();
        // this.hogar.fechaActualizacion = new Date();
    }

    async gotoIntegrante() {
        console.log(this.hogar);
        this.hogarId = await this.agentesSanitariosProvider.insertHogar(this.hogar);
        console.log('se guardo!');
        this.navCtrl.push(IntegranteListPage, { hogarId: this.hogarId });
    }


}
