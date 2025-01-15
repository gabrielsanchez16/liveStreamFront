import React, { useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAuth } from "../../../context/AuthContext";


const FormLogin = () => {
    const [formData, setFormData] = useState({ user: "", password: "" });
    const [error, setError] = useState({ show: false, message: "" });
    const { login } = useAuth()
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!formData.user || !formData.password) {
            setError({ show: true, message: "Todos los campos son obligatorios" });
            setTimeout(() => setError({ show: false, message: "" }), 3000);
            return;
        }

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/v1/user/login`,
                formData
            );
            login(response.data.token)
            localStorage.setItem("user_login", JSON.stringify(response.data.user))
            navigate("/")
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Error al iniciar sesión";
            setError({ show: true, message: errorMessage });
            setTimeout(() => setError({ show: false, message: "" }), 3000);
        }
    };

    const navigateToRegister = () => {
        navigate("/register");
    };

    return (
        <form onSubmit={handleLogin} className={styles.form_register}>
            <legend>Iniciar Sesión</legend>
            <div className={styles.camp_register}>
                <label htmlFor="user">Usuario</label>
                <input
                    type="text"
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
                    name="password"
                    placeholder="Digite su contraseña"
                    value={formData.password}
                    onChange={handleChange}
                />
            </div>

            {error.show && <p className={styles.error_form}>{error.message}</p>}

            <p>
                ¿No tienes cuenta?{" "}
                <span onClick={navigateToRegister} className={styles.link}>
                    Crea tu cuenta
                </span>
            </p>

            <button type="submit">Iniciar Sesión</button>
        </form>
    );
};

export default FormLogin;
