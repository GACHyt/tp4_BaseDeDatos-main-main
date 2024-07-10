import express from "express";
const app = express();
const port = 3000;

import artistas from "./controllers/artistas.js";
import albumes from "./controllers/albumes.js";
import canciones from "./controllers/canciones.js";

app.use(express.json());

app.get("/", (_, res) => {

    res.send("SpoTICfy API working!");
});


//artistas:

    app.GET("/artistas", artistas.getartistas);
    app.GET("/artistas/:id", artistas.getartistas);
    app.POST("/artistas", artistas.postartistas);
    app.PUT("/artistas/:id", artistas.putartistas);
    app.DEL("/artistas/:id", artistas.delartistas);
    app.GET("/artistas/:id/canciones", artistas.getartistas);

//Albumes:

    app.GET("/albumes", albumes.getalbumes);
    app.GET("/albumes/:id", albumes.getalbumes);
    app.POST("/albumes", albumes.postalbumes);
    app.PUT("/albumes/:id", albumes.putalbumes);
    app.DEL("/albumes/:id", albumes.delalbumes);
    app.GET("/albumes/:id/canciones", albumes.getalbumes);

//Canciones:

    app.GET("/canciones", canciones.getcanciones);
    app.GET("/canciones/:id", canciones.getcanciones);
    app.POST("/canciones", canciones.postcanciones);
    app.PUT("/canciones/:id", canciones.putcanciones);
    app.DEL("/canciones/:id", canciones.delcanciones);
    app.GET("/canciones/:id/reproducir", canciones.getcanciones);
