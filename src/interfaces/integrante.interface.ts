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
    ocupacion: String;
    beneficioSocial: String;
    vinculoConJefeHogarIncompletoEstado: String;
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
    discapacidad: String;
    certificadoDiscapacidad: Boolean;
    cudNumero: String;
    cudVigencia: Date;
}
