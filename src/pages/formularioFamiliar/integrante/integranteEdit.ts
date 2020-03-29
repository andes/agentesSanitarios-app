import { Storage } from '@ionic/storage';
import { EnfermedadesCronicasPage } from './enfermedadesCronicas/enfermedadCronicaEdit';
import { IntegranteListPage } from './integranteList';
import { AgentesSanitariosProvider } from './../../../providers/agentes-sanitarios/agentes-sanitarios';
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
import { Etnias } from './../../../assets/files/etnias';
import { Component, ViewChild } from '@angular/core';
import { NavParams, NavController, Navbar } from 'ionic-angular';

@Component({
    selector: 'integranteEdit',
    templateUrl: 'integranteEdit.html',
    styles: ['.button-md { box-shadow: none; }',
        'ion-select { max-width: none; }',
        '.button-md-light { color: #999999; background-color: #fff; }',
        '.button-md-primary { color: #999999; background-color: #fff; }']
})
export class IntegranteEditPage {
    @ViewChild(Navbar) navBar: Navbar;
    encuestaId;
    started = false;
    user: any;
    showMpi = false;
    tiposDocumento = TiposDocumento;
    etnias = Etnias.map(e => e.nombre);
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
    scanStatus: boolean;
    editStatus: boolean;

    constructor(
        public agentesSanitariosProvider: AgentesSanitariosProvider,
        public navParams: NavParams,
        public navCtrl: NavController,
        private storage: Storage
    ) {
        this.nuevoIntegrante();
    }

    async ionViewWillEnter() {
        if (this.navParams.get('hogarId')) {
            this.integrante.hogarId = this.navParams.get('hogarId');
            if (this.navParams.get('datosPersona')) {
                this.scanStatus = true;
                this.editStatus = false;
                this.datosPersona = this.navParams.get('datosPersona');
                this.integrante.tipoDocumento = 'D.N.I.';
                this.integrante.numeroDocumento = this.datosPersona.documento;
                this.integrante.nombre = this.datosPersona.nombre;
                this.integrante.apellido = this.datosPersona.apellido;
                this.integrante.nacionalidad = 'Argentino/a';
                this.integrante.sexo = this.datosPersona.sexo;
                this.integrante.genero = this.datosPersona.sexo;
                let dateParts: any = this.datosPersona.fechaNacimiento.split('/');
                this.integrante.fechaNacimientoString = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]).toISOString();
            } else {
                this.scanStatus = true;
                this.editStatus = true;
            }
        } else if (this.navParams.get('integrante')) {
            this.scanStatus = false;
            this.editStatus = false;
            this.integrante = this.navParams.get('integrante');
            this.integrante.fechaNacimientoString = new Date(this.integrante.fechaNacimiento).toISOString();
        } else {
            this.scanStatus = false;
            this.editStatus = true;
        }

    }

    ionViewDidLoad() {
        this.navBar.backButtonClick = async () => this.navCtrl.push(IntegranteListPage, { hogarId: await this.storage.get('hogarId') });
    }

    nuevoIntegrante() {
        this.integrante = new IIntegrante();
    }

    async onClickSiguiente() {
        let error: string = this.validarFormulario()
        if (error === '') {
            this.integrante.fechaNacimiento = new Date(this.integrante.fechaNacimientoString.toString());
            if (!this.integrante.id) {
                this.integrante.id = (await this.agentesSanitariosProvider.insertIntegrante(this.integrante));
            } else {
                this.integrante.idUsuarioActualizacion = 23;
                this.integrante.fechaActualizacion = new Date();
                await this.agentesSanitariosProvider.updateIntegrante(this.integrante);
            }
            this.navCtrl.push(EnfermedadesCronicasPage, { integrante: this.integrante, scanStatus: this.scanStatus });
        } else {
            alert(error);
        }
    }

    validarFormulario() {
        let rslt = '';
        if (!this.integrante.tipoDocumento) {
            rslt += '- Número de Parcela es obligatorio!';
        }
        if (!this.integrante.numeroDocumento) {
            rslt += '\n\n- DNI es obligatorio!';
        }
        if (!this.integrante.apellido) {
            rslt += '\n\n- Apellid es obligatorio!';
        }
        if (!this.integrante.nombre) {
            rslt += '\n\n- Nombre es obligatorio!';
        }
        if (!this.integrante.nacionalidad) {
            rslt += '\n\n- Nacionalidad es obligatorio!';
        }
        if (!this.integrante.fechaNacimientoString) {
            rslt += '\n\n- Fecha de Nacimiento es obligatorio!';
        }
        if (!this.integrante.sexo) {
            rslt += '\n\n- Sexo es obligatorio!';
        }
        if (!this.integrante.genero) {
            rslt += '\n\n- Género es obligatorio!';
        }
        return rslt;
    }

    async guardar() {
        this.integrante.fechaNacimiento = new Date(this.integrante.fechaNacimientoString.toString());
        if (!this.integrante.id) {
            return await this.agentesSanitariosProvider.insertIntegrante(this.integrante);
        } else {
            this.integrante.idUsuarioActualizacion = 23;
            this.integrante.fechaActualizacion = new Date();
            await this.agentesSanitariosProvider.updateIntegrante(this.integrante);
            return this.integrante.id;
        }
    }
}
