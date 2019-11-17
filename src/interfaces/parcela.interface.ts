import { IVivienda } from './vivienda.interface';

export class IParcela {
    id: Number;
    idUsuarioCreacion: Number;
    idUsuarioActualizacion: Number;
    fechaCreacion: Date;
    fechaActualizacion: Date;
    equipoNucleoReferencia: String;
    nroFormulario: Number;
    nroPlanilla: Number;
    nroParcela: Number;
    nroVivienda: Number;
    nroHogar: Number;
    nombreEncuestador: String;
    apellidoEncuestador: String;
    provincia: String;
    municipio: String;
    localidad: String;
    barrio: String;
    direccion: String;
    tipoZona: String;
    viviendas: [IVivienda]
}
