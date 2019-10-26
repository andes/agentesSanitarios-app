import { IHogar } from './hogar.interface';

export class IVivienda {
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
    animalesDomesticosDesparasitados: Boolean
    hogares: [IHogar]
}
