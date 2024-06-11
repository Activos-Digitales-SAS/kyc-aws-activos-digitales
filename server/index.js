const express = require('express')
const fileUpload = require('express-fileupload')
const photosRoutes = require('./photos.routes.js')
const cors = require('cors')
const app = express()

app.use(cors())


app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './archivos'
}));

app.use(photosRoutes)


app.listen(3000)
console.log(`Server Online en ${3000} `)