import React, { useContext, useState } from 'react'
import { browserSessionPersistence, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';

function Register() {

    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [Fname, setFName]=useState("");
    const [LName, setLName]=useState("");

    const navigate = useNavigate()

    const handleLogin = async (e)=>{
        e.preventDefault();
        try{
            await createUserWithEmailAndPassword(auth, email, password);
            const user= auth.currentUser;
            console.log(user);
            if(user){
                await setDoc(doc(db, "Users", user.uid),{
                    Email: email,
                    first: Fname,
                    last: LName,
                    recipes:[]
                });
            }
            console.log('User registered successfully!!');
            console.log(user);
            navigate("/home")
        } catch (e){
            console.error(e.message);
        }
        
    }

  return (
    <div className='login-contanier'>
        <form onSubmit={handleLogin}>
        
            <input type="text" placeholder='Enter Your FirstName' onChange={(e)=> setFName(e.target.value)} value={Fname} required/>
            <input type="text" placeholder='Enter Your last Name' onChange={(e)=> setLName(e.target.value)} value={LName} required/>
            <input type="emai l" placeholder='Enter Email' onChange={(e)=> setEmail(e.target.value)} value={email}/>
            <input type="password" placeholder='Enter Password' onChange={(e)=> setPassword(e.target.value)} value={password}/>
            <button type='submit'>Let's Eat</button>
            <a href='/login'><div>Already Signed In ? Log In here</div></a>
        </form>
    </div>
  )
}

export default Register