const { Router } = require('express')
const { uploadFile, readFile } = require('./s3.js')
const router = Router()

router.get('/', (req,res)=> res.send('welcome to server'))








/*
router.post('/upload', async (req,res)=> {

    console.log(req.files['photo'])
  const result = await uploadFile(req.files['photo'])
    
   console.log(result)
    res.send('archivo subido')
})
*/
router.post('/upload-personas', async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
  }

  // Asegúrate de que los nombres coincidan con los del formulario
  const ccPhoto = req.files.ccPhoto;
  const rutPhoto = req.files.rutPhoto;

  if (!ccPhoto) {
      return res.status(400).send('No ccPhoto file uploaded.');
  }

  if (!rutPhoto) {
      return res.status(400).send('No rutPhoto file uploaded.');
  }

  // Procesar la carga de los archivos
  const resultCC = await uploadFile(ccPhoto);
  const resultRUT = await uploadFile(rutPhoto);

  console.log(resultCC);
  console.log(resultRUT);

  res.send('Archivos subidos');
});


router.post('/upload-juridicos', async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
  }

  // Extracción de archivos
  const filesToUpload = [
      'ccPhoto',
      'rutPhoto',
      'camaraComercio',
      'cedulaRepresentanteLegal',
      'estadosFinancieros',
      'certificadoBancario',
      'composicionAccionaria'
  ];

  const results = {};

  // Procesar la carga de los archivos
  for (const fileKey of filesToUpload) {
      if (req.files[fileKey]) {
          try {
              results[fileKey] = await uploadFile(req.files[fileKey]);
              console.log(`${fileKey} uploaded successfully`);
          } catch (error) {
              console.error(`Error uploading ${fileKey}:`, error);
              return res.status(500).send(`Error uploading ${fileKey}`);
          }
      }
  }

  res.send({
      message: 'Archivos subidos',
      results
  });
});















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