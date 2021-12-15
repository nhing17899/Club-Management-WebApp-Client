import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const app = initializeApp({
    apiKey: "AIzaSyCREEDA8m2XXo1tyn8jPbYCUPz2yWdUyWg",
    authDomain: "login-authentication-c911d.firebaseapp.com",
    projectId: "login-authentication-c911d",
    storageBucket: "login-authentication-c911d.appspot.com",
    messagingSenderId: "571313181949",
    appId: "1:571313181949:web:91a30d33c55b659d525a94"
})

export const auth = getAuth(app)
export default app