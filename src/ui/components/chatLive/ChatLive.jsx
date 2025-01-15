import React, { useState } from 'react'
import styles from "./styles.module.css"
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight, MdOutlineSend } from "react-icons/md";
import FormChat from './formChat/FormChat';
import RenderMessages from './renderMessages/RenderMessages';
import { FaSignOutAlt } from "react-icons/fa";
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router';


const ChatLive = () => {

    const [hiddenChat, setHiddenChat] = useState(false)
    const { logout } = useAuth()
    const navigate = useNavigate()

    return (
        <section className={styles.container_chat} style={{ width: hiddenChat && "30px", height: hiddenChat && "50px", borderRadius:"8px", padding: hiddenChat && ".4rem .4rem"}}>
            <div className={styles.header_chat}>
                {
                    hiddenChat ?
                        <button className={styles.btn} onClick={() => setHiddenChat(!hiddenChat)} style={{ marginLeft: "-5px" }}>
                            <MdKeyboardDoubleArrowLeft fontSize={"30px"} color='green' />
                        </button>
                        :
                        <button className={styles.btn} onClick={() => setHiddenChat(!hiddenChat)}>
                            <MdKeyboardDoubleArrowRight fontSize={"30px"} color='green' />
                        </button>

                }
                <h1 className={styles.title_chat}>Chat en vivo</h1>
                <button className={styles.leave} onClick={()=>{
                    logout();
                    navigate("/login");
                }}><FaSignOutAlt fontSize={"20px"} color='white' /></button>
            </div>
            {
                !hiddenChat &&
                <>
                    <RenderMessages />
                    <FormChat />
                </>
            }

        </section>
    )
}

export default ChatLive