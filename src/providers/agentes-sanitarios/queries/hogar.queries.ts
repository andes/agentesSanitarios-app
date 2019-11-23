export const CreateHogarQuery = `CREATE TABLE IF NOT EXISTS hogar(
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

export const InsertHogarQuery = `INSERT INTO hogar(
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

export const UpdateHogarQuery = `UPDATE hogar SET
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

export const SelectHogarQuery = `SELECT h.* FROM hogar h
WHERE h.id = `;

export const SelectHogarByViviendaQuery = `SELECT * FROM hogar
WHERE viviendaId = `;

