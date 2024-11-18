import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const Register = () => {

    // Logic code

    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: ''
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
        if(form.password !== form.confirmPassword) {
            return alert('Password is not match')
        }
        // console.log(form)

        // Sent to Back-End
        try {
            const res = await axios.post('http://localhost:5000/api/register', form)
            // console.log(res)

            // notification
            toast.success(res.data)

        } catch (err) {
            const errMsg = err.response?.data?.message

            // notification
            toast.error(errMsg)

            console.log(err)
        }
    }

    return (
        <div>
            <h1>Register</h1>
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
                Confirm Password
                <input
                    type="password"
                    className='border'
                    name='confirmPassword'
                    onChange={handleOnChange}
                />
                <button type='submit' className='bg-blue-500 rounded-md'>
                    Register
                </button>
            </form>
        </div>
    )
}

export default Register