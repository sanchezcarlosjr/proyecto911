import React from 'react'
import { Form, TextInput, PasswordInput, Button } from 'react-admin'
export const login_page = () => {
  return (
    <div id="container">
      <div id="container-form">
        <div id='image-logo'>
          <img src='uabcLogo.png' alt='logo'/>
        </div>
        <Form id="form-login">
            <div id="input-form">
              <TextInput id='input-email' source='Usuario' type='email' fullWidth={true}/>
            </div>
            
            <div id="input-form">
              <PasswordInput id='input' source='Contraseña' initiallyVisible fullWidth={true}/>      
            </div>
        </Form>
        <div id='input-form'>
          <Button id='button-login' label='Iniciar Sesion' variant="contained" color='primary'/>
        </div>
      </div>
    </div>    
  )
}
