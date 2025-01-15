import React, { useState, useEffect, useRef } from 'react';
import styles from './styles.module.css';
import axios from 'axios';
import { useAuth } from '../../../../context/AuthContext';
import { useNavigate } from 'react-router';


const RenderMessages = () => {
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');
    const { logout } = useAuth()
    const navigate = useNavigate()
    const userLogin = JSON.parse(localStorage.getItem("user_login"));
    const containerRef = useRef(null);
    const [isScrollingUp, setIsScrollingUp] = useState(false);


    function getFirstTwoLetters(text) {
        if (text && text.length >= 2) {
            return text.substring(0, 2);
        }
        return text;
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            getMessages();
        }, 1000);

        return () => clearInterval(intervalId);
    }, [token]);

    const getMessages = async () => {
        if (!token) {
            setError('No se encontró un token. Por favor, inicia sesión.');
            logout();
            navigate('/login');
            return;
        }


        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/message`, {
                headers: {
                    Authorization: `${token}`,
                },
            });
            setMessages(response.data.comments);
        } catch (error) {
            if (error.response) {
                
                if (error.response.status === 401) {
                    setError('El token no es válido. Por favor, inicia sesión nuevamente.');
                    logout();
                    navigate('/login');
                } else if (error.response.status === 403) {
                    setError('No tienes permiso para realizar esta acción.');
                } else {
                    setError('Ocurrió un error al obtener los mensajes.');
                }
            } else if (error.request) {
                
                setError('No se pudo conectar con el servidor. Por favor, verifica tu conexión a internet.');
            } else {
                setError('Ocurrió un error inesperado. Intenta nuevamente.');
            }
            console.error('Error al obtener los mensajes:', error);
        }
    };


    if (error) {
        return <h2 className={styles.error}>{error}</h2>;
    }



    useEffect(() => {
        const container = containerRef.current;

        const handleScroll = () => {
            if (container) {
                const isAtBottom = container.scrollHeight - container.scrollTop === container.clientHeight;
                setIsScrollingUp(!isAtBottom);
            }
        };

        if (container) {
            container.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    useEffect(() => {
        if (!isScrollingUp) {
            const container = containerRef.current;
            if (container) {
                container.scrollTop = container.scrollHeight;
            }
        }
    }, [messages]);

    return (
        <div
            className={styles.container_messages}
            ref={containerRef}
            style={{
                justifyContent: messages.length === 0 ? 'center' : 'flex-start',
            }}
        >
            {messages.length > 0 ? (
                messages.map((message, index) => (
                    <div
                        key={index}
                        className={styles.comment}
                        style={{
                            background: message?.user?.type_user === 'Moderador' ? 'rgb(198 255 198)' : 'white',
                            alignItems: message?.userId === userLogin.id ? "flex-end" : "flex-start",
                            margin: message?.userId === userLogin.id && "0 0 0 auto"
                        }}
                    >
                        <div className={styles.profile_identification}>
                            <p>{message?.userId === userLogin.id ? "Yo" : message?.user?.name} - </p>
                            <span>
                                <b> {message?.user?.type_user}</b>
                            </span>
                        </div>
                        <div className={styles.content_body} style={{
                            flexDirection: message?.userId === userLogin.id && "row-reverse"
                        }}>
                            <div className={styles.pic_profile}>
                                {getFirstTwoLetters(message?.user?.name)}
                            </div>
                            <section className={styles.message}>
                                <p>{message?.comment}</p>
                            </section>
                        </div>
                    </div>
                ))
            ) : (
                <h2 className={styles.no_messages}>¡Vamos, anímate a participar!</h2>
            )}
        </div>
    );
};

export default RenderMessages;
