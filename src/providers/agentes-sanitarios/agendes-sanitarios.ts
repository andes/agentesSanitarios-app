import { IIntegrante } from './../../interfaces/integrante.interface';
import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { NetworkProvider } from '../network';
import { IParcela } from './../../interfaces/parcela.interface';
import { IHogar } from './../../interfaces/hogar.interface';
import { IVivienda } from './../../interfaces/vivienda.interface';
import { IIntegranteEnfermedadCronica } from './../../interfaces/integranteEnfermedadCronica.interface';

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
            console.log('createTableParcelas')
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
            console.log('Error!', err)
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
                new Date(),
                new Date(),
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

    async getParcela(numeroDocumento) {
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
    // ***********************VIVIENDA
    createTableViviendas() {
        console.log('createTableViviendas')
        try {
            let sql = `CREATE TABLE IF NOT EXISTS vivienda(
                id INTEGER NOT NULL PRIMARY KEY,
                parcelaId INTEGER,
                idUsuarioCreacion INTEGER,
                idUsuarioActualizacion INTEGER,
                fechaCreacion DATETIME,
                fechaActualizacion DATETIME,
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
            console.log('err', err)
            return (err);
        }
    }

    async insertVivienda(vivienda: IVivienda) {
        console.log('insertVivienda')
        try {
            let sql = `INSERT INTO vivienda(
                parcelaId,
                idUsuarioCreacion,
                idUsuarioActualizacion,
                fechaCreacion,
                fechaActualizacion,
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
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

            return (await this.db.executeSql(sql, [
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
            let sql = `UPDATE vivienda SET
                fechaCreacion=?,
                fechaActualizacion=?,
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
                new Date(),
                new Date(),
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
        console.log('getViviendasByparcelaId xxx', parcelaId);
        try {
            let sql = `SELECT * FROM vivienda
                WHERE parcelaId = ${parcelaId}`;

            let viviendas = []
            let rows = (await this.db.executeSql(sql, []) as any).rows;
            for (let i = 0; i < rows.length; i++) {
                viviendas.push(rows.item(i) as IParcela);
            }

            // let parcela: IParcela = new IParcela();
            // parcela.nroParcela = resParcela.nroParcela;
            // parcela.provincia = resParcela.provincia;
            // parcela.municipio = resParcela.municipio;
            // parcela.localidad = resParcela.localidad;
            // parcela.barrio = resParcela.barrio;
            // parcela.direccion = resParcela.direccion;
            // parcela.tipoZona = resParcela.tipoZona;
            // let viviendas = [];
            // parcela.viviendas = (viviendas as [IVivienda]);
            // return parcela;
            return viviendas;
        } catch (err) {
            return err;
        }
    }
    // ***********************HOGAR
    createTableHogares() {
        console.log('createTableHogares')
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
            console.log('insert hogar', err)
            return (err);
        }
    }

    updateHogar(hogar: IHogar) {
        let sql = `UPDATE hogar SET
            viviendaId=?,
            fechaCreacion=?,
            fechaActualizacion=?,
            muerteNinoMenor5=?,
            muerteNinoMenor5Causa=?,
            menor5ConEnfermedadGrave=?
            WHERE id = ?`;

        try {
            return this.db.executeSql(sql, [
                new Date(),
                new Date(),
                false, // hogar.muerteNinoMenor5,
                '', // hogar.muerteNinoMenor5Causa,
                '', // hogar.menor5ConEnfermedadGrave
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
    // ***********************INTEGRANTE
    createTableIntegrantes() {
        console.log('createTableIntegrantes')
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
            VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

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
        console.log('updateIntegrante');
        let sql = `UPDATE integrante SET
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
                vinculoConJefeHogar=?,
                fechaNacimiento=?,
                ocupacion=?,
                beneficioSocial=?,
                nivelEducativo=?,
                nivelEducativoIncompletoEstado=?,
                enfermedadCronica1=?,
                enfermedadCronica1Estado=?,
                enfermedadCronica2=?,
                enfermedadCronica2Estado=?,
                enfermedadCronica3=?,
                enfermedadCronica3Estado=?,
                enfermedadCronica4=?,
                enfermedadCronica4Estado=?,
                asistenciaAlimentaria=?,
                embarazada=?,
                embarzadaEstado=?,
                antitetanica=?,
                esquemaVacunacion=?,
                coberturaSalud=?,
                lugarAtencion=?,
                discapacidad=?,
                certificadoDiscapacidad=?,
                cudNumero=?,
                cudVigencia=?
            WHERE id = ?`;

        try {
            return this.db.executeSql(sql, [
                new Date(),
                new Date(),
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
                integrante.vinculoConJefeHogar,
                integrante.vinculoConJefeHogarIncompletoEstado,
                integrante.enfermedadCronica1,
                integrante.enfermedadCronica1Estado,
                integrante.enfermedadCronica2,
                integrante.enfermedadCronica2Estado,
                integrante.enfermedadCronica3,
                integrante.enfermedadCronica3Estado,
                integrante.enfermedadCronica4,
                integrante.enfermedadCronica4Estado,
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
                integrante.cudVigencia,
                integrante.id
            ]);
        } catch (err) {
            return (err);
        }
    }

    async getIntegrantesByHogarId(hogarId) {
        try {
            let sql = `SELECT * FROM integrante
                 WHERE hogarId = ${hogarId}`;
            let integrantes = []
            let rows = (await this.db.executeSql(sql, []) as any).rows;
            for (let i = 0; i < rows.length; i++) {
                integrantes.push(rows.item(i) as IHogar);
            }
            return integrantes;
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

    async insertIntegrantesEnfermedadesCronicas(integranteEnfermedadCronica: IIntegranteEnfermedadCronica) {
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
            let parcela: IParcela = await this.getParcela('123456789');
            console.log('parcela', parcela);
            parcela.viviendas = (await this.getViviendasByparcelaId(parcela.id) as [IVivienda]);
            console.log('parcela.viviendas', parcela.viviendas);
            parcela.viviendas.forEach(async v => {
                v.hogares = await this.getHogaresByViviendaId(v.id);
                console.log('v.hogares', v.hogares);
                v.hogares.forEach(async h => {
                    h.integrantes = await this.getIntegrantesByHogarId(h.id);
                    console.log('h.integrantes', h.integrantes);
                });
            })
            console.log('await this.updateParcela(parcela)', await this.updateParcela(parcela));
            parcela.viviendas.forEach( async (v: IVivienda) => {
                console.log('await this.updateVivienda(v)', await this.updateVivienda(v));
                v.hogares.forEach( async (h: IHogar) => {
                    console.log('await this.updateHogar(h)', h.id, await this.updateHogar(h));
                    h.integrantes.forEach(async (i: IIntegrante) => {
                        console.log('await this.updateIntegrante(i)', await this.updateIntegrante(i));
                    })
                })
            })
            console.log('OK', parcela);
        } catch (e) {
            console.log('TEST FAILED!', e)
        }
    }

    // async insertEncuesta(encuesta: IEncuesta) {
    //     try {
    //     let sql = `INSERT INTO encuesta(
    //         HEADER_equipoNucleoReferencia,
    //         HEADER_nroFormulario,
    //         HEADER_nroPlanilla,
    //         HEADER_nroParcela,
    //         HEADER_nroVivienda,
    //         HEADER_nroHogar,
    //         HEADER_fechaVisita,
    //         HEADER_fechaVisita2,
    //         HEADER_fechaVisita3,
    //         HEADER_nombreEncuestador,
    //         HEADER_apellidoEncuestador,
    //         HEADER_provincia,
    //         HEADER_municipio,
    //         HEADER_localidad,
    //         HEADER_barrio,
    //         HEADER_direccion,
    //         HEADER_tipoZona,
    //         HEADER_etnia,
    //         COND_SOC_materialPiso,
    //         COND_SOC_materialPared,
    //         COND_SOC_materialTecho,
    //         COND_SOC_cantidadHabitacionesSinServicio,
    //         COND_SOC_tieneInstalacionElectrica,
    //         COND_SOC_tieneTratamiendoBasura,
    //         COND_SOC_tipoCasa,
    //         COND_SOC_fuenteAgua,
    //         COND_SOC_tipoBaño,
    //         COND_SOC_tieneAnimalesConsumo,
    //         COND_SOC_animalesConsumoVacunados,
    //         COND_SOC_animalesConsumoDesparasitados,
    //         COND_SOC_tieneAnimalesDomesticos,
    //         COND_SOC_animalesDomesticosVacunados,
    //         COND_SOC_animalesDomesticosDesparasitados)
    //         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    //         `;

    //         return await this.db.executeSql(sql, [
    //             encuesta.equipoNucleoReferencia,
    //             encuesta.nroFormulario,
    //             encuesta.nroPlanilla,
    //             encuesta.nroParcela,
    //             encuesta.nroVivienda,
    //             encuesta.nroHogar,
    //             encuesta.fechaVisita,
    //             encuesta.fechaVisita1,
    //             encuesta.fechaVisita2,
    //             encuesta.nombreEncuestador,
    //             encuesta.apellidoEncuestador,
    //             encuesta.provincia,
    //             encuesta.municipio,
    //             encuesta.localidad,
    //             encuesta.barrio,
    //             encuesta.direccion,
    //             encuesta.tipoZona,
    //             encuesta.etnia,
    //             encuesta.materialPiso,
    //             encuesta.materialPared,
    //             encuesta.materialTecho,
    //             encuesta.cantidadHabitacionesSinServicio,
    //             encuesta.tieneInstalacionesElectricas,
    //             encuesta.tieneTratamientoBasura,
    //             encuesta.tipoCasa,
    //             encuesta.fuenteAgua,
    //             encuesta.tipoBano,
    //             encuesta.tieneAnimalesConsumo,
    //             encuesta.animalesConsumoVacunados,
    //             encuesta.animalesConsumoDesparasitados,
    //             encuesta.tieneAnimalesDomesticos,
    //             encuesta.animalesDomesticosVacunados,
    //             encuesta.animalesDomesticosDesparasitados
    //         ]);
    //     } catch (err) {
    //         return err;
    //     }
    // }

    // async insertComponenteHogar(componenteHogar) {
    //     let sql = `INSERT INTO componenteHogar(
    //     apellido,
    //     nombre,
    //     tipo_documento,
    //     numero_documento,
    //     nacionalidad,
    //     sexo,
    //     genero,
    //     vinculo_jefe,
    //     fecha_nacimiento,
    //     ocupacion,
    //     beneficio_social,
    //     nivel_educacional,
    //     estado_cursada,
    //     enfermedades_cronicas,
    //     asistencia_alimentaria,
    //     enquema_vacunacion,
    //     cobertura_salud,
    //     lugar_atencion,
    //     discapacidad)
    //         VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    //     try {
    //         return await this.db.executeSql(sql, [
    //             componenteHogar.apellido,
    //             componenteHogar.nombre,
    //             componenteHogar.tipoDocumento,
    //             componenteHogar.numeroDocumento,
    //             componenteHogar.nacionalidad,
    //             componenteHogar.sexo,
    //             componenteHogar.genero,
    //             componenteHogar.vinculoConJefeHogar,
    //             componenteHogar.fechaNacimiento,
    //             componenteHogar.ocupacion,
    //             componenteHogar.beneficioSocial,
    //             componenteHogar.vinculoConJefeHogar,
    //             componenteHogar.estadoCursada,
    //             componenteHogar.enfermedadesCronicas,
    //             componenteHogar.asistenciaAlimentaria,
    //             // componenteHogar.embarazo,
    //             componenteHogar.esquemaVacunacion,
    //             componenteHogar.coberturaSalud,
    //             componenteHogar.lugarAtencion,
    //             componenteHogar.discapacidad,
    //             // componenteHogar.certificadoDiscapacidad,
    //             // componenteHogar.cudNumero,
    //             // componenteHogar.cudVigencia
    //         ]);
    //     } catch (err) {
    //         console.log(err)
    //         return (err);
    //     }
    // }

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

    // createTableEncuesta() {
    //     try {
    //         let sql = `CREATE TABLE IF NOT EXISTS encuesta(
    //             HEADER_equipoNucleoReferencia VARCHAR(100),
    //             HEADER_nroFormulario INTEGER,
    //             HEADER_nroPlanilla INTEGER,
    //             HEADER_nroParcela INTEGER,
    //             HEADER_nroVivienda INTEGER,
    //             HEADER_nroHogar INTEGER,
    //             HEADER_fechaVisita DATETIME,
    //             HEADER_fechaVisita2 DATETIME,
    //             HEADER_fechaVisita3 DATETIME,
    //             HEADER_nombreEncuestador VARCHAR(100),
    //             HEADER_apellidoEncuestador VARCHAR(100),
    //             HEADER_provincia VARCHAR(100),
    //             HEADER_municipio VARCHAR(100),
    //             HEADER_localidad VARCHAR(100),
    //             HEADER_barrio VARCHAR(100),
    //             HEADER_direccion VARCHAR(200),
    //             HEADER_tipoZona VARCHAR(50),
    //             HEADER_etnia VARCHAR(100),

    //             COND_SOC_materialPiso VARCHAR(20),
    //             COND_SOC_materialPared VARCHAR(20),
    //             COND_SOC_materialTecho VARCHAR(20),
    //             COND_SOC_cantidadHabitacionesSinServicio INTEGER,
    //             COND_SOC_tieneInstalacionElectrica BOOLEAN,
    //             COND_SOC_tieneTratamiendoBasura BOOLEAN,
    //             COND_SOC_tipoCasa VARCHAR(20),
    //             COND_SOC_fuenteAgua VARCHAR(20),
    //             COND_SOC_tipoBaño VARCHAR(20),
    //             COND_SOC_tieneAnimalesConsumo BOOLEAN,
    //             COND_SOC_animalesConsumoVacunados BOOLEAN,
    //             COND_SOC_animalesConsumoDesparasitados BOOLEAN,
    //             COND_SOC_tieneAnimalesDomesticos BOOLEAN,
    //             COND_SOC_animalesDomesticosVacunados BOOLEAN,
    //             COND_SOC_animalesDomesticosDesparasitados BOOLEAN)`;
    //         return this.db.executeSql(sql, []);
    //     } catch (err) {
    //         return (err);
    //     }
    // }

    // createTableComponenteHogar() {
    //     try {
    //         let sql = `CREATE TABLE IF NOT EXISTS componenteHogar(
    //             apellido VARCHAR(50),
    //             nombre VARCHAR(50),
    //             tipo_documento VARCHAR(10),
    //             numero_documento VARCHAR(10),
    //             nacionalidad  VARCHAR(20),
    //             sexo VARCHAR(10),
    //             genero VARCHAR(10),
    //             vinculo_jefe VARCHAR(20),
    //             fecha_nacimiento DATETIME,
    //             ocupacion VARCHAR(20),
    //             beneficio_social VARCHAR(20),
    //             nivel_educacional VARCHAR(20),
    //             estado_cursada VARCHAR(10),
    //             enfermedades_cronicas VARCHAR(20),
    //             asistencia_alimentaria VARCHAR(20),
    //             enquema_vacunacion BOOLEAN,
    //             cobertura_salud  VARCHAR(20),
    //             lugar_atencion VARCHAR(20),
    //             discapacidad VARCHAR(20)
    //         )`;
    //         return this.db.executeSql(sql, []);
    //     } catch (err) {
    //         console.log('create componenteHogar', err)
    //         return (err);
    //     }
    // }


}
