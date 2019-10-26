import { IVivienda } from './vivienda.interface';

export class IParcela {
    equipoNucleoReferencia: String;
    nroFormulario: Number;
    nroPlanilla: Number;
    nroParcela: Number;
    nroVivienda: Number;
    nroHogar: Number;
    nombreEncuestador: String;
    apellidoEncuestador: String;
    fechaVisita: Date;
    fechaVisita1: Date;
    fechaVisita2: Date;
    provincia: String;
    municipio: String;
    localidad: String;
    barrio: String;
    direccion: String;
    tipoZona: String;
    viviendas: [IVivienda]
}
