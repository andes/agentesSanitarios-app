import { IIntegrante } from './integrante.interface';

export class IHogar {
    id: Number
    muerteNinoMenor5: Boolean;
    muerteNinoMenor5Causa: Boolean;
    menor5ConEnfermedadGrave: Boolean;
    integrantes: [IIntegrante];
}
