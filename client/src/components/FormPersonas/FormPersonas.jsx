import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaFileUpload, FaFileAlt } from 'react-icons/fa';
import styles from './FormPersonas.module.css';

const FormPersonas = () => {
    const [post, setPost] = useState({
        nombresCompletos: '',
        numeroIdentificacion: '',
        tipoIdentificacion: '',
        nacionalidad: '',
        ciudadResidencia: '',
        direccion: '',
        correoElectronico: '',
        telefonoCelular: '',
        descripcionOrigenFondos: '',
        ccPhotoPersonas: null,
        rutPhotoPersonas: null,
    });

    const [cities, setCities] = useState([]);
    const [language, setLanguage] = useState('es'); // Estado para el idioma

    useEffect(() => {
        // Cargar ciudades
        axios.get('https://api-colombia.com/api/v1/City')
            .then(response => {
                setCities(response.data);
            })
            .catch(error => {
                console.error('Error al cargar ciudades:', error);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        for (const key in post) {
            if (post[key]) {
                formData.append(key, post[key]);
            }
        }

        try {
            const response = await axios.post('http://localhost:3000/upload-personas', formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log(response);
        } catch (error) {
            console.error('Error uploading files:', error);
        }
    };

    const handleChange = (e) => {
        const { name, type, value, files } = e.target;
        setPost(prevState => ({
            ...prevState,
            [name]: type === 'file' ? files[0] : value
        }));
    };

    const handleFileClick = (field) => {
        document.getElementById(field).click();
    };

    const toggleLanguage = () => {
        setLanguage(prevLanguage => prevLanguage === 'es' ? 'en' : 'es');
    };

    // Traducciones
    const translations = {
        es: {
            nombresCompletos: 'Nombres Completos',
            numeroIdentificacion: 'Numero de Identificación',
            tipoIdentificacion: 'Seleccione tipo de identificación',
            nacionalidad: 'Nacionalidad',
            ciudadResidencia: 'Seleccione una ciudad',
            direccion: 'Dirección',
            correoElectronico: 'Correo Electronico',
            telefonoCelular: 'Teléfono celular',
            descripcionOrigenFondos: 'Origen de tus fondos',
            ccPhotoPersonas: 'CC',
            rutPhotoPersonas: 'RUT',
            enviar: 'Enviar',
            selectFile: 'Seleccionar archivo',
            noFileSelected: 'Sin archivos seleccionados',
            options: {
                tipoIdentificacion: [
                    { value: 'cc', label: 'Cédula de ciudadanía' },
                    { value: 'ce', label: 'Cédula de extranjería' },
                    { value: 'pasaporte', label: 'Pasaporte' },
                    { value: 'pep', label: 'Permiso especial de permanencia (PEP)' },
                    { value: 'ppt', label: 'Permiso por protección temporal' },
                    { value: 'otro', label: 'Otro' },
                ]
            }
        },
        en: {
            nombresCompletos: 'Full Names',
            numeroIdentificacion: 'Identification Number',
            tipoIdentificacion: 'Select type of identification',
            nacionalidad: 'Nationality',
            ciudadResidencia: 'Select a city',
            direccion: 'Address',
            correoElectronico: 'Email',
            telefonoCelular: 'Cellphone',
            descripcionOrigenFondos: 'Source of your funds',
            ccPhotoPersonas: 'ID',
            rutPhotoPersonas: 'TAX ID',
            enviar: 'Submit',
            selectFile: 'Select file',
            noFileSelected: 'No files selected',
            options: {
                tipoIdentificacion: [
                    { value: 'cc', label: 'Citizenship ID' },
                    { value: 'ce', label: 'Foreigner ID' },
                    { value: 'pasaporte', label: 'Passport' },
                    { value: 'pep', label: 'Special Stay Permit (PEP)' },
                    { value: 'ppt', label: 'Temporary Protection Permit' },
                    { value: 'otro', label: 'Other' },
                ]
            }
        }
    };

    return (
        <div>
            <button onClick={toggleLanguage}>
                {language === 'es' ? 'English' : 'Español'}
            </button>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder={translations[language].nombresCompletos}
                    name="nombresCompletos"
                    onChange={handleChange}
                />
                <input
                    type="number"
                    placeholder={translations[language].numeroIdentificacion}
                    name='numeroIdentificacion'
                    onChange={handleChange}
                />
                <select name="tipoIdentificacion" id="tipoIdentificacion" onChange={handleChange}>
                    <option value="">{translations[language].tipoIdentificacion}</option>
                    {translations[language].options.tipoIdentificacion.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder={translations[language].nacionalidad}
                    name='nacionalidad'
                    onChange={handleChange}
                />
                <select name="ciudadResidencia" id="ciudadResidencia" onChange={handleChange}>
                    <option value="">{translations[language].ciudadResidencia}</option>
                    {cities.map(city => (
                        <option key={city.id} value={city.name}>{city.name}</option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder={translations[language].direccion}
                    name='direccion'
                    onChange={handleChange}
                />
                <input
                    type="email"
                    placeholder={translations[language].correoElectronico}
                    name='correoElectronico'
                    onChange={handleChange}
                />
                <input
                    type="number"
                    placeholder={translations[language].telefonoCelular}
                    name='telefonoCelular'
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder={translations[language].descripcionOrigenFondos}
                    name='descripcionOrigenFondos'
                    onChange={handleChange}
                />

                <div className={styles.uploads}>
                    {['ccPhotoPersonas', 'rutPhotoPersonas'].map(field => (
                        <div key={field} className={styles.uploadField}>
                            <label htmlFor={field}>{translations[language][field]}</label>
                            <button type="button" onClick={() => handleFileClick(field)} className={styles.customFileUpload}>
                                <FaFileUpload /> {translations[language].selectFile}
                            </button>
                            <input
                                type="file"
                                name={field}
                                id={field}
                                onChange={handleChange}
                                style={{ display: 'none' }}
                            />
                            <span className={styles.fileName}>
                                {post[field] ? post[field].name : translations[language].noFileSelected}
                            </span>
                        </div>
                    ))}
                </div>

                <button type="submit">
                    {translations[language].enviar}
                </button>
            </form>
        </div>
    );
};

export default FormPersonas;
