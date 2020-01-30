import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
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
    private FormGroupParcela: FormGroup;

    constructor(
        public navCtrl: NavController,
        public agentesSanitariosProvider: AgentesSanitariosProvider,
        public navParams: NavParams,
        private formBuilder: FormBuilder
    ) {
        this.FormGroupParcela = this.formBuilder.group({
            nroParcela: ['', Validators.required],
            localidad: ['', Validators.required],
            municipio: ['', Validators.required],
            barrio: ['', Validators.required],
            direccion: ['', Validators.required],
            tipoZona: ['', Validators.required],
            NoRequired: ['']
        });
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
        let error: string = this.validarFormulario()
        if (error === '') {
            await this.guardar();
            this.navCtrl.pop();
        } else {
            alert(error);
        }
    }

    validarFormulario() {
        let rslt = '';
        if (this.parcela.nroParcela === undefined) {
            rslt += '- Número de Parcela es obligatorio!';
        }
        if (this.parcela.municipio === undefined) {
            rslt += '\n\n- Municipio es obligatorio!';
        }
        if (this.parcela.direccion === undefined) {
            rslt += '\n\n- Dirección es obligatorio!';
        }
        if (this.parcela.tipoZona === undefined) {
            rslt += '\n\n- Zona es obligatorio!';
        }
        return rslt;
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
