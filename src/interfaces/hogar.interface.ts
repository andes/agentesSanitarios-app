import { IIntegrante } from './integrante.interface';

export class IHogar {
    id: Number;
    viviendaId: Number;
    muerteNinoMenor5: Boolean;
    muerteNinoMenor5Causa: String;
    menor5ConEnfermedadGrave: Boolean;
    integrantes: [IIntegrante];
}
