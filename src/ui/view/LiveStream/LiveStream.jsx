import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import VideoLive from '../../components/videoLive/VideoLive'
import ChatLive from '../../components/chatLive/ChatLive'

const LiveStream = ( ) => {

    return (
        <div className={styles.home}>
            <VideoLive/>
            <ChatLive/>
        </div>
    )
}

export default LiveStream