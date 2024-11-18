import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import useEcomStore from '../../stores/ecom-store';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    // Logic code
    // const { name, value } = useEcomStore()
    const actionLogin = useEcomStore((state) => state.actionLogin)
    const user = useEcomStore((state) => state.user)

    const navigate = useNavigate()

    // console.log('user', user)

    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    const handleOnChange = (e) => {
        // code
        let inputName = e.target.name
        let inputValue = e.target.value

        // console.log(inputName, inputValue)

        setForm({
            ...form,
            [inputName]: inputValue
        })
    }

    const handleSubmit = async (e) => {
        // code
        e.preventDefault()
        try {
            const res = await actionLogin(form)
            // console.log(res)
            const role = res.data.payload?.role
            // console.log('role', role)
            
            roleRedirect(role)
            toast.success('Login success')
        } catch (err) {
            console.log(err)
            const errMsg = err.response?.data?.message
            toast.error(errMsg)
        }

    }

    const roleRedirect = (role) => {
        if(role === 'admin') {
            navigate('/admin')
        } else {
            navigate('/user')
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                Email
                <input
                    type="email"
                    className='border'
                    name='email'
                    onChange={handleOnChange}
                />
                Password
                <input
                    type="password"
                    className='border'
                    name='password'
                    onChange={handleOnChange}
                />
                <button type='submit' className='bg-blue-500 rounded-md'>
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login