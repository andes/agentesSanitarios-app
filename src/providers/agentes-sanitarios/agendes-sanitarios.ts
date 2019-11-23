import { SelectIntegrantesByHogarQuery, UpdateIntegranteQuery, InsertIntegranteQuery, CreateIntegranteQuery } from './queries/integrante.queries';
import { CreateParcelaQuery, InsertParcelaQuery, UpdateParcelaQuery, SelectParcelaQuery, SelectParcelaByDniQuery } from './queries/parcela.queries';
import { IIntegrante } from './../../interfaces/integrante.interface';
import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { NetworkProvider } from '../network';
import { IParcela } from './../../interfaces/parcela.interface';
import { IHogar } from './../../interfaces/hogar.interface';
import { IVivienda } from './../../interfaces/vivienda.interface';
import { IIntegranteEnfermedadCronica } from './../../interfaces/integranteEnfermedadCronica.interface';
import { UpdateViviendaQuery, SelectViviendaByParcelaQuery, CreateViviendaQuery, InsertViviendaQuery, SelectViviendaQuery } from './queries/vivienda.queries';
import { CreateHogarQuery, InsertHogarQuery, UpdateHogarQuery, SelectHogarQuery, SelectHogarByViviendaQuery } from './queries/hogar.queries';

@Injectable()
export class AgentesSanitariosProvider {
    // private baseUrl = 'modules/mobileApp/encuestas';

    db: SQLiteObject = null;

    constructor(public network: NetworkProvider) { }

    setDatabase(db: SQLiteObject) {
        if (this.db === null) {
            this.db = db;
        }
    }

    async dropTables() {
        try {
            await this.db.executeSql('DROP TABLE IF EXISTS parcela', []);
            await this.db.executeSql('DROP TABLE IF EXISTS vivienda', []);
            await this.db.executeSql('DROP TABLE IF EXISTS hogar', []);
            await this.db.executeSql('DROP TABLE IF EXISTS integrante', []);
        } catch (e) {
            return e;
        }

    }

    async createTables() {
        await this.createTableParcelas();
        await this.createTableViviendas();
        await this.createTableHogares();
        await this.createTableIntegrantes();
        await this.createTableIntegrantesEnfermedadesCronicas();
    }

    // ***********************PARCELA
    createTableParcelas() {
        try {
            return this.db.executeSql(CreateParcelaQuery, []);
        } catch (err) {
            console.log('Error!', err)
            return (err);
        }
    }

    async insertParcela(parcela: IParcela) {
        try {
            return (await this.db.executeSql(InsertParcelaQuery, [
                parcela.idUsuarioCreacion,
                parcela.idUsuarioActualizacion,
                parcela.fechaCreacion,
                parcela.fechaActualizacion,
                parcela.nroParcela,
                parcela.provincia,
                parcela.municipio,
                parcela.localidad,
                parcela.barrio,
                parcela.direccion,
                parcela.tipoZona
            ])).insertId;
        } catch (err) {
            return err;
        }
    }

    updateParcela(parcela: IParcela) {
        try {
            return this.db.executeSql(UpdateParcelaQuery, [
                parcela.idUsuarioCreacion,
                parcela.idUsuarioActualizacion,
                parcela.fechaCreacion,
                parcela.fechaActualizacion,
                parcela.nroParcela,
                parcela.provincia,
                parcela.municipio,
                parcela.localidad,
                parcela.barrio,
                parcela.direccion,
                parcela.tipoZona,
                parcela.id
            ]);
        } catch (err) {
            return err;
        }
    }

    async getParcelaByDni(numeroDocumento) {
        try {
            return (await this.db.executeSql(`${SelectParcelaByDniQuery}${numeroDocumento}`, [])).rows.item(0);
        } catch (err) {
            return err;
        }
    }
    async getParcelaById(id) {
        console.log('getParcelaById xxx', id);
        try {
            return (await this.db.executeSql(`${SelectParcelaQuery}${id}`, [])).rows.item(0);
        } catch (err) {
            return err;
        }
    }
    // ***********************VIVIENDA
    createTableViviendas() {
        console.log('createTableViviendas')
        try {
            return this.db.executeSql(CreateViviendaQuery, []);
        } catch (err) {
            console.log('err', err)
            return (err);
        }
    }

    async insertVivienda(vivienda: IVivienda) {
        try {
            return (await this.db.executeSql(InsertViviendaQuery, [
                vivienda.parcelaId,
                vivienda.idUsuarioCreacion,
                vivienda.idUsuarioActualizacion,
                vivienda.fechaCreacion,
                vivienda.fechaActualizacion,
                vivienda.materialPiso,
                vivienda.materialPared,
                vivienda.materialTecho,
                vivienda.cantidadHabitacionesSinServicio,
                vivienda.tipoCasa,
                vivienda.fuenteAgua,
                vivienda.tipoBano,
                vivienda.tieneInstalacionesElectricas,
                vivienda.tieneTratamientoBasura,
                vivienda.tieneAnimalesConsumo,
                vivienda.animalesConsumoVacunados,
                vivienda.animalesConsumoDesparasitados,
                vivienda.tieneAnimalesDomesticos,
                vivienda.animalesDomesticosVacunados,
                vivienda.animalesDomesticosDesparasitados,
                vivienda.internet,
                vivienda.tvCable,
                vivienda.dtv,
                vivienda.automovil,
                vivienda.moto,
                vivienda.lineaTelefono,
                vivienda.celularSinInternet,
                vivienda.celularConInternet,
                vivienda.otrosDatos
            ])).insertId;
        } catch (err) {
            return err;
        }
    }

    updateVivienda(vivienda: IVivienda) {
        console.log('updateVivienda', vivienda)
        try {
            return this.db.executeSql(UpdateViviendaQuery, [
                vivienda.parcelaId,
                vivienda.idUsuarioCreacion,
                vivienda.idUsuarioActualizacion,
                vivienda.fechaCreacion,
                vivienda.fechaActualizacion,
                vivienda.materialPiso,
                vivienda.materialPared,
                vivienda.materialTecho,
                vivienda.cantidadHabitacionesSinServicio,
                vivienda.tipoCasa,
                vivienda.fuenteAgua,
                vivienda.tipoBano,
                vivienda.tieneInstalacionesElectricas,
                vivienda.tieneTratamientoBasura,
                vivienda.tieneAnimalesConsumo,
                vivienda.animalesConsumoVacunados,
                vivienda.animalesConsumoDesparasitados,
                vivienda.tieneAnimalesDomesticos,
                vivienda.animalesDomesticosVacunados,
                vivienda.animalesDomesticosDesparasitados,
                vivienda.internet,
                vivienda.tvCable,
                vivienda.dtv,
                vivienda.automovil,
                vivienda.moto,
                vivienda.lineaTelefono,
                vivienda.celularSinInternet,
                vivienda.celularConInternet,
                vivienda.otrosDatos,
                vivienda.id
            ]);
        } catch (err) {
            console.log('err', err);
            return err;
        }
    }

    async getViviendasByparcelaId(parcelaId) {
        try {
            let viviendas = []
            let rows = (await this.db.executeSql(`${SelectViviendaByParcelaQuery}${parcelaId}`, []) as any).rows;
            for (let i = 0; i < rows.length; i++) {
                viviendas.push(rows.item(i) as IParcela);
            }
            return viviendas;
        } catch (err) {
            console.log('error', err);
            return err;
        }
    }

    async getViviendaById(id) {
        try {
            return (await this.db.executeSql(`${SelectViviendaQuery}${id}`, [])).rows.item(0);
        } catch (err) {
            console.log('error', err);
            return err;
        }
    }
    // ***********************HOGAR
    createTableHogares() {
        try {
            let sql = CreateHogarQuery;
            return this.db.executeSql(sql, []);
        } catch (err) {
            console.log('error', err);
            return (err);
        }
    }

    async insertHogar(hogar: IHogar) {
        try {
            return (await this.db.executeSql(InsertHogarQuery, [
                hogar.viviendaId,
                hogar.idUsuarioCreacion,
                hogar.idUsuarioActualizacion,
                hogar.fechaCreacion,
                hogar.fechaActualizacion,
                hogar.fechaVisita1,
                hogar.fechaVisita2,
                hogar.fechaVisita3,
                hogar.muerteNinoMenor5,
                hogar.muerteNinoMenor5Causa,
                hogar.muerteNinoMenor5CausaOtro,
                hogar.menor5ConEnfermedadGrave
            ])).insertId;
        } catch (err) {
            console.log('insert hogar', err);
            return (err);
        }
    }

    updateHogar(hogar: IHogar) {
        try {
            return this.db.executeSql(UpdateHogarQuery, [
                hogar.viviendaId,
                hogar.idUsuarioCreacion,
                hogar.idUsuarioActualizacion,
                hogar.fechaCreacion,
                hogar.fechaActualizacion,
                hogar.fechaVisita1,
                hogar.fechaVisita2,
                hogar.fechaVisita3,
                hogar.muerteNinoMenor5,
                hogar.muerteNinoMenor5Causa,
                hogar.muerteNinoMenor5CausaOtro,
                hogar.menor5ConEnfermedadGrave,
                hogar.id
            ]);
        } catch (err) {
            return (err);
        }
    }

    async getHogaresByViviendaId(viviendaId) {
        try {
            let sql = `${SelectHogarByViviendaQuery}${viviendaId}`;
            let hogares = []
            let rows = (await this.db.executeSql(sql, []) as any).rows;
            for (let i = 0; i < rows.length; i++) {
                hogares.push(rows.item(i) as IHogar);
            }
            return hogares;
        } catch (err) {
            return err;
        }
    }

    async getHogarById(id) {
        try {
            let sql = `${SelectHogarQuery}${id}`;
            return (await this.db.executeSql(sql, [])).rows.item(0);
        } catch (err) {
            return err;
        }
    }
    // ***********************INTEGRANTE
    createTableIntegrantes() {
        console.log('createTableIntegrantes')
        try {
            return this.db.executeSql(CreateIntegranteQuery, []);
        } catch (err) {
            return (err);
        }
    }

    async insertIntegrante(integrante: IIntegrante) {
        try {
            return (await this.db.executeSql(InsertIntegranteQuery, [
                integrante.hogarId,
                integrante.idUsuarioCreacion,
                integrante.idUsuarioActualizacion,
                integrante.fechaCreacion,
                integrante.fechaActualizacion,
                integrante.esJefeHogar,
                integrante.apellido,
                integrante.nombre,
                integrante.tipoDocumento,
                integrante.numeroDocumento,
                integrante.nacionalidad,
                integrante.sexo,
                integrante.genero,
                integrante.vinculoConJefeHogar,
                integrante.fechaNacimiento,
                integrante.ocupacion,
                integrante.beneficioSocial,
                integrante.nivelEducativo,
                integrante.nivelEducativoEstado,
                integrante.asistenciaAlimentaria,
                integrante.embarazada,
                integrante.embarzadaEstado,
                integrante.antitetanica,
                integrante.esquemaVacunacion,
                integrante.coberturaSalud,
                integrante.lugarAtencion,
                integrante.discapacidad,
                integrante.certificadoDiscapacidad,
                integrante.cudNumero,
                integrante.cudVigencia
            ])).insertId;
        } catch (err) {
            console.log('err', err);
            return (err);
        }
    }

    updateIntegrante(integrante: IIntegrante) {
        try {
            return this.db.executeSql(UpdateIntegranteQuery, [
                integrante.hogarId,
                integrante.idUsuarioCreacion,
                integrante.idUsuarioActualizacion,
                integrante.fechaCreacion,
                integrante.fechaActualizacion,
                integrante.esJefeHogar,
                integrante.apellido,
                integrante.nombre,
                integrante.tipoDocumento,
                integrante.numeroDocumento,
                integrante.nacionalidad,
                integrante.sexo,
                integrante.genero,
                integrante.etnia,
                integrante.vinculoConJefeHogar,
                integrante.fechaNacimiento,
                integrante.ocupacion,
                integrante.beneficioSocial,
                integrante.nivelEducativo,
                integrante.nivelEducativoEstado,
                integrante.asistenciaAlimentaria,
                integrante.embarazada,
                integrante.embarzadaEstado,
                integrante.antitetanica,
                integrante.esquemaVacunacion,
                integrante.coberturaSalud,
                integrante.lugarAtencion,
                integrante.lugarAtencionOtro,
                integrante.discapacidad,
                integrante.certificadoDiscapacidad,
                integrante.cudNumero,
                integrante.cudVigencia,
                integrante.id
            ]);
        } catch (err) {
            console.log(err)
            return (err);
        }
    }

    async getIntegrantesByHogarId(hogarId) {
        try {
            let sql = `${SelectIntegrantesByHogarQuery}${hogarId}`;
            let integrantes = []
            let rows = (await this.db.executeSql(sql, []) as any).rows;
            for (let i = 0; i < rows.length; i++) {
                integrantes.push(rows.item(i) as IIntegrante);
            }
            return integrantes;
        } catch (err) {
            return err;
        }
    }

    async getJefeDeHogarByHogarId(hogarId) {
        try {
            let sql = `SELECT * FROM integrante
                 WHERE hogarId = ${hogarId} and esJefeHogar = 'true'`;
            let integrantes = []
            let rows = (await this.db.executeSql(sql, []) as any).rows;
            for (let i = 0; i < rows.length; i++) {
                integrantes.push(rows.item(i) as IIntegrante);
            }
            return integrantes;
        } catch (err) {
            return err;
        }
    }

    async getIntegranteById(id) {
        console.log('getIntegranteById xxx', id);
        try {
            let sql = `SELECT i.* FROM integrante i
                WHERE i.id = '${id}'`;
            return (await this.db.executeSql(sql, [])).rows.item(0);
        } catch (err) {
            return err;
        }
    }
    // ***********************INTEGRANTES/ENFERMEDAD CRONICA
    createTableIntegrantesEnfermedadesCronicas() {
        console.log('createTableIntegrantesEnfermedadesCronicas')
        try {
            let sql = `CREATE TABLE IF NOT EXISTS integranteEnfermedadCronica(
                id INTEGER NOT NULL PRIMARY KEY,
                idUsuarioCreacion INTEGER,
                idUsuarioActualizacion  INTEGER,
                fechaCreacion DATETIME,
                fechaActualizacion DATETIME,
                integranteId INTEGER,
                enfermedadCronica VARCHAR(100),
                enfermedadCronicaEstado VARCHAR(100)
                )`;
            return this.db.executeSql(sql, []);
        } catch (err) {
            return (err);
        }
    }

    async insertIntegranteEnfermedadesCronicas(integranteEnfermedadCronica: IIntegranteEnfermedadCronica) {
        console.log('insertIntegranteEnfermedadCronica');
        let sql = `INSERT INTO integranteEnfermedadCronica(
                idUsuarioCreacion,
                idUsuarioActualizacion,
                fechaCreacion,
                fechaActualizacion,
                integranteId,
                enfermedadCronica,
                enfermedadCronicaEstado
            )
            VALUES(?,?,?,?,?,?,?)`;

        try {
            return (await this.db.executeSql(sql, [
                integranteEnfermedadCronica.idUsuarioCreacion,
                integranteEnfermedadCronica.idUsuarioActualizacion,
                integranteEnfermedadCronica.fechaCreacion,
                integranteEnfermedadCronica.fechaActualizacion,
                integranteEnfermedadCronica.integranteId,
                integranteEnfermedadCronica.enfermedadCronica,
                integranteEnfermedadCronica.enfermedadCronicaEstado
            ])).insertId;
        } catch (err) {
            console.log('err', err);
            return (err);
        }
    }

    updateIntegranteEnfermedadCronica(integranteEnfermedadCronica: IIntegranteEnfermedadCronica) {
        console.log('updateintegranteEnfermedadCronica');
        let sql = `UPDATE integranteEnfermedadCronica SET
                idUsuarioCreacion=?,
                idUsuarioActualizacion=?,
                fechaCreacion=?,
                fechaActualizacion=?,
                integranteId=?,
                enfermedadCronica=?,
                enfermedadCronicaEstado=?
            WHERE id = ?`;

        try {
            return this.db.executeSql(sql, [
                integranteEnfermedadCronica.idUsuarioCreacion,
                integranteEnfermedadCronica.idUsuarioActualizacion,
                integranteEnfermedadCronica.fechaCreacion,
                integranteEnfermedadCronica.fechaActualizacion,
                integranteEnfermedadCronica.integranteId,
                integranteEnfermedadCronica.enfermedadCronica,
                integranteEnfermedadCronica.enfermedadCronicaEstado,
                integranteEnfermedadCronica.id
            ]);
        } catch (err) {
            return (err);
        }
    }

    async getIntegranteEnfermedadesCronicasByIntegranteId(integranteId) {
        console.log('getIntegranteEnfermedadesCronicasByIntegranteId xxx', integranteId);
        try {
            let sql = `SELECT * FROM integranteEnfermedadCronica
                WHERE integranteId = ${integranteId}`;
            let integranteEnfermedadesCronicas = []
            let rows = (await this.db.executeSql(sql, []) as any).rows;
            for (let i = 0; i < rows.length; i++) {
                integranteEnfermedadesCronicas.push(rows.item(i) as IIntegranteEnfermedadCronica);
            }
            return integranteEnfermedadesCronicas;
        } catch (err) {
            return err;
        }
    }

    async getIntegranteEnfermedadesCronicasById(id) {
        console.log('getIntegranteEnfermedadesCronicasById xxx', id);
        try {
            let sql = `SELECT e.* FROM integranteEnfermedadCronica e
                WHERE e.id = '${id}'`;
            return (await this.db.executeSql(sql, [])).rows.item(0);
        } catch (err) {
            return err;
        }
    }

    // ***********************USUARIOS
    createTableUsuarios() {
        try {
            let sql = `CREATE TABLE IF NOT EXISTS usuarios(
                id INTEGER NOT NULL PRIMARY KEY,
                nombre VARCHAR(100)
                )`;
            return this.db.executeSql(sql, []);
        } catch (err) {
            return (err);
        }
    }

    async testQueries() {
        try {

            let parcelaId = await this.insertParcela(new IParcela());
            console.log('testInserts parcela', parcelaId);
            let vivienda = new IVivienda();
            vivienda.parcelaId = parcelaId;
            let viviendaId = await this.insertVivienda(vivienda);
            console.log('testInserts vivi', viviendaId);
            let hogar = new IHogar();
            hogar.viviendaId = viviendaId;
            let hogarId = await this.insertHogar(hogar);
            console.log('testInserts hogar', hogarId);
            let i = new IIntegrante();
            i.hogarId = hogarId;
            i.numeroDocumento = '123456789'
            let integranteId = await this.insertIntegrante(i);
            console.log('testInserts Integrante', integranteId);
            let parcela: IParcela = await this.getParcelaByDni('123456789');
            console.log('parcela', parcela);
            parcela.viviendas = (await this.getViviendasByparcelaId(parcela.id) as [IVivienda]);
            console.log('parcela.viviendas', parcela.viviendas);
            parcela.viviendas.forEach(async v => {
                v.hogares = await this.getHogaresByViviendaId(v.id);
                console.log('v.hogares', v.hogares);
                v.hogares.forEach(async h => {
                    // h.integrantes = await this.getIntegrantesByHogarId(h.id);
                    // console.log('h.integrantes', h.integrantes);
                });
            })
            console.log('await this.updateParcela(parcela)', await this.updateParcela(parcela));
            parcela.viviendas.forEach( async (v: IVivienda) => {
                console.log('await this.updateVivienda(v)', await this.updateVivienda(v));
                v.hogares.forEach( async (h: IHogar) => {
                    console.log('await this.updateHogar(h)', h.id, await this.updateHogar(h));
                    // h.integrantes.forEach(async (i: IIntegrante) => {
                    //     console.log('await this.updateIntegrante(i)', await this.updateIntegrante(i));
                    // })
                })
            })
            console.log('OK', parcela);
        } catch (e) {
            console.log('TEST FAILED!', e)
        }
    }

    obtenerParcelas() {
        let sql = 'SELECT * FROM parcela';
        return this.db.executeSql(sql, [])
            .then(response => {
                let datos = [];
                for (let index = 0; index < response.rows.length; index++) {
                    datos.push(response.rows.item(index));
                }
                console.log(datos);
                return Promise.resolve(datos);
            })
            .catch(error => error);
    }
}
