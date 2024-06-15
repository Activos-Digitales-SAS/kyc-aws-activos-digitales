const pool = require('../config/db.config');
const uploadFile = require('../services/s3/s3.upload.service');
const readFile = require('../services/s3/s3.download.service');
const listFiles = require('../services/s3/s3.list.service');
const uploadJuridicosFile = require('../services/s3/s3.uploadJuridicos.service');

const listAllImages = async (req, res) => {
    try {
        const files = await listFiles();
        res.json(files);
    } catch (error) {
        console.error('Error listing files:', error);
        res.status(500).send(error.message);
    }
};





const uploadPersonas = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }

        const ccPhotoPersonas = req.files.ccPhotoPersonas;
        const rutPhotoPersonas = req.files.rutPhotoPersonas;

        let ccPhotoUrl = null;
        let rutPhotoUrl = null;

        if (ccPhotoPersonas) {
            const resultCC = await uploadFile(ccPhotoPersonas);
            ccPhotoUrl = resultCC.Location;
        }

        if (rutPhotoPersonas) {
            const resultRUT = await uploadFile(rutPhotoPersonas);
            rutPhotoUrl = resultRUT.Location;
        }

        res.send({ ccPhotoUrl, rutPhotoUrl });
    } catch (error) {
        console.error('Error uploading personas:', error);
        res.status(500).send(error.message);
    }
};

const savePersonas = async (req, res) => {
    try {
        const {
            nombresCompletos,
            numeroIdentificacion,
            tipoIdentificacion,
            nacionalidad,
            ciudadResidencia,
            direccion,
            correoElectronico,
            telefonoCelular,
            descripcionOrigenFondos,
            ccPhotoUrl,
            rutPhotoUrl
        } = req.body;

        const [result] = await pool.query(`
            INSERT INTO Personas (
                nombresCompletos, numeroIdentificacion, tipoIdentificacion,
                nacionalidad, ciudadResidencia, direccion, correoElectronico,
                telefonoCelular, descripcionOrigenFondos, ccPhotoUrl, rutPhotoUrl
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            nombresCompletos, numeroIdentificacion, tipoIdentificacion,
            nacionalidad, ciudadResidencia, direccion, correoElectronico,
            telefonoCelular, descripcionOrigenFondos, ccPhotoUrl, rutPhotoUrl
        ]);

        res.send({ message: 'Datos guardados correctamente.', id: result.insertId });
    } catch (error) {
        console.error('Error saving personas:', error);
        res.status(500).send(error.message);
    }
};


const downloadPhoto = async (req, res) => {
    try {
        const fileStream = await readFile(req.params.fileName);

        // Configura la respuesta para la descarga
        res.setHeader('Content-Disposition', `attachment; filename=${req.params.fileName}`);
        res.setHeader('Content-Type', 'application/octet-stream');

        // Envía el archivo al cliente
        fileStream.pipe(res);
    } catch (error) {
        console.error('Error downloading photo:', error);
        res.status(500).send(error.message);
    }
};

const getPersonas = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Personas');
        res.send(rows);
    } catch (error) {
        console.error('Error getting personas:', error);
        res.status(500).send(error.message);
    }
};

const getJuridicos = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Juridicos');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching juridicos:', error);
        res.status(500).send(error.message);
    }
};











//exclusivo de juridicos



const uploadJuridicos = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }

        const { numeroIdentificacion } = req.body;
        const filesToUpload = [
            { key: 'ccPhoto', suffix: 'cc' },
            { key: 'rutPhoto', suffix: 'rut' },
            { key: 'camaraComercio', suffix: 'camaraComercio' },
            { key: 'cedulaRepresentanteLegal', suffix: 'cedulaRepresentanteLegal' },
            { key: 'estadosFinancieros', suffix: 'estadosFinancieros' },
            { key: 'certificadoBancario', suffix: 'certificadoBancario' },
            { key: 'composicionAccionaria', suffix: 'composicionAccionaria' }
        ];

        const fileUrls = {};

        for (const fileConfig of filesToUpload) {
            const { key, suffix } = fileConfig;
            if (req.files[key]) {
                const newFileName = `${numeroIdentificacion}_${suffix}.${req.files[key].name.split('.').pop()}`;
                const result = await uploadJuridicosFile(req.files[key], newFileName);
                fileUrls[`${key}Url`] = result.Location;
            }
        }

        res.send(fileUrls);
    } catch (error) {
        console.error('Error uploading juridicos:', error);
        res.status(500).send(error.message);
    }
};

const saveJuridicos = async (req, res) => {
    try {
        const {
            nombresCompletos,
            numeroIdentificacion,
            tipoIdentificacion,
            nacionalidad,
            ciudadResidencia,
            direccion,
            correoElectronico,
            telefonoCelular,
            descripcionOrigenFondos,
            ccPhotoUrl = null,
            rutPhotoUrl = null,
            camaraComercioUrl = null,
            cedulaRepresentanteLegalUrl = null,
            estadosFinancierosUrl = null,
            certificadoBancarioUrl = null,
            composicionAccionariaUrl = null
        } = req.body;

        const createdAt = new Date();
        const updatedAt = new Date();

        const values = [
            nombresCompletos, numeroIdentificacion, tipoIdentificacion,
            nacionalidad, ciudadResidencia, direccion, correoElectronico,
            telefonoCelular, descripcionOrigenFondos, ccPhotoUrl, rutPhotoUrl,
            camaraComercioUrl, cedulaRepresentanteLegalUrl, estadosFinancierosUrl,
            certificadoBancarioUrl, composicionAccionariaUrl, createdAt, updatedAt
        ];

        const query = `
            INSERT INTO Juridicos (
                nombresCompletos, numeroIdentificacion, tipoIdentificacion,
                nacionalidad, ciudadResidencia, direccion, correoElectronico,
                telefonoCelular, descripcionOrigenFondos, ccPhotoUrl, rutPhotoUrl,
                camaraComercioUrl, cedulaRepresentanteLegalUrl, estadosFinancierosUrl,
                certificadoBancarioUrl, composicionAccionariaUrl, createdAt, updatedAt
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const [result] = await pool.query(query, values);

        res.send({ message: 'Archivos subidos y datos guardados.', id: result.insertId });
    } catch (error) {
        console.error('Error saving juridicos:', error);
        res.status(500).send(error.message);
    }
};







module.exports = {
    uploadPersonas,
    uploadJuridicos,
    downloadPhoto,
    getPersonas,
    getJuridicos,
    savePersonas,
    listAllImages,
    saveJuridicos,
    uploadFile
};
