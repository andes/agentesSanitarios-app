import { AgentesSanitariosProvider } from './../../../../providers/agentes-sanitarios/agendes-sanitarios';
import { TiposDocumento } from './../../../../assets/files/tipos-documento';
import { Ocupaciones } from './../../../../assets/files/ocupaciones';
import { Sexos } from './../../../../assets/files/sexos';
import { RelacionesJefeNinguno } from './../../../../assets/files/relaciones-jefe-ninguno';
import { RelacionesJefe } from './../../../../assets/files/relaciones-jefe';
import { NivelesEducacion } from './../../../../assets/files/niveles-educacion';
import { Nacionalidades } from './../../../../assets/files/nacionalidades';
import { LugaresAtencion } from './../../../../assets/files/lugares-atencion';
import { Generos } from './../../../../assets/files/generos';
import { EstadosCursoEducacion } from './../../../../assets/files/estados-curso-educacion';
import { EnfermedadesCronicas } from './../../../../assets/files/enfermedades-cronicas';
import { Discapacidades } from './../../../../assets/files/discapacidades';
import { ControlesEnfermedadesCronicas } from './../../../../assets/files/controles-enfermedades-cronicas';
import { Coberturas } from './../../../../assets/files/coberturas';
import { CertificadosDiscapacidad } from './../../../../assets/files/certificados-discapacidad';
import { BeneficiosSociales } from './../../../../assets/files/beneficios-sociales';
import { Component } from '@angular/core';

@Component({
    selector: 'nuevo-componente-hogar',
    templateUrl: 'nuevo-componente-hogar.html'
})
export class NuevoComponenteHogarPage {
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

    componenteHogar = {
        apellido: null,
        nombre: null,
        tipoDocumento: null,
        numeroDocumento: null,
        nacionalidad: null,
        sexo: null,
        genero: null,
        vinculoJefeHogar: null,
        fechaNacimiento: null,
        ocupacion: null,
        beneficioSocial: null,
        nivelEducacional: null,
        estadoCursada: null,
        enfermedadesCronicas: null,
        asistenciaAlimentaria: false,
        embarazo: false,
        esquemaVacunacion: null,
        coberturaSalud: null,
        lugarAtencion: null,
        discapacidad: null,
        certificadoDiscapacidad: false,
        cudNumero: null,
        cudVigencia: null
    }

    guardar() {
        console.log(this.componenteHogar)
        this.agentesSanitariosProvider.insertComponenteHogar(this.componenteHogar)
    }

    constructor(
        public agentesSanitariosProvider: AgentesSanitariosProvider
        // public navCtrl: NavController,
        ) {
    }
}
