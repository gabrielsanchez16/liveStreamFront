import React from 'react'
import styles from "./styles.module.css"

const VideoLive = () => {
  return (
    <div className={styles.container_video}>
      <iframe src="https://www.youtube.com/embed/JOPNVlVFT-o?si=kGG_JVVAbU69QB5I" title="Midudev roadmap" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
    </div>
  )
}

export default VideoLive