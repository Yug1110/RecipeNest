import React, { useContext, useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';

function Login() {

    const [error, setError] = useState(false);
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");

    const navigate = useNavigate()


    const handleLogin = (e)=>{
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user);
            dispatch({type:"LOGIN", payload:user})
            navigate("/home");
        })
        .catch((error) => {
            setError(true)
        });

    }

  return (
    <div className='login-contanier'>
        <form onSubmit={handleLogin}>
            <input type="email" placeholder='Enter Email' onChange={(e)=> setEmail(e.target.value)} value={email}/>
            <input type="password" placeholder='Enter Password' onChange={(e)=> setPassword(e.target.value)} value={password}/>
            <button type='submit'>Login</button>
            {error && <span>Wrong email or password!</span>}
            <a href='/register'><div>New User? Register Here</div></a>
        </form>
    </div>
  )
}

export default Login