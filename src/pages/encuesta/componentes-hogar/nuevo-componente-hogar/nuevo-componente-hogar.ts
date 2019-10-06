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

    constructor(
        // public navCtrl: NavController,
        ) {
    }
    // ionViewWillEnter() {
    //     this.menuCtrl.enable(true);
    // }

    // ionViewDidLoad() {
    //     setTimeout(() => {
    //         this.started = true;
    //     }, 50);
    // }

    // isLogin() {
    //     return this.authService.user != null;
    // }

    // nuevaEncuesta() {
    //     if (this.isLogin()) {
    //         this.navCtrl.push(Encuesta1Page);
    //     }
    // }

    // isProfesional() {
    //     return this.authService.user && this.authService.user.profesionalId != null;
    // }

    // login() {
    //     if (!this.isLogin()) {
    //         this.navCtrl.push(LoginPage);
    //     } else {
    //         //   this.reporter.report();
    //     }
    // }



}
