import { IIntegrante } from './integrante.interface';

export class IHogar {
    id: Number;
    viviendaId: Number;
    idUsuarioCreacion: Number;
    idUsuarioActualizacion: Number;
    fechaCreacion: Date;
    fechaActualizacion: Date;
    fechaVisita1: Date;
    fechaVisita2: Date;
    fechaVisita3: Date;
    muerteNinoMenor5: Boolean;
    muerteNinoMenor5Causa: String;
    muerteNinoMenor5CausaOtro: String;
    menor5ConEnfermedadGrave: Boolean;
}
