import React, {useState, useEffect, useContext} from 'react'
import { auth, db } from '../firebase'
import { doc, getDoc } from "firebase/firestore"

import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from "../components/Card";
import { SelectedContext } from '../context/SelectedContext';

function Home() {

    const [userDetails, setUserDetails] = useState(null);

    const {setSelectedRecipes,setShoppingList}= useContext(SelectedContext);

    const fetchUserData = async()=>{
        auth.onAuthStateChanged(async (user) => {
            console.log("Log form home page:\n");
            console.log(user);
            
            const docRef = doc(db, "Users", user.uid);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                setUserDetails(docSnap.data());
                console.log(docSnap.data());
            }
            else{
                console.log("User not logged in");
            }

        });
        console.log("logging out user details");
        console.log(userDetails);
    };

    useEffect(()=>{
        fetchUserData();
    },[]);

    async function handleLogout() {
        try {
          await auth.signOut();
          window.location.href = "/login";
          console.log("User logged out successfully!");
        } catch (error) {
          console.error("Error logging out:", error.message);
        }
    }

    const [input, setInput] = useState('');

    const inputHandler = (event)=>{
      setInput(event.target.value);
      if(event.target.value===""){
          setDisplayCoin(allCoin)
      }
  }

  const searchHandler= async(event)=>{
      event.preventDefault();
      const coins = await allCoin.filter((item)=>{
          return item.name.toLowerCase().includes(input.toLowerCase())
      })
      setDisplayCoin(coins)
  }

  return (
    <>
      <Header />
      <div className='hero'>
          <h1>Manage <br /> Your recipe with ToBuy</h1>
          <p>A Place to manage your recipes, add to it, modify it and get a list of items for a perfect meal</p>

          <form onSubmit={searchHandler}>
              <input type="text" placeholder='Search Recipe' onChange={inputHandler} required value={input} list='coinlist'/>
              
              <button type='submit'>Search</button>
          </form>
      </div>

      {userDetails ? (
        <div className='Home-list'>
          <h2>Welcome {userDetails.first}! Hope you are Hungry🍔🍔</h2>
          <div>
            {(userDetails.recipes.length===0) ? (
              <div className='home-empty'>
                <h3 className='Home-conditional-heading'>Nothing here! Let's first add Something</h3>
                <a href="/addItem"><button>Add Recipe</button></a>
              </div>
            ): (<ul>
              {userDetails.recipes.map((item, index) => (
                <li key={index}>
                  <div>
                    <Card name={item.name} steps={item.desc} ingredients={item.ingredients} index={index}/>
                  </div>
                </li>
              ))}
            </ul>)
            }
            
          </div>
        </div>
      ) : (
        <div className='spinner'>
          <div className="spin"></div>
        </div>
      )}
      {/* <Footer /> */}
    </>
  )
}

export default Home