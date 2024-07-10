import { conn } from "../db.js";

const getCanciones = async (_, res) => {
    // Completar con la consulta que devuelve todas las canciones
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        [
            {
                "id": "Id de la canción",
                "nombre": "Nombre de la canción",
                "nombre_artista": "Id del artista",
                "nombre_album": "Id del album",
                "duracion": "Duración de la canción",
                "reproducciones": "Reproducciones de la canción"
            },
            {
                "id": "Id de la canción",
                "nombre": "Nombre de la canción",
                "nombre_artista": "Id del artista",
                "nombre_album": "Id del album",
                "duracion": "Duración de la canción",
                "reproducciones": "Reproducciones de la canción"
            },
            ...
        ]
    */
        conn.query('SELECT canciones.id, canciones.nombre, artistas.id AS nombre_artista, albumes.id AS nombre_album, canciones.duracion, canciones.reproducciones FROM canciones JOIN albumes ON (canciones.album = albumes.id) JOIN artistas ON (albumes.artista = artistas.id)')
        .then(([ respuesta ]) => {
             res.json(respuesta);
         })
         .catch(error => {
             throw error;
         });
};

const getCancion = async (req, res) => {
    // Completar con la consulta que devuelve una canción
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        {
            "id": "Id de la canción",
            "nombre": "Nombre de la canción",
            "nombre_artista": "Id del artista",
            "nombre_album": "Id del album",
            "duracion": "Duración de la canción",
            "reproducciones": "Reproducciones de la canción"
        }
    */
    const { id } = req.params;
    conn.query('SELECT canciones.id, canciones.nombre, artistas.id AS nombre_artista, albumes.id AS nombre_album, canciones.duracion, canciones.reproducciones FROM canciones JOIN albumes ON (canciones.album = albumes.id) JOIN artistas ON (albumes.artista = artistas.id) WHERE canciones.id = ?', [id])
    .then(([ respuesta ]) => {
        res.json(respuesta);
    })
    .catch(error => {
        throw error;
    });
};

const createCancion = async (req, res) => {
    // Completar con la consulta que crea una canción
    // Recordar que los parámetros de una consulta POST se encuentran en req.body
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre de la canción",
            "album": "Id del album",
            "duracion": "Duración de la canción",
        }
    */
    // (Reproducciones se inicializa en 0)
    const { nombre, album, duracion } = req.body
    conn.query('Insert into canciones (nombre, album, duracion, reproducciones) values (?, ?, ?, 0)', [nombre, album, duracion])
    .then(([ respuesta ]) => {
        res.json(respuesta);
    })
    .catch(error => {
        throw error;
    });
};

const updateCancion = async (req, res) => {
    // Completar con la consulta que actualiza una canción
    // Recordar que los parámetros de una consulta PUT se encuentran en req.body
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre de la canción",
            "album": "Id del album",
            "duracion": "Duración de la canción",
        }
    */
    // (Reproducciones no se puede modificar con esta consulta)
    const { nombre, album, duracion } = req.body
    const { id } = req.params
    conn.query('Update canciones set nombre = ?, album = ?, duracion = ? WHERE id = ?', [nombre, album, duracion, id])
    .then(([ respuesta ]) => {
        res.json(respuesta);
    })
    .catch(error => {
        throw error;
    });
};

const deleteCancion = async (req, res) => {
    // Completar con la consulta que elimina una canción
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params
    const { id } = req.params
    conn.query('DELETE FROM canciones WHERE id = ?', [id])
    .then(([ respuesta ]) => {
        res.json({id:id});
    })
    .catch(error => {
        throw error;
    });
};

const reproducirCancion = async (req, res) => {
    // Completar con la consulta que aumenta las reproducciones de una canción
    // En este caso es una consulta PUT, pero no recibe ningún parámetro en el body, solo en los params
    const { id } = req.params
    conn.query('Update canciones set reproducciones = reproducciones+1 WHERE id = ?', [id])
    .then(([ respuesta ]) => {
        res.json(respuesta);
    })
    .catch(error => {
        throw error;
    });
};

const canciones = {
    getCanciones,
    getCancion,
    createCancion,
    updateCancion,
    deleteCancion,
    reproducirCancion,
};

export default canciones;