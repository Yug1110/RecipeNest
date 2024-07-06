import React from 'react'
import { auth, db } from '../firebase'
import { doc, getDoc } from "firebase/firestore"

function Header() {

    async function handleLogout() {
        try {
          await auth.signOut();
          window.location.href = "/login";
          console.log("User logged out successfully!");
        } catch (error) {
          console.error("Error logging out:", error.message);
        }
    }

  return (
    <>
    <div className="navbar">
        <a href="/home"><p>RecipeNest</p></a>
        <div className="options">
          <a href="/addItem"><div className="option">
              Add New Recipes
          </div></a>
          <a href="/selectedRecipes"><div className="option">
              Selected Items
          </div></a>
          <a href="/shoppingList"><div className="option">
              What to Shop!!
          </div></a>
        </div>
        <button className='log-out-button' onClick={handleLogout} >LogOut</button>
    </div>
    </>
  )
}

export default Header