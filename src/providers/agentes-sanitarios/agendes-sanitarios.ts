import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import * as moment from 'moment';
import { NetworkProvider } from '../network';

@Injectable()
export class AgentesSanitariosProvider {
    private baseUrl = 'modules/mobileApp/encuestas';

    db: SQLiteObject = null;

    constructor(public network: NetworkProvider) { }


    setDatabase(db: SQLiteObject) {
        if (this.db === null) {
            this.db = db;
        }
    }


    async createTables() {
        await this.createTableEncuesta();
        await this.createTableComponenteHogar();
    }

    createTableEncuesta() {
        try {
            let sql = `CREATE TABLE IF NOT EXISTS encuesta(
                HEADER_nroFormulario INTEGER,
                HEADER_nroPlanilla INTEGER,
                HEADER_nroParcela INTEGER,
                HEADER_nroVivienda INTEGER,
                HEADER_nroHogar INTEGER,
                HEADER_fechaVisita DATETIME,
                HEADER_fechaVisita2 DATETIME,
                HEADER_fechaVisita3 DATETIME,
                HEADER_nombreEncuestador VARCHAR(100),
                HEADER_apellidoEncuestador VARCHAR(100),
                HEADER_provincia VARCHAR(100),
                HEADER_municipio VARCHAR(100),
                HEADER_localidad VARCHAR(100),
                HEADER_barrio VARCHAR(100),
                HEADER_direccion VARCHAR(200),
                HEADER_tipoZona VARCHAR(50),
                HEADER_etnia VARCHAR(100),

                COND_SOC_materialPiso VARCHAR(20),
                COND_SOC_materialPared VARCHAR(20),
                COND_SOC_materialTecho VARCHAR(20),
                COND_SOC_cantidadHabitacionesSinServicio INTEGER,
                COND_SOC_tieneInstalacionElectrica BOOLEAN,
                COND_SOC_tieneTratamiendoBasura BOOLEAN,
                COND_SOC_tipoCasa VARCHAR(20),
                COND_SOC_fuenteAgua VARCHAR(20),
                COND_SOC_tipoBaño VARCHAR(20),
                COND_SOC_tieneAnimalesConsumo BOOLEAN,
                COND_SOC_animalesConsumoVacunados BOOLEAN,
                COND_SOC_animalesConsumoDesparasitados BOOLEAN,
                COND_SOC_tieneAnimalesDomesticos BOOLEAN,
                COND_SOC_animalesDomesticosVacunados BOOLEAN,
                COND_SOC_animalesDomesticosDesparasitados BOOLEAN)`;
            return this.db.executeSql(sql, []);
        } catch (err) {
            return (err);
        }
    }

    createTableComponenteHogar() {
        try {
            let sql = `CREATE TABLE IF NOT EXISTS componenteHogar(
                apellido VARCHAR(50),
                nombre VARCHAR(50),
                tipo_documento VARCHAR(10),
                numero_documento VARCHAR(10),
                nacionalidad  VARCHAR(20),
                sexo VARCHAR(10),
                genero VARCHAR(10),
                vinculo_jefe VARCHAR(20),
                fecha_nacimiento DATETIME,
                ocupacion VARCHAR(20),
                beneficio_social VARCHAR(20),
                nivel_educacional VARCHAR(20),
                estado_cursada VARCHAR(10),
                enfermedades_cronicas VARCHAR(20),
                asistencia_alimentaria VARCHAR(20),
                enquema_vacunacion BOOLEAN,
                cobertura_salud  VARCHAR(20),
                lugar_atencion VARCHAR(20),
                discapacidad VARCHAR(20)
            )`;
            return this.db.executeSql(sql, []);
        } catch (err) {
            console.log('create componenteHogar', err)
            return (err);
        }
    }

    async insertEncuesta(encuesta) {
        try {
        let sql = `INSERT INTO encuesta(
            HEADER_nroFormulario,
            HEADER_nroPlanilla,
            HEADER_nroParcela,
            HEADER_nroVivienda,
            HEADER_nroHogar,
            HEADER_fechaVisita,
            HEADER_fechaVisita2,
            HEADER_fechaVisita3,
            HEADER_nombreEncuestador,
            HEADER_apellidoEncuestador,
            HEADER_provincia,
            HEADER_municipio,
            HEADER_localidad,
            HEADER_barrio,
            HEADER_direccion,
            HEADER_tipoZona,
            HEADER_etnia,
            COND_SOC_materialPiso,
            COND_SOC_materialPared,
            COND_SOC_materialTecho,
            COND_SOC_cantidadHabitacionesSinServicio,
            COND_SOC_tieneInstalacionElectrica,
            COND_SOC_tieneTratamiendoBasura,
            COND_SOC_tipoCasa,
            COND_SOC_fuenteAgua,
            COND_SOC_tipoBaño,
            COND_SOC_tieneAnimalesConsumo,
            COND_SOC_animalesConsumoVacunados,
            COND_SOC_animalesConsumoDesparasitados,
            COND_SOC_tieneAnimalesDomesticos,
            COND_SOC_animalesDomesticosVacunados,
            COND_SOC_animalesDomesticosDesparasitados)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            return await this.db.executeSql(sql, [
                encuesta.nroFormulario,
                encuesta.nroPlantilla,
                encuesta.nroParcela,
                encuesta.nroVivienda,
                encuesta.nroHogar,
                encuesta.fechaVisita,
                encuesta.fechaVisita1,
                encuesta.fechaVisita2,
                encuesta.nombreEncuestador,
                encuesta.apellidoEncuestador,
                encuesta.provicia,
                encuesta.municipio,
                encuesta.localidad,
                encuesta.barrio,
                encuesta.direccion,
                encuesta.tipoZona,
                encuesta.etnia,
                encuesta.materialPiso,
                encuesta.materialPared,
                encuesta.materialTecho,
                encuesta.cantidadHabitacionesSinServicio,
                encuesta.tieneInstalacionesElectricas,
                encuesta.tieneTratamientoBasura,
                encuesta.tipoCasa,
                encuesta.fuenteAgua,
                encuesta.tipoBano,
                encuesta.tieneAnimalesConsumo,
                encuesta.animalesConsumoVacunados,
                encuesta.animalesConsumoDesparasitados,
                encuesta.tieneAnimalesDomestico,
                encuesta.animalesDomesticosVacunados,
                encuesta.animalesDomesticosDesparasitados
            ]);
        } catch (err) {
            return err;
        }
    }

    async insertComponenteHogar(componenteHogar) {
        let sql = `INSERT INTO componenteHogar(
        apellido,
        nombre,
        tipo_documento,
        numero_documento,
        nacionalidad,
        sexo,
        genero,
        vinculo_jefe,
        fecha_nacimiento,
        ocupacion,
        beneficio_social,
        nivel_educacional,
        estado_cursada,
        enfermedades_cronicas,
        asistencia_alimentaria,
        enquema_vacunacion,
        cobertura_salud,
        lugar_atencion,
        discapacidad)
            VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        try {
            return await this.db.executeSql(sql, [
                componenteHogar.apellido,
                componenteHogar.nombre,
                componenteHogar.tipoDocumento,
                componenteHogar.numeroDocumento,
                componenteHogar.nacionalidad,
                componenteHogar.sexo,
                componenteHogar.genero,
                componenteHogar.vinculoJefeHogar,
                componenteHogar.fechaNacimiento,
                componenteHogar.ocupacion,
                componenteHogar.beneficioSocial,
                componenteHogar.nivelEducacional,
                componenteHogar.estadoCursada,
                componenteHogar.enfermedadesCronicas,
                componenteHogar.asistenciaAlimentaria,
                // componenteHogar.embarazo,
                componenteHogar.esquemaVacunacion,
                componenteHogar.coberturaSalud,
                componenteHogar.lugarAtencion,
                componenteHogar.discapacidad,
                // componenteHogar.certificadoDiscapacidad,
                // componenteHogar.cudNumero,
                // componenteHogar.cudVigencia
            ]);
        } catch (err) {
            console.log(err)
            return (err);
        }
    }

    obtenerEncuestas() {
        let sql = 'SELECT * FROM encuesta';
        return this.db.executeSql(sql, [])
            .then(response => {
                let datos = [];
                for (let index = 0; index < response.rows.length; index++) {
                    datos.push(response.rows.item(index));
                }
                return Promise.resolve(datos);
            })
            .catch(error => error);
    }

    obtenerComponentesHogar(idEncuesta) {
        let sql = 'SELECT * FROM componenteHogar';
        return this.db.executeSql(sql, [])
            .then(response => {
                let datos = [];
                for (let index = 0; index < response.rows.length; index++) {
                    datos.push(response.rows.item(index));
                }
                console.log(datos)
                return Promise.resolve(datos);
            })
            .catch(error => error);
    }
}
