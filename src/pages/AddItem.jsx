import React, { useState } from 'react'
import { auth, db } from "../firebase";
import { getDoc, setDoc, doc } from "firebase/firestore";
import Header from '../components/Header';


function AddItem() {

    const [name, setName] = useState("");
    const [desc, setDesc] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [input, setInput] = useState("");
    const [input2, setInput2] = useState("");

    const [userDetails, setUserDetails] = useState(null);
    const [recipes, setRecipes] = useState([])


    const handleAddIngredient = () => {
        if (input.trim() !== '') {
            setIngredients([...ingredients, input]);
            setInput('');
        }
        console.log(ingredients);
    };

    const deleteItem = (index) => {
        const updatedItems = [...ingredients];
        updatedItems.splice(index, 1);
        setIngredients(updatedItems);
    };

    const handleAddStep = ()=>{
      if (input2.trim() !== '') {
          setDesc([...desc, input2]);
          setInput2('');
      }
      console.log(desc);
    }

    const deleteStep = (index) => {
      const updatedItems = [...desc];
      updatedItems.splice(index, 1);
      setDesc(updatedItems);
  };

    const handleImageChange = (e) =>{
        console.log(e.target.files);
        setImage(URL.createObjectURL(e.target.files[0]));
    };

  const fetchUserData = async () => {
    return new Promise((resolve, reject) => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const docRef = doc(db, 'Users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserDetails(docSnap.data());
            resolve(docSnap.data());
          } else {
            console.log('User document not found');
            reject('User document not found');
          }
        } else {
          console.log('User is not logged in');
          reject('User is not logged in');
        }
      });
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await fetchUserData();

      const newObject = {
        name: name,
        desc: desc,
        ingredients: ingredients,
      }

      const updatedRecipes = [...userData.recipes, newObject];
      setRecipes(updatedRecipes);

      const docRef = doc(db, 'Users', auth.currentUser.uid);
      await setDoc(docRef, { recipes: updatedRecipes }, { merge: true });

      console.log('Recipe list updated successfully');

      window.location.href = "/home"
    } catch (error) {
      console.error('Error updating recipe list:', error);
    }
  };

  return (
      <>
          <Header />

          <div className='add-form-container'>
              <form onSubmit={handleSubmit}>
                  <div className='add-input'>
                      <label>Name of the recipe</label>
                      <input type="text" required value={name} onChange={(e) => setName(e.target.value)} />
                  </div>


                  <div className='add-input'>
                      <label>Steps</label>
                      <input type="text" placeholder='Next Step...' value={input2} onChange={(e) => setInput2(e.target.value)} />
                      <button type="button" onClick={handleAddStep} className='add-ingre'>Add Step</button>
                  </div>

                  <div className='ingreList'>
                    <ol>
                      {desc.map((item, index) => (
                          <li key={index} className='ingre'>
                              {item}
                              <button onClick={() => deleteStep(index)} className='add-delete'>Delete</button>
                          </li>
                      ))}
                      </ol>
                  </div>

                  <div className='add-input'>
                      <label>Ingredients</label>
                      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
                      <button type="button" onClick={handleAddIngredient} className='add-ingre'>Add Ingredient</button>
                  </div>

                  <div className='ingreList'>
                      {ingredients.map((item, index) => (
                          <div key={index} className='ingre'>
                              {item}
                              <button onClick={() => deleteItem(index)} className='add-delete'>Delete</button>
                          </div>
                      ))}
                  </div>

                      <button type='submit' className='adding-recipe'>Add Recipe</button>
              </form>
          </div>
      </>
  );
}

export default AddItem