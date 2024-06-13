import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './FormPersonas.module.css';

const FormPersonas = () => {
    const [post, setPost] = useState({
        nombresCompletos: '',
        numeroIdentificacion: '',
        tipoIdentificacion: '',
        nacionalidad: '',
        ciudadResidencia: '',
        direccion:'',
        correoElectronico: '',
        telefonoCelular: '',
        descripcionOrigenFondos:'',
        ccPhoto: null,
        rutPhoto: null
    });



const [cities, setCities] = useState([]);

useEffect(()=>{
    //cargar ciudades
    axios.get('https://api-colombia.com/api/v1/City')
    .then(response=>{
        setCities(response.data)
    })
    .catch(error =>{
        console.error('Error al cargar ciudades:', error)
    })
},[])



    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(); // Manejo de datos-inputs !=archivos, se crea el objeto con "new", Este objeto comenzará vacío, luego lo llenaremos mediante su método append.

        formData.append('nombresCompetos', post.nombresCompletos)
        formData.append('numeroIdentificacion', post.numeroIdentificacion)
        formData.append('tipoIdentificacion', post.tipoIdentificacion)
        formData.append('nacionalidad', post.nacionalidad)
        formData.append('ciudadResidencia', post.ciudadResidencia)
        formData.append('direccion', post.direccion)
        formData.append('correoElectronico', post.correoElectronico)
        formData.append('telefonoCelular', post.telefonoCelular)
        formData.append('descripcionOrigenFondos', post.descripcionOrigenFondos)
    




        
        if (post.ccPhoto) {
            formData.append('ccPhoto', post.ccPhoto);
        }

        if (post.rutPhoto) {
            formData.append('rutPhoto', post.rutPhoto);
        }

        const response = await axios.post('http://localhost:3000/upload-personas', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        console.log(response);
    };

    const handleChange = (e)=>{
        const target = e.target;
        const name = target.name;
        let value;

        if(target.type === 'file'){
            value = target.files[0];
        }else{
            value = target.value;
        }

        setPost(prevState =>({
            ...prevState,
            [name]: value
        }))
    }



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
                {cities.map(city =>{
                    return <option key={city.id} value={city.name}>{city.name}</option>
                })}
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
             onChange={handleSubmit}
              />
            <input 
            type="text"
            placeholder='Origen de tus fondos'
            name='descripcionOrigenFondos'
            onChange={handleChange}
            />







               {/* UPLOAD DOCUMENTS */}
                <div className={styles.uploads}>

                    <div className={styles.cc}>
                        <label htmlFor="cc">CC</label>
                        <input 
                            type="file" 
                            name="ccPhoto" 
                            id="ccPhoto"
                            onChange={e => setPost({ ...post, ccPhoto: e.target.files[0] })}
                        />
                    </div>

                    <div className={styles.rut}>
                        <label htmlFor="rut">RUT</label>
                        <input 
                            type="file" 
                            name="rutPhoto" 
                            id="rutPhoto"
                            onChange={e => setPost({ ...post, rutPhoto: e.target.files[0] })}
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

export default FormPersonas;
