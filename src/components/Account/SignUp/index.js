import React, { useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase/Firebase';
import '../../App/index.css';
import '../index.css';

export default function Signup() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setConfirmPassword] = useState("");

    const [user, setUser] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
    })
    const handleSubmit = async () => {
        try {
            const user = await createUserWithEmailAndPassword(
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
                className='formAccount'
                onSubmit={handleSubmit}
            >
                <h2 className='text-center'>SignUp</h2>

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
                    <label>Password Confirmation</label>
                    <input
                        type='password'
                        className='form-control'
                        placeholder='Confirm Password'
                        required
                        onChange={e => setConfirmPassword(e.target.value)}
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
                        Sign Up
                    </button>
                </div>

                <div className='form-group w-100 text-center mt-2'>
                    Already have an account? Log In!
                </div>

            </form>
        </div>
    )
}
