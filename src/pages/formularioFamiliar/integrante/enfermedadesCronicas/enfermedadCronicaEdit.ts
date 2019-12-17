import { IntegranteEditPage } from './../integranteEdit';
import { AgentesSanitariosProvider } from './../../../../providers/agentes-sanitarios/agendes-sanitarios';
import { ControlesEnfermedadesCronicas } from './../../../../assets/files/controles-enfermedades-cronicas';
import { Component } from '@angular/core';
import { EnfermedadesCronicas } from './../../../../assets/files/enfermedades-cronicas';
import { NavParams, NavController } from 'ionic-angular';

@Component({
    selector: 'integranteEdit',
    templateUrl: 'enfermedadCronicaEdit.html',
    styles: ['.label-md { margin: 0; }',
        '.select-md { padding: 0; }',
        'ion-select { max-width: none; overflow: visible;}',
        '.andes-list li { padding: 0; border-bottom: none;}']
})
export class EnfermedadesCronicasPage {
    encuestaId;
    started = false;
    user: any;
    showMpi = false;
    controlesEnfermedadesCronicas = ControlesEnfermedadesCronicas;
    enfermedadesCronicasOpciones = EnfermedadesCronicas;
    enfermedadesCronicas = [];
    integranteId;


    constructor(
        public agentesSanitariosProvider: AgentesSanitariosProvider,
        public navParams: NavParams,
        public navCtrl: NavController,
        ) {
    }

    async ionViewWillEnter() {
        this.integranteId = (await this.navParams.get('integrante')).id;
        this.enfermedadesCronicas = await this.agentesSanitariosProvider.getIntegranteEnfermedadesCronicasByIntegranteId(this.integranteId);
    }

    removeEnfermedadCronica(value) {
        this.enfermedadesCronicas = this.enfermedadesCronicas.filter(item => item !== value);
    }

    async onClickGuardar() {
        await this.agentesSanitariosProvider.saveEnfermedadesCronicas(this.enfermedadesCronicas, this.integranteId);
        return this.navCtrl.push(IntegranteEditPage, { integrante: await this.navParams.get('integrante') });
    }

    addEnfermedadCronica() {
        this.enfermedadesCronicas.push({
            idUsuarioCreacion: null,
            idUsuarioActualizacion: null,
            fechaCreacion: null,
            fechaActualizacion: null,
            integranteId: this.integranteId,
            enfermedadCronica: null,
            enfermedadCronicaEstado: null
        });
    }
}
