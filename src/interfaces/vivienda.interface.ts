import { IHogar } from './hogar.interface';

export class IVivienda {
    id: Number;
    parcelaId: Number;
    direccion: String;
    etnia: String;
    materialPiso: String;
    materialPared: String;
    materialTecho: String;
    cantidadHabitacionesSinServicio: String;
    tieneInstalacionesElectricas: Boolean;
    tieneTratamientoBasura: Boolean;
    tipoCasa: String;
    fuenteAgua: String;
    tipoBano: String;
    tieneAnimalesConsumo: Boolean;
    animalesConsumoVacunados: Boolean;
    animalesConsumoDesparasitados: Boolean;
    tieneAnimalesDomesticos: Boolean;
    animalesDomesticosVacunados: Boolean;
    animalesDomesticosDesparasitados: Boolean;
    internet: Boolean;
    tvCable: Boolean;
    dtv: Boolean;
    automovil: Boolean;
    moto: Boolean;
    lineaTelefono: Boolean;
    celularSinInternet: Boolean;
    celularConInternet: Boolean;
    otrosDatos: Boolean;
    hogares: [IHogar]
}
