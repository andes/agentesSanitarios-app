export class IIntegrante {
    id: Number;
    hogarId: Number;
    idUsuarioCreacion: Number;
    idUsuarioActualizacion: Number;
    fechaCreacion: Date;
    fechaActualizacion: Date;
    apellido: String;
    nombre: String;
    tipoDocumento: String;
    numeroDocumento: String;
    esJefeHogar: Boolean;
    nacionalidad: String;
    sexo: String;
    genero: String;
    etnia: String;
    vinculoConJefeHogar: String;
    fechaNacimiento: Date;
    fechaNacimientoString: String;
    ocupacion: String;
    beneficioSocial: String;
    nivelEducativo: String;
    nivelEducativoEstado: String;
    estadoCursada: String;
    enfermedadesCronicas: String;
    asistenciaAlimentaria: Boolean;
    embarazada: Boolean;
    embarzadaEstado: String;
    antitetanica: Boolean;
    esquemaVacunacion: Boolean;
    coberturaSalud: String;
    lugarAtencion: String;
    lugarAtencionOtro: String;
    discapacidad: String;
    certificadoDiscapacidad: Boolean;
    cudNumero: String;
    cudVigencia: Date;
}
