import { SimpleChange } from "@angular/core";

export class IComponenteHogar {
    componenteHogar = {
        apellido: String,
        nombre: String,
        tipoDocumento: String,
        numeroDocumento: String,
        nacionalidad: String,
        sexo: String,
        genero: String,
        vinculoJefeHogar: String,
        fechaNacimiento: Date,
        ocupacion: String,
        beneficioSocial: String,
        nivelEducacional: String,
        estadoCursada: String,
        enfermedadesCronicas: String,
        asistenciaAlimentaria: Boolean,
        embarazo: Boolean,
        esquemaVacunacion: Boolean,
        coberturaSalud: String,
        lugarAtencion: String,
        discapacidad: String,
        certificadoDiscapacidad: Boolean,
        cudNumero: String,
        cudVigencia: Date
    }
}
