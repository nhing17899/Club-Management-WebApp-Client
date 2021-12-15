import React, { useState } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';
import { auth } from '../Firebase/Firebase';
import '../../App/index.css';
import '../index.css';

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
    })
    const handleSubmit = async () => {
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                email,
                password
            )
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <div>
            <form
            onSubmit={handleSubmit}
            className='formAccount'
            >
                <h2 className='text-center'>Login</h2>

                <div className='form-group'>
                    <label>Email</label>
                    <input
                        type='email'
                        className='form-control'
                        placeholder='Email'
                        required
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className='form-group'>
                    <label>Password</label>
                    <input
                        type='password'
                        className='form-control'
                        placeholder='Password'
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <div className='form-group'>
                    <button
                        className='btn btn-primary btn-block'
                        type='submit'
                        style={{
                            marginTop: '20px',
                            backgroundColor: '#ffbb00',
                            borderColor: '#ffbb00',
                            width: '340px'
                        }}
                    >
                        Login
                    </button>
                </div>

            </form>
        </div>
    )
}