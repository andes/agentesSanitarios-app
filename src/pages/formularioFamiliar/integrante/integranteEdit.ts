import { IntegranteListPage } from './integranteList';
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
import { NavParams, NavController } from 'ionic-angular';
import { dateDataSortValue } from 'ionic-angular/umd/util/datetime-util';

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
    datosPersona: any;

    constructor(
        public agentesSanitariosProvider: AgentesSanitariosProvider,
        public navParams: NavParams,
        public navCtrl: NavController
        ) {
        this.nuevoIntegrante();
    }

    async ionViewWillEnter() {
        if (this.navParams.get('hogarId')) {
            this.integrante.hogarId = this.navParams.get('hogarId');
            if (this.navParams.get('datosPersona')) {
                this.datosPersona = this.navParams.get('datosPersona');
                console.log(this.datosPersona);
                this.integrante.tipoDocumento = 'D.N.I.'
                this.integrante.numeroDocumento = this.datosPersona.documento;
                this.integrante.nombre = this.datosPersona.nombre;
                this.integrante.apellido = this.datosPersona.apellido;
                this.integrante.nacionalidad = 'Argentino/a';
                this.integrante.sexo = this.datosPersona.sexo;
                this.integrante.genero = this.datosPersona.sexo;
                let dateParts: any = this.datosPersona.fechaNacimiento.split('/');
                this.integrante.fechaNacimientoString = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]).toISOString();
            }
        } else if (this.navParams.get('integrante')) {
            this.integrante = this.navParams.get('integrante');
            console.log(this.integrante);
            this.integrante.fechaNacimientoString = new Date(this.integrante.fechaNacimiento).toISOString();
        }
    }

    nuevoIntegrante() {
        this.integrante = new IIntegrante();
    }

    async guardar() {
        this.integrante.fechaNacimiento = new Date(this.integrante.fechaNacimientoString.toString());
        console.log(this.integrante.fechaNacimiento);
        if (!this.integrante.id) {
            return this.integrante.id = (await this.agentesSanitariosProvider.insertIntegrante(this.integrante));
        } else {
            this.integrante.idUsuarioActualizacion = 23;
            this.integrante.fechaActualizacion = new Date();
            await this.agentesSanitariosProvider.updateIntegrante(this.integrante);
            return this.navCtrl.push(IntegranteListPage, { hogarId: this.integrante.hogarId });
        }
    }
}
