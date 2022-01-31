import React from 'react'
import { LoginForm } from '../../../components/Admin/LoginForm/LoginForm'

import "./Login.scss"

export function Login() {
    return (
        <div className='login-admin'>
            <div className='login-admin__content'>
                <h1>Entrar al Panel</h1>
                <LoginForm/>
            </div>
        </div>
    )
}
