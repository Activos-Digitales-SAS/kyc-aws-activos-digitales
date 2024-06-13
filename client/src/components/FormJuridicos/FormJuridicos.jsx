import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './FormJuridicos.module.css';

const FormJuridicos = () => {
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
        ccPhoto: null,
        rutPhoto: null,
        camaraComercio: null,
        cedulaRepresentanteLegal: null,
        estadosFinancieros: null,
        certificadoBancario: null,
        composicionAccionaria: null,
    });

    const [cities, setCities] = useState([]);

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

        // Manejo de datos-inputs
        for (const key in post) {
            if (post[key]) {
                formData.append(key, post[key]);
            }
        }

        try {
            const response = await axios.post('http://localhost:3000/upload-juridicos', formData, {
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

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombres Completos"
                    name="nombresCompletos"
                    onChange={handleChange}
                />
                <input
                    type="number"
                    placeholder='Numero de Identificación'
                    name='numeroIdentificacion'
                    onChange={handleChange}
                />
                <select name="tipoIdentificacion" id="tipoIdentificacion" onChange={handleChange}>
                    <option value="">Seleccione tipo de identificación</option>
                    <option value="cc">Cédula de ciudadanía</option>
                    <option value="ce">Cédula de extranjería</option>
                    <option value="pasaporte">Pasaporte</option>
                    <option value="pep">Permiso especial de permanencia (PEP)</option>
                    <option value="ppt">Permiso por protección temporal</option>
                    <option value="otro">Otro</option>
                </select>
                <input
                    type="text"
                    placeholder='Nacionalidad'
                    name='nacionalidad'
                    onChange={handleChange}
                />
                <select name="ciudadResidencia" id="ciudadResidencia" onChange={handleChange}>
                    <option value="">Seleccione una ciudad</option>
                    {cities.map(city => (
                        <option key={city.id} value={city.name}>{city.name}</option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder='Dirección'
                    name='direccion'
                    onChange={handleChange}
                />
                <input
                    type="email"
                    placeholder='Correo Electronico'
                    name='correoElectronico'
                    onChange={handleChange}
                />
                <input
                    type="number"
                    placeholder='Teléfono celular'
                    name='telefonoCelular'
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder='Origen de tus fondos'
                    name='descripcionOrigenFondos'
                    onChange={handleChange}
                />

                <div className={styles.uploads}>
                    <div className={styles.cc}>
                        <label htmlFor="cc">CC</label>
                        <input
                            type="file"
                            name="ccPhoto"
                            id="ccPhoto"
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.rut}>
                        <label htmlFor="rut">RUT</label>
                        <input
                            type="file"
                            name="rutPhoto"
                            id="rutPhoto"
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.camaraComercio}>
                        <label htmlFor="camaraComercio">CAMARA DE COMERCIO</label>
                        <input
                            type="file"
                            name="camaraComercio"
                            id="camaraComercio"
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.cedulaRepresentanteLegal}>
                        <label htmlFor="cedulaRepresentanteLegal">CC REPRESENTANTE LEGAL</label>
                        <input
                            type="file"
                            name="cedulaRepresentanteLegal"
                            id="cedulaRepresentanteLegal"
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.estadosFinancieros}>
                        <label htmlFor="estadosFinancieros">ESTADOS FINANCIEROS</label>
                        <input
                            type="file"
                            name="estadosFinancieros"
                            id="estadosFinancieros"
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.certificadoBancario}>
                        <label htmlFor="certificadoBancario">CERTIFICADO BANCARIO</label>
                        <input
                            type="file"
                            name="certificadoBancario"
                            id="certificadoBancario"
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.composicionAccionaria}>
                        <label htmlFor="composicionAccionaria">COMPOSICION ACCIONARIA</label>
                        <input
                            type="file"
                            name="composicionAccionaria"
                            id="composicionAccionaria"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <button type="submit">
                    Enviar
                </button>
            </form>
        </div>
    );
};

export default FormJuridicos;
