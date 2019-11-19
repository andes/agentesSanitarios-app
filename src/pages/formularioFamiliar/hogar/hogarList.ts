import { Storage } from '@ionic/storage';
import { ViviendaListPage } from './../vivienda/viviendaList';
import { HogarEditPage } from './hogarEdit';
import { IntegranteListPage } from './../integrante/integranteList';
import { NavController, Navbar } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { AgentesSanitariosProvider } from '../../../providers/agentes-sanitarios/agendes-sanitarios';
import { IHogar } from 'interfaces/hogar.interface';

@Component({
    selector: 'hogarList',
    templateUrl: 'hogarList.html'
})

export class HogarListPage {
    @ViewChild(Navbar) navBar: Navbar;
    hogares: IHogar[];
    viviendaId;
    constructor(
        public navCtrl: NavController,
        public agentesSanitariosProvider: AgentesSanitariosProvider,
        private storage: Storage
        ) {
    }

    ionViewDidLoad() {
        this.navBar.backButtonClick = async() => this.navCtrl.push(ViviendaListPage, {parcelaId: await this.storage.get('parcelaId')});
    }

    async ionViewWillEnter() {
        this.viviendaId = await this.storage.get('viviendaId');
        this.hogares = await this.agentesSanitariosProvider.getHogaresByViviendaId(this.viviendaId);
        for ( let i = 0;  i < this.hogares.length; i++) {
            this.hogares[i].integrantes = await this.agentesSanitariosProvider.getIntegrantesByHogarId(this.hogares[i].id);
            this.hogares[i].jefeDeHogar = await this.agentesSanitariosProvider.getJefeDeHogarByHogarId(this.hogares[i].id);
        }
    }

    editarHogar(hogar) {
        this.navCtrl.push(HogarEditPage, {hogar: hogar});
    }

    async nuevoHogar() {
        this.navCtrl.push(HogarEditPage, {viviendaId: this.viviendaId});
    }

    async listadoIntegrantes(hogar) {
       await this.storage.set('hogarId', hogar.id);
        this.navCtrl.push(IntegranteListPage, { hogarId: hogar.id});
    }
}
