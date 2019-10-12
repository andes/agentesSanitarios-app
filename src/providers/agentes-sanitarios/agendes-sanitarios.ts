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


    async update(tupla: any, objectId) {
        let sql = `UPDATE encuesta SET
            id = ?,
            objectId =?
            WHERE id = ?`;
        try {
            return await this.db.executeSql(sql, [tupla.id, objectId]);
        } catch (err) {
            return (err);
        }
    }

    async insert(tupla: any, objectId) {
        let sql = `INSERT INTO encuesta(id)
            VALUES(?)`;
        let id = tupla.id ? tupla.id : moment().valueOf().toString();
        try {
            return await this.db.executeSql(sql, [id]);
        } catch (err) {
            return (err);
        }
    }

    createTableEncuesta() {
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
        try {
            return this.db.executeSql(sql, []);
        } catch (err) {
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
}
