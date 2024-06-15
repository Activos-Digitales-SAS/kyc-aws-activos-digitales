const express = require('express')
const fileUpload = require('express-fileupload')
const photosRoutes = require('./routes/photos.routes.js')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json()); // Necesario para parsear cuerpos JSON

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './archivos'
}));



app.use(photosRoutes)

app.use(express.static('images'))

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server Online en ${PORT}`);
});