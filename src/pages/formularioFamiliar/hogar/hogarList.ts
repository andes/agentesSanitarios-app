import { Storage } from '@ionic/storage';
import { ViviendaListPage } from './../vivienda/viviendaList';
import { HogarEditPage } from './hogarEdit';
import { IntegranteListPage } from './../integrante/integranteList';
import { NavController, Navbar } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { AgentesSanitariosProvider } from '../../../providers/agentes-sanitarios/agendes-sanitarios';

@Component({
    selector: 'hogarList',
    templateUrl: 'hogarList.html'
})

export class HogarListPage {
    @ViewChild(Navbar) navBar: Navbar;
    hogares;
    viviendaId;

    constructor(
        public navCtrl: NavController,
        public agentesSanitariosProvider: AgentesSanitariosProvider,
        private storage: Storage
        ) {
    }

    ionViewDidLoad() {
        this.navBar.backButtonClick = async() => this.navCtrl.push(ViviendaListPage, {parcelaId:await this.storage.get('parcelaId')});
    }

    async ionViewWillEnter() {
        this.viviendaId = await this.storage.get('viviendaId');
        this.hogares = await this.agentesSanitariosProvider.getHogaresByViviendaId(this.viviendaId);

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
