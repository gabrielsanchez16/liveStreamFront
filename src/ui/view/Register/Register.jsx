import React, { useState } from 'react'
import styles from "./styles.module.css"
import FormRegister from '../../components/formRegister/FormRegister'

const Register = () => {



  return (
   <div className={styles.page_register}>
        <FormRegister/>
   </div>
  )
}

export default Register