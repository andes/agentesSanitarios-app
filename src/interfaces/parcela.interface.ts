import { IVivienda } from './vivienda.interface';

export class IParcela {
    id: Number;
    idUsuarioCreacion: Number;
    idUsuarioActualizacion: Number;
    fechaCreacion: Date;
    fechaActualizacion: Date;
    nroParcela: Number;
    provincia: String;
    municipio: String;
    localidad: String;
    barrio: String;
    direccion: String;
    tipoZona: String;
    viviendas: [IVivienda]
}
