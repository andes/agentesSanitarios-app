import { IIntegrante } from '../../interfaces/integrante.interface';
import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { NetworkProvider } from '../network';
import { IParcela } from '../../interfaces/parcela.interface';
import { IHogar } from '../../interfaces/hogar.interface';
import { IVivienda } from '../../interfaces/vivienda.interface';
import { IIntegranteEnfermedadCronica } from '../../interfaces/integranteEnfermedadCronica.interface';

@Injectable()
export class AgentesSanitariosProvider {
    private baseUrl = 'modules/rondasSanitariasApp/reporteSociosanitario/';

    db: SQLiteObject = null;

    constructor(public network: NetworkProvider) { }

    setDatabase(db: SQLiteObject) {
        if (!this.db) {
            this.db = db;
        }
    }

    async dropTables() {
        try {
            await this.db.executeSql('DROP TABLE IF EXISTS parcela', []);
            await this.db.executeSql('DROP TABLE IF EXISTS vivienda', []);
            await this.db.executeSql('DROP TABLE IF EXISTS hogar', []);
            await this.db.executeSql('DROP TABLE IF EXISTS integrante', []);
            await this.db.executeSql('DROP TABLE IF EXISTS integranteEnfermedadCronica', []);
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
            let sql = `CREATE TABLE IF NOT EXISTS parcela(
                id INTEGER NOT NULL PRIMARY KEY,
                idUsuarioCreacion INTEGER,
                idUsuarioActualizacion INTEGER,
                fechaCreacion DATETIME,
                fechaActualizacion DATETIME,
                nroParcela INTEGER,
                provincia VARCHAR(100),
                municipio VARCHAR(100),
                localidad VARCHAR(100),
                barrio VARCHAR(100),
                direccion VARCHAR(100),
                tipoZona VARCHAR(100)
                )`;
            return this.db.executeSql(sql, []);
        } catch (err) {
            return (err);
        }
    }

    async insertParcela(parcela: IParcela) {
        try {
            let sql = `INSERT INTO parcela(
                idUsuarioCreacion,
                idUsuarioActualizacion,
                fechaCreacion,
                fechaActualizacion,
                nroParcela,
                provincia,
                municipio,
                localidad,
                barrio,
                direccion,
                tipoZona)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            return (await this.db.executeSql(sql, [
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
            let sql = `UPDATE parcela SET
                idUsuarioCreacion=?,
                idUsuarioActualizacion=?,
                fechaCreacion=?,
                fechaActualizacion=?,
                nroParcela=?,
                provincia=?,
                municipio=?,
                localidad=?,
                barrio=?,
                direccion=?,
                tipoZona=?
            WHERE id=?`;

            return this.db.executeSql(sql, [
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
            let sql = `SELECT p.* FROM parcela p
                JOIN vivienda v on v.parcelaId = p.id
                JOIN hogar h on h.viviendaId = v.id
                JOIN integrante i on i.hogarId = h.id
                WHERE i.numeroDocumento = '${numeroDocumento}'`;
            return (await this.db.executeSql(sql, [])).rows.item(0);
        } catch (err) {
            return err;
        }
    }
    async getParcelaById(id) {
        try {
            let sql = `SELECT p.* FROM parcela p
                WHERE p.id = '${id}'`;
            return (await this.db.executeSql(sql, [])).rows.item(0);
        } catch (err) {
            return err;
        }
    }
    // ***********************VIVIENDA
    createTableViviendas() {
        try {
            let sql = `CREATE TABLE IF NOT EXISTS vivienda(
                id INTEGER NOT NULL PRIMARY KEY,
                parcelaId INTEGER,
                idUsuarioCreacion INTEGER,
                idUsuarioActualizacion INTEGER,
                fechaCreacion DATETIME,
                fechaActualizacion DATETIME,
                viviendaLetra VARCHAR(100),
                materialPiso VARCHAR(100),
                materialPared VARCHAR(100),
                materialTecho VARCHAR(100),
                cantidadHabitacionesSinServicio VARCHAR(100),
                tipoCasa VARCHAR(100),
                fuenteAgua VARCHAR(100),
                tipoBano VARCHAR(100),
                tieneInstalacionesElectricas VARCHAR(100),
                tieneTratamientoBasura BOOLEAN,
                tieneAnimalesConsumo BOOLEAN,
                animalesConsumoVacunados BOOLEAN,
                animalesConsumoDesparasitados BOOLEAN,
                tieneAnimalesDomesticos BOOLEAN,
                animalesDomesticosVacunados BOOLEAN,
                animalesDomesticosDesparasitados BOOLEAN,
                internet BOOLEAN,
                tvCable BOOLEAN,
                dtv BOOLEAN,
                automovil BOOLEAN,
                moto BOOLEAN,
                lineaTelefono BOOLEAN,
                celularSinInternet BOOLEAN,
                celularConInternet BOOLEAN,
                otrosDatos VARCHAR(100)
                )`;
            return this.db.executeSql(sql, []);
        } catch (err) {
            return (err);
        }
    }

    async insertVivienda(vivienda: IVivienda) {
        try {
            let sql = `INSERT INTO vivienda(
                parcelaId,
                idUsuarioCreacion,
                idUsuarioActualizacion,
                fechaCreacion,
                fechaActualizacion,
                viviendaLetra,
                materialPiso,
                materialPared,
                materialTecho,
                cantidadHabitacionesSinServicio,
                tipoCasa,
                fuenteAgua,
                tipoBano,
                tieneInstalacionesElectricas,
                tieneTratamientoBasura,
                tieneAnimalesConsumo,
                animalesConsumoVacunados,
                animalesConsumoDesparasitados,
                tieneAnimalesDomesticos,
                animalesDomesticosVacunados,
                animalesDomesticosDesparasitados,
                internet,
                tvCable,
                dtv,
                automovil,
                moto,
                lineaTelefono,
                celularSinInternet,
                celularConInternet,
                otrosDatos )
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

            return (await this.db.executeSql(sql, [
                vivienda.parcelaId,
                vivienda.idUsuarioCreacion,
                vivienda.idUsuarioActualizacion,
                vivienda.fechaCreacion,
                vivienda.fechaActualizacion,
                vivienda.viviendaLetra,
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
        try {
            let sql = `UPDATE vivienda SET
                parcelaId=?,
                idUsuarioCreacion=?,
                idUsuarioActualizacion=?,
                fechaCreacion=?,
                fechaActualizacion=?,
                viviendaLetra=?,
                materialPiso=?,
                materialPared=?,
                materialTecho=?,
                cantidadHabitacionesSinServicio=?,
                tipoCasa=?,
                fuenteAgua=?,
                tipoBano=?,
                tieneInstalacionesElectricas=?,
                tieneTratamientoBasura=?,
                tieneAnimalesConsumo=?,
                animalesConsumoVacunados=?,
                animalesConsumoDesparasitados=?,
                tieneAnimalesDomesticos=?,
                animalesDomesticosVacunados=?,
                animalesDomesticosDesparasitados=?,
                internet=?,
                tvCable=?,
                dtv=?,
                automovil=?,
                moto=?,
                lineaTelefono=?,
                celularSinInternet=?,
                celularConInternet=?,
                otrosDatos=?
            WHERE id=?`;

            return this.db.executeSql(sql, [
                vivienda.parcelaId,
                vivienda.idUsuarioCreacion,
                vivienda.idUsuarioActualizacion,
                vivienda.fechaCreacion,
                vivienda.fechaActualizacion,
                vivienda.viviendaLetra,
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
            return err;
        }
    }

    async getViviendasByparcelaId(parcelaId) {
        try {
            let sql = `SELECT * FROM vivienda
                WHERE parcelaId = ${parcelaId} order by viviendaLetra asc`;

            let viviendas = []
            let rows = (await this.db.executeSql(sql, []) as any).rows;
            for (let i = 0; i < rows.length; i++) {
                viviendas.push(rows.item(i) as IParcela);
            }
            return viviendas;
        } catch (err) {
            return err;
        }
    }

    async getViviendaById(id) {
        try {
            let sql = `SELECT v.* FROM vivienda v
                WHERE v.id = '${id}'`;
            return (await this.db.executeSql(sql, [])).rows.item(0);
        } catch (err) {
            return err;
        }
    }
    // ***********************HOGAR
    createTableHogares() {
        try {
            let sql = `CREATE TABLE IF NOT EXISTS hogar(
                id INTEGER NOT NULL PRIMARY KEY,
                viviendaId INTEGER,
                idUsuarioCreacion INTEGER,
                idUsuarioActualizacion INTEGER,
                fechaCreacion DATETIME,
                fechaActualizacion DATETIME,
                fechaVisita1 DATETIME,
                fechaVisita2 DATETIME,
                fechaVisita3 DATETIME,
                muerteNinoMenor5 BOOLEAN,
                muerteNinoMenor5Causa VARCHAR(100),
                muerteNinoMenor5CausaOtro VARCHAR(100),
                menor5ConEnfermedadGrave INTEGER
                )`;
            return this.db.executeSql(sql, []);
        } catch (err) {
            return (err);
        }
    }

    async insertHogar(hogar: IHogar) {
        let sql = `INSERT INTO hogar(
            viviendaId,
            idUsuarioCreacion,
            idUsuarioActualizacion,
            fechaCreacion,
            fechaActualizacion,
            fechaVisita1,
            fechaVisita2,
            fechaVisita3,
            muerteNinoMenor5,
            muerteNinoMenor5Causa,
            muerteNinoMenor5CausaOtro,
            menor5ConEnfermedadGrave)
             VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`;

        try {
            return (await this.db.executeSql(sql, [
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
            return (err);
        }
    }

    updateHogar(hogar: IHogar) {
        let sql = `UPDATE hogar SET
            viviendaId=?,
            idUsuarioCreacion=?,
            idUsuarioActualizacion=?,
            fechaCreacion=?,
            fechaActualizacion=?,
            fechaVisita1=?,
            fechaVisita2=?,
            fechaVisita3=?,
            muerteNinoMenor5=?,
            muerteNinoMenor5Causa=?,
            muerteNinoMenor5CausaOtro=?,
            menor5ConEnfermedadGrave=?
            WHERE id =?`;

        try {
            return this.db.executeSql(sql, [
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
            let sql = `SELECT * FROM hogar
                WHERE viviendaId = ${viviendaId}`;
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
            let sql = `SELECT h.* FROM hogar h
                WHERE h.id = '${id}'`;
            return (await this.db.executeSql(sql, [])).rows.item(0);
        } catch (err) {
            return err;
        }
    }
    // ***********************INTEGRANTE
    createTableIntegrantes() {
        try {
            let sql = `CREATE TABLE IF NOT EXISTS integrante(
                id INTEGER NOT NULL PRIMARY KEY,
                hogarId INTEGER,
                idUsuarioCreacion INTEGER,
                idUsuarioActualizacion  INTEGER,
                fechaCreacion DATETIME,
                fechaActualizacion DATETIME,
                esJefeHogar BOOLEAN,
                apellido VARCHAR(100),
                nombre VARCHAR(100),
                tipoDocumento VARCHAR(100),
                numeroDocumento VARCHAR(100),
                nacionalidad VARCHAR(100),
                sexo VARCHAR(100),
                genero VARCHAR(100),
                etnia VARCHAR(100),
                vinculoConJefeHogar VARCHAR(100),
                fechaNacimiento DATETIME,
                ocupacion VARCHAR(100),
                beneficioSocial VARCHAR(100),
                nivelEducativo VARCHAR(100),
                nivelEducativoEstado VARCHAR(100),
                asistenciaAlimentaria BOOLEAN,
                embarazada BOOLEAN,
                embarzadaEstado VARCHAR(100),
                antitetanica BOOLEAN,
                esquemaVacunacion BOOLEAN,
                coberturaSalud VARCHAR(100),
                lugarAtencion VARCHAR(100),
                lugarAtencionOtro VARCHAR(100),
                discapacidad VARCHAR(100),
                certificadoDiscapacidad VARCHAR(100),
                cudNumero VARCHAR(100),
                cudVigencia DATETIME
                )`;
            return this.db.executeSql(sql, []);
        } catch (err) {
            return (err);
        }
    }

    async insertIntegrante(integrante: IIntegrante) {
        let sql = `INSERT INTO integrante(
                hogarId,
                idUsuarioCreacion,
                idUsuarioActualizacion,
                fechaCreacion,
                fechaActualizacion,
                esJefeHogar,
                apellido,
                nombre,
                tipoDocumento,
                numeroDocumento,
                nacionalidad,
                sexo,
                genero,
                etnia,
                vinculoConJefeHogar,
                fechaNacimiento,
                ocupacion,
                beneficioSocial,
                nivelEducativo,
                nivelEducativoEstado,
                asistenciaAlimentaria,
                embarazada,
                embarzadaEstado,
                antitetanica,
                esquemaVacunacion,
                coberturaSalud,
                lugarAtencion,
                lugarAtencionOtro,
                discapacidad,
                certificadoDiscapacidad,
                cudNumero,
                cudVigencia
            )
            VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

        try {
            return (await this.db.executeSql(sql, [
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
                integrante.cudVigencia
            ])).insertId;
        } catch (err) {
            return (err);
        }
    }

    updateIntegrante(integrante: IIntegrante) {
        let sql = `UPDATE integrante SET
                hogarId=?,
                idUsuarioCreacion=?,
                idUsuarioActualizacion=?,
                fechaCreacion=?,
                fechaActualizacion=?,
                esJefeHogar=?,
                apellido=?,
                nombre=?,
                tipoDocumento=?,
                numeroDocumento=?,
                nacionalidad=?,
                sexo=?,
                genero=?,
                etnia=?,
                vinculoConJefeHogar=?,
                fechaNacimiento=?,
                ocupacion=?,
                beneficioSocial=?,
                nivelEducativo=?,
                nivelEducativoEstado=?,
                asistenciaAlimentaria=?,
                embarazada=?,
                embarzadaEstado=?,
                antitetanica=?,
                esquemaVacunacion=?,
                coberturaSalud=?,
                lugarAtencion=?,
                lugarAtencionOtro=?,
                discapacidad=?,
                certificadoDiscapacidad=?,
                cudNumero=?,
                cudVigencia=?
            WHERE id =?`;

        try {
            return this.db.executeSql(sql, [
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
            return (err);
        }
    }

    async getIntegrantes() {
        try {
            let sql = `SELECT * FROM integrante`;
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

    async getIntegrantesByHogarId(hogarId) {
        try {
            let sql = `SELECT * FROM integrante
                 WHERE hogarId = ${hogarId} order by esJefeHogar desc`;
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
        try {
            let sql = `CREATE TABLE IF NOT EXISTS integranteEnfermedadCronica(
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
            return (err);
        }
    }

    updateIntegranteEnfermedadCronica(integranteEnfermedadCronica: IIntegranteEnfermedadCronica) {
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
            let vivienda = new IVivienda();
            vivienda.parcelaId = parcelaId;
            let viviendaId = await this.insertVivienda(vivienda);
            let hogar = new IHogar();
            hogar.viviendaId = viviendaId;
            let hogarId = await this.insertHogar(hogar);
            let i = new IIntegrante();
            i.hogarId = hogarId;
            i.numeroDocumento = '123456789'
            let integranteId = await this.insertIntegrante(i);
            let parcela: IParcela = await this.getParcelaByDni('123456789');
            parcela.viviendas = (await this.getViviendasByparcelaId(parcela.id) as [IVivienda]);
            parcela.viviendas.forEach(async v => {
                v.hogares = await this.getHogaresByViviendaId(v.id);
                v.hogares.forEach(async h => {
                    // h.integrantes = await this.getIntegrantesByHogarId(h.id);
                    // console.log('h.integrantes', h.integrantes);
                });
            })
        } catch (err) {
            return (err);
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
                return Promise.resolve(datos);
            })
            .catch(error => error);
    }

    async saveEnfermedadesCronicas(enfermedadesCronicas, integranteId) {
        try {
            await this.db.executeSql(`DELETE FROM integranteEnfermedadCronica
                WHERE integranteId = ${integranteId};`, []);

            let sql = `
            INSERT INTO 'integranteEnfermedadCronica'
            SELECT '${enfermedadesCronicas[0].idUsuarioCreacion}' AS 'idUsuarioCreacion',
            '${enfermedadesCronicas[0].idUsuarioActualizacion}' AS 'idUsuarioActualizacion',
            '${enfermedadesCronicas[0].fechaCreacion}' AS 'fechaCreacion',
            '${enfermedadesCronicas[0].fechaActualizacion}' AS 'fechaActualizacion',
            '${enfermedadesCronicas[0].integranteId}' AS 'integranteId',
            '${enfermedadesCronicas[0].enfermedadCronica}' AS 'enfermedadCronica',
            '${enfermedadesCronicas[0].enfermedadCronicaEstado}' AS 'enfermedadCronicaEstado'`;

            enfermedadesCronicas.slice(1).forEach(e =>
                sql += ` UNION ALL SELECT 
                '${e.idUsuarioCreacion}', 
                '${e.idUsuarioActualizacion}', 
                '${e.fechaCreacion}', 
                '${e.fechaActualizacion}', 
                '${e.integranteId}', 
                '${e.enfermedadCronica}', 
                '${e.enfermedadCronicaEstado}'`
            );

            return await this.db.executeSql(sql, []);
        } catch (e) {
            return e;
        }
    }

    async sincronizarDatos() {
        this.syncAppToAndes();
        this.syncAndesToApp();
    }

    async syncAppToAndes() {
        (await this.getReportes()).forEach(async r => await this.network.post(this.baseUrl, r));
    }

    async syncAndesToApp() {
        try {
            // let listado: any = await this.getMongo();
            // if (listado) {
            //     for (let index = 0; index < listado.length; index++) {
            //         const element = listado[index];
            //         // inserta en dispositivo local
            //         if (!element.idApp || ! await this.existe(element.idApp)) {
            //             this.insert(element, element.origen, 0, element.id)
            //         }
            //     }
            // }
        } catch (err) {
            return (err);
        }
    }

    async getReportes() {
        let reportes = [];
        for (let i of await this.getIntegrantes()) {
            reportes.push(await this.getReporteIntegrante(i));
        }
        return reportes;
    }

    async getReporteIntegrante(integrante) {
        let reporteIntegrante: any = {
            paciente: integrante,
            hogar: await this.getHogarById(integrante.hogarId),
        };
        reporteIntegrante.vivienda = await this.getViviendaById(reporteIntegrante.hogar.viviendaId);
        reporteIntegrante.parcela = await this.getParcelaById(reporteIntegrante.vivienda.parcelaId);
        return reporteIntegrante;
    }

    getMongo() {
        return this.network.get(this.baseUrl, {});
    }
}
