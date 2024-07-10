import { conn } from "../db.js";

const getArtistas = async (req, res) => {
    // Completar con la consulta que devuelve todos los artistas
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        [
            {
                "id": "Id del artista",
                "nombre": "Nombre del artista"
            },
            {
                "id": "Id del artista",
                "nombre": "Nombre del artista"
            },
            ...
        ]
    */    
   try {
        const[results,fields] = await conn.query
        ("SELECT nombre, id FROM artistas", [req.params.id,])
       }
       catch(err)
       {
        console.log(err)
       }
   //Uso solo el req.params.id debido a que quiero filtrar todos los artistas y no uno en esecifico si fuera el caso agregaria el req.params.nombre
   //LISTO

};

const getArtista = async (req, res) => {
    // Completar con la consulta que devuelve un artista
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        {
            "id": "Id del artista",
            "nombre": "Nombre del artista"
        }
    */
        const [rows, fields] = await conn.query("SELECT id, nombre FROM artistas WHERE id = ?",
            [req.params.id]
        );
        res.json(rows[0]);
        //LISTO
};

const createArtista = async (req, res) => {
    // Completar con la consulta que crea un artista
    // Recordar que los parámetros de una consulta POST se encuentran en req.body
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del artista",
        }
    */
   const { nombre } = req.body;
   await conn.query("INSERT INTO artistas (nombre) VALUES (?)", [nombre]);
   res.status(201).json({ nombre });
   //res.status(201) es un codigo de estado el cual dice que el codigo fue creado con exito
   //json({ nombre }); esta para enviar una respuesta JSON al cliente 

//LISTO
};

const updateArtista = async (req, res) => {
    // Completar con la consulta que actualiza un artista
    // Recordar que en este caso tienen parámetros en req.params (el id) y en req.body (los demás datos)
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del artista"
        }
    */
   try {
    await conn.query("UPDATE artistas SET nombre = ? WHERE id = ?", [req.body.nombre, req.params.id]);
    res.json({ nombre }); }
    catch(err){
    console.log(err)
}
//LISTO
};

const deleteArtista = async (req, res) => {
    // Completar con la consulta que elimina un artista
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params
    try{
    await conn.query("DELETE FROM artistas WHERE id = ?", [req.params.id]);
    }
    catch(err){
        console.log(err);
    }
    //LISTO
};

const getAlbumesByArtista = async (req, res) => {
    // Completar con la consulta que devuelve las canciones de un artista
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getAlbumes
    try {
    const [results, fields] = await conn.query(
        "SELECT albumes.nombre AS nombre_album, artistas.nombre AS nombre_artista " +
        "FROM albumes " +
        "JOIN artistas ON artistas.id = albumes.artista " +
        "WHERE artistas.id = ?",
        [req.params.id]
    );  
    res.json(results);
} catch (err) {
    console.log(err);
};
}
const getCancionesByArtista = async (req, res) => {
    // Completar con la consulta que devuelve las canciones de un artista
    // (tener en cuenta que las canciones están asociadas a un álbum, y los álbumes a un artista)
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getCanciones
    const cancion = await
    artistas.getCancionesByArtista(req.params.id)
    res.send(cancion);
};

const artistas = {
    getArtistas,
    getArtista,
    createArtista,
    updateArtista,
    deleteArtista,
    getAlbumesByArtista,
    getCancionesByArtista,
};

export default artistas;
