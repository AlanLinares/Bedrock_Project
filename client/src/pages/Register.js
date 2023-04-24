import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import Button from "../components/Button"
import '../css/Button.css'
import '../css/Register.css'

export default function Register() {
    const [form, setForm] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        phone_number: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        role: '',
    })
    const navigate = useNavigate()

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value }
        })
    }

    // This function will handle the submission.
    async function onSubmit(e) {
        e.preventDefault()

        // When a post request is sent to the create url, we'll add a new record to the database.
        const newPerson = { ...form }
        console.log(form)
        await fetch('http://localhost:5000/api/v1/users/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPerson),
        }).catch((error) => {
            window.alert(error)
            return
        })

        setForm({
            username: '',
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            phone_number: '',
            address: [{
                street: '',
                city: '',
                state: '',
                zip: ''
            }],
            role: '',
        })
       
        navigate('/login')
    }

    return (
        <div>
            <div className='main'>
                <div className='register-container'>
                    <h2>Register</h2>
                    <form onSubmit={onSubmit}>
                        <div className='input-field-container'>
                            <div className='input-field-one'>
                                <div className='input-container'>
                                    <label>First Name</label>
                                    <input
                                        type='text'
                                        placeholder='John'
                                        id='first_name'
                                        value={form.first_name}
                                        onChange={(e) =>
                                            updateForm({
                                                first_name: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                <div className='input-container'>
                                    <label>Email</label>
                                    <input
                                        type='email'
                                        placeholder='johndoe@here.com'
                                        id='email'
                                        value={form.email}
                                        onChange={(e) =>
                                            updateForm({ email: e.target.value })
                                        }
                                    />
                                </div>
                                <div className='input-container'>
                                    <label>Phone Number</label>
                                    <input
                                        type='text'
                                        placeholder='(111)222-3333'
                                        id='phone_number'
                                        value={form.phone_number}
                                        onChange={(e) =>
                                            updateForm({ phone_number: e.target.value })
                                        }
                                    />
                                </div>
                                <div className='input-container'>
                                    <label>Username</label>
                                    <input
                                        type='text'
                                        placeholder='BigDog45'
                                        id='username'
                                        value={form.username}
                                        onChange={(e) =>
                                            updateForm({ username: e.target.value })
                                        }
                                    />
                                </div>
                                
                            </div>
                            <div className='input-field-one'>
                                <div className='input-container'>
                                    <label>Last Name</label>
                                    <input
                                        type='text'
                                        placeholder='Doe'
                                        id='last_name'
                                        value={form.last_name}
                                        onChange={(e) =>
                                            updateForm({
                                                last_name: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className='input-container'>
                                    <label>Password</label>
                                    <input
                                        type='password'
                                        placeholder='a1b2c3'
                                        id='password'
                                        value={form.password}
                                        onChange={(e) =>
                                            updateForm({ password: e.target.value })
                                        }
                                    />
                                </div>

                                <div className='input-container'>
                                    <label>Role</label>
                                    <input
                                        type='text'
                                        placeholder='user/client/admin'
                                        id='role'
                                        value={form.role}
                                        onChange={(e) =>
                                            updateForm({ role: e.target.value })
                                        }
                                    />
                                </div>
                            </div>
                            
                        </div>
                        <div>Address</div>
                        <div className = 'address-field-container'>
                                <div className='input-container'>
                                    <label>Street</label>
                                    <input
                                        type='text'
                                        placeholder='12 Hero Ave'
                                        id='street'
                                        value={form.street}
                                        onChange={(e) =>
                                            updateForm({street: e.target.value})
                                        }
                                    />
                                </div>
                                <div className='input-container'>
                                    <label>City</label>
                                    <input
                                        type='text'
                                        placeholder='New York'
                                        id='city'
                                        value={form.city}
                                        onChange={(e) =>
                                            updateForm({ city: e.target.value })
                                        }
                                    />
                                </div>

                                <div className='input-container'>
                                    <label>State</label>
                                    <input
                                        type='text'
                                        placeholder='FL'
                                        id='state'
                                        value={form.state}
                                        onChange={(e) =>
                                            updateForm({ state: e.target.value })
                                        }
                                    />
                                </div>
                                <div className='input-container'>
                                    <label>Zip</label>
                                    <input
                                        type='text'
                                        placeholder='33605'
                                        id='zip'
                                        value={form.zip}
                                        onChange={(e) =>
                                            updateForm({ zip: e.target.value })
                                        }
                                    />
                                </div>                          
                        </div>
                        <Button name={'Register'} />
                    </form>
                </div>
            </div>
        </div>
    )
}