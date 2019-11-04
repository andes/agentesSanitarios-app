import { AgentesSanitariosProvider } from './../../../providers/agentes-sanitarios/agendes-sanitarios';
import { IIntegrante } from './../../../interfaces/integrante.interface';
import { Ocupaciones } from './../../../assets/files/ocupaciones';
import { Sexos } from './../../../assets/files/sexos';
import { RelacionesJefeNinguno } from './../../../assets/files/relaciones-jefe-ninguno';
import { RelacionesJefe } from './../../../assets/files/relaciones-jefe';
import { NivelesEducacion } from './../../../assets/files/niveles-educacion';
import { Nacionalidades } from './../../../assets/files/nacionalidades';
import { LugaresAtencion } from './../../../assets/files/lugares-atencion';
import { Generos } from './../../../assets/files/generos';
import { EstadosCursoEducacion } from './../../../assets/files/estados-curso-educacion';
import { EnfermedadesCronicas } from './../../../assets/files/enfermedades-cronicas';
import { Discapacidades } from './../../../assets/files/discapacidades';
import { ControlesEnfermedadesCronicas } from './../../../assets/files/controles-enfermedades-cronicas';
import { Coberturas } from './../../../assets/files/coberturas';
import { CertificadosDiscapacidad } from './../../../assets/files/certificados-discapacidad';
import { BeneficiosSociales } from './../../../assets/files/beneficios-sociales';
import { TiposDocumento } from './../../../assets/files/tipos-documento';
import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
    selector: 'integranteEdit',
    templateUrl: 'integranteEdit.html'
})
export class IntegranteEditPage {
    encuestaId;

    started = false;
    user: any;
    showMpi = false;
    tiposDocumento = TiposDocumento;
    beneficiosSociales = BeneficiosSociales;
    certificadosDiscapacidad = CertificadosDiscapacidad;
    coberturas = Coberturas;
    controlesEnfermedadesCronicas = ControlesEnfermedadesCronicas;
    discapacidades = Discapacidades;
    enfermedadesCronicas = EnfermedadesCronicas;
    estadosCursoEducacion = EstadosCursoEducacion;
    generos = Generos;
    lugaresAtencion = LugaresAtencion;
    nacionalidades = Nacionalidades;
    nivelesEducacion = NivelesEducacion;
    relacionesJefe = RelacionesJefe;
    relacionesJefeNinguno = RelacionesJefeNinguno;
    sexos = Sexos;
    ocupaciones = Ocupaciones;

    integrante: IIntegrante;

    constructor(
        public agentesSanitariosProvider: AgentesSanitariosProvider,
        public navParams: NavParams
        ) {
        this.nuevoIntegrante();
    }

    async ionViewWillEnter() {
        if (this.navParams.get('hogarId')) {
            this.integrante.hogarId = this.navParams.get('hogarId');
        } else if (this.navParams.get('hogar')) {
            this.integrante = this.navParams.get('hogar');
        }
    }

    nuevoIntegrante() {
        this.integrante = new IIntegrante();
    }

    async guardar() {
        console.log('this.integrante.id', this.integrante.id)
        if (!this.integrante.id) {
            return this.integrante.id = (await this.agentesSanitariosProvider.insertIntegrante(this.integrante));
        } else {
            console.log('this.integrante', this.integrante)
            return await this.agentesSanitariosProvider.updateIntegrante(this.integrante);
        }
    }
}
