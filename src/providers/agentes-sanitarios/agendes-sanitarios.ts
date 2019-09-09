import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import * as moment from 'moment';
import { NetworkProvider } from '../network';

@Injectable()
export class DatosGestionProvider {
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
        let sql = 'CREATE TABLE IF NOT EXISTS encuesta(id INTEGER)';
        try {
            return this.db.executeSql(sql, []);
        } catch (err) {
            return (err);
        }
    }

}
