const { Router } = require('express')
const { uploadFile, readFile } = require('./s3.js')
const router = Router()

router.get('/', (req,res)=> res.send('welcome to server'))

router.post('/upload', async (req,res)=> {

    console.log(req.files['photo'])
  const result = await uploadFile(req.files['photo'])
    
   console.log(result)
    res.send('archivo subido')
})


router.get('/archivo/:fileName', async (req, res) => {
    try {
      const fileStream = await readFile(req.params.fileName);
  
      // Configura la respuesta para la descarga
      res.setHeader('Content-Disposition', `attachment; filename=${req.params.fileName}`);
      res.setHeader('Content-Type', 'application/octet-stream');
  
      // Envía el archivo al cliente
      fileStream.pipe(res);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
module.exports = router;