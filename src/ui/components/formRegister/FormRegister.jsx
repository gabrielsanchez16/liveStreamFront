import React, { useState } from 'react';
import styles from './styles.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router';

const FormRegister = () => {
    const [formData, setFormData] = useState({
        name: '',
        type_user: '',
        user: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


    const validateForm = () => {
        const { name, type_user, user, password } = formData;
        if (!name || !type_user || !user || !password) {
            setError('Todos los campos son obligatorios');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            setTimeout(() => setError(''), 3000); 
            return;
        }

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/user/register`, formData);
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                navigate('/login'); 
            }, 2000);
        } catch (err) {
            console.error('Error al crear el usuario:', err);
            setError('Hubo un problema al crear tu cuenta. Inténtalo nuevamente.');
            setTimeout(() => setError(''), 3000);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form_register}>
            <legend>Crear Cuenta</legend>

            <div className={styles.camp_register}>
                <label htmlFor="name">Nombre</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Nombre y Apellido"
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>

            <div className={styles.camp_register}>
                <label htmlFor="typeUser">Tipo de usuario</label>
                <select
                    id="type_user"
                    name="type_user"
                    value={formData.type_user}
                    onChange={handleChange}
                >
                    <option value="">Selecciona tu Usuario</option>
                    <option value="Moderador">Moderador</option>
                    <option value="Estudiante">Estudiante</option>
                </select>
            </div>

            <div className={styles.camp_register}>
                <label htmlFor="user">Usuario</label>
                <input
                    type="text"
                    id="user"
                    name="user"
                    placeholder="Digite su usuario"
                    value={formData.user}
                    onChange={handleChange}
                />
            </div>

            <div className={styles.camp_register}>
                <label htmlFor="password">Contraseña</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Cree una contraseña"
                    value={formData.password}
                    onChange={handleChange}
                />
            </div>

            {error && <p className={styles.error_form}>{error}</p>}
            {success && (
                <p className={styles.correct_create_form}>
                    ¡Tu cuenta se creó con éxito!
                </p>
            )}

            <p>
                ¿Ya tienes cuenta?{' '}
                <span className={styles.link} onClick={() => navigate('/login')}>
                    Inicia Sesión
                </span>
            </p>
            <button type="submit">Crear Usuario</button>
        </form>
    );
};

export default FormRegister;
