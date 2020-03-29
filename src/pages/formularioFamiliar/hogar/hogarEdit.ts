import { CausasMuerte } from './../../../assets/files/causas-muerte';
// LIB
import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
// COMPONENTS
// PROVIDERS
import { AgentesSanitariosProvider } from '../../../providers/agentes-sanitarios/agentes-sanitarios';
// INTERFACES
import { IHogar } from '../../../interfaces/hogar.interface';
import { HogarListPage } from './hogarList';


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
    causasMuerte = CausasMuerte;

    constructor(
        public navCtrl: NavController,
        public agentesSanitariosProvider: AgentesSanitariosProvider,
        public navParams: NavParams
        ) {
        this.nuevaHogar();
    }

    async ionViewWillEnter() {
        if (this.navParams.get('viviendaId')) {
            this.hogar.viviendaId = this.navParams.get('viviendaId');
        } else if (this.navParams.get('hogar')) {
            this.hogar = this.navParams.get('hogar');
        }
    }

    nuevaHogar() {
        this.hogar = new IHogar();
        this.idUsuarioCreacion = 23
        this.idUsuarioActualizacion = 23;
        this.hogar.fechaCreacion = new Date();
        this.hogar.fechaActualizacion = new Date();
    }

    async gotoIntegrante() {
        this.hogar.id = await this.guardar();
        this.navCtrl.pop();
    }

    async guardar() {
        if (!this.hogar.id) {
            return await this.agentesSanitariosProvider.insertHogar(this.hogar);
        } else {
            this.hogar.idUsuarioActualizacion = 23;
            this.hogar.fechaActualizacion = new Date();
            await this.agentesSanitariosProvider.updateHogar(this.hogar);
            return this.hogar.id;
        }
    }


}
