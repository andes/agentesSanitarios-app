export const CreateParcelaQuery = `CREATE TABLE IF NOT EXISTS parcela(
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

export const InsertParcelaQuery =`INSERT INTO parcela(
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

export const UpdateParcelaQuery = `UPDATE parcela SET
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

export const SelectParcelaQuery =  `SELECT p.* FROM parcela p
    WHERE p.id = `;

export const SelectParcelaByDniQuery = `SELECT p.* FROM parcela p
    JOIN vivienda v on v.parcelaId = p.id
    JOIN hogar h on h.viviendaId = v.id
    JOIN integrante i on i.hogarId = h.id
WHERE i.numeroDocumento = `;

