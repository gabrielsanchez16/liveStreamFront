import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { MdOutlineSend } from "react-icons/md";
import axios from "axios";

const FormChat = () => {
    const [userLogin, setUserLogin] = useState(null);
    const [token, setToken] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user_login"));
        const storedToken = localStorage.getItem("token");

        if (storedUser) setUserLogin(storedUser);
        if (storedToken) setToken(storedToken);
    }, []);

    const getFirstTwoLetters = (text) => {
        return text?.substring(0, 2) || "";
    };

    const sendMessage = async (e) => {
        e.preventDefault();

        if (!message.trim()) return; 

        const data = {
            comment: message,
            user_id: userLogin.id,
            receiver: "All",
        };

        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/v1/message/register`,
                data,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            setMessage("");
        } catch (error) {
            console.error("Error al enviar el mensaje:", error);
        }
    };

    return (
        <form onSubmit={sendMessage} className={styles.form_send_message}>
            <div className={styles.profile}>
                {getFirstTwoLetters(userLogin?.name)}
            </div>
            <input
                type="text"
                id="message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Comenta lo que piensas..."
            />
            <button
                type="submit"
                className={`${styles.button} ${!message && styles.disabled}`}
                disabled={!message}
            >
                <MdOutlineSend color="white" fontSize="20px" />
            </button>
        </form>
    );
};

export default FormChat;
