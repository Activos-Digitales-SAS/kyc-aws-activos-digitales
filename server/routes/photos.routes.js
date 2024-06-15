const { Router } = require('express')
const { downloadPhoto, uploadPersonas, uploadJuridicos, getPersonas, getJuridicos, savePersonas, listAllImages, saveJuridicos} = require('../controllers/photos.controller');

const router = Router()


router.get('/', (req, res) => res.send('Welcome to server'));
router.post('/upload-personas', uploadPersonas);
router.post('/save-personas', savePersonas);
router.post('/save-juridicos', saveJuridicos);
router.post('/upload-juridicos', uploadJuridicos);
router.get('/archivo/:fileName', downloadPhoto);
router.get('/personas', getPersonas);
router.get('/juridicos', getJuridicos);
    router.get('/list-images', listAllImages);


module.exports = router;








//primera funcion v 0.1
/*
router.post('/upload', async (req,res)=> {

    console.log(req.files['photo'])
  const result = await uploadFile(req.files['photo'])
    
   console.log(result)
    res.send('archivo subido')
})
*/

//segunda version v 0.2
/*
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
*/