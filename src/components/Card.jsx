import React from 'react'
import food1 from "../assets/food1.jpg"
import food2 from "../assets/food2.jpg"
import food3 from "../assets/food3.jpg"
import food4 from "../assets/food4.jpg"
import food5 from "../assets/food5.jpg"
import food6 from "../assets/food6.jpg"
import food7 from "../assets/food7.jpg"
import food8 from "../assets/food8.jpg"
import food9 from "../assets/food9.jpg"
import { useContext } from 'react'
import { SelectedContext } from '../context/SelectedContext'

function Card({name, steps, ingredients, index}) {

    const {selectedRecipes, setSelectedRecipes, shoppingList, setShoppingList}= useContext(SelectedContext);

    const handleAdding = ()=>{
        setSelectedRecipes([...selectedRecipes,name])
        let newArray=[...shoppingList,...ingredients]
        newArray=[...new Set(newArray)]
        setShoppingList(newArray)
    }

    const images = [food1, food2, food3, food4, food5, food6, food7, food8, food9]

  return (
    <div className='card-container'>
        <img src={images[index]} alt={index}/>
        <h3>{name}</h3>
        <hr />
        <ol>
            {steps.map((step, ind)=>(
                <li key={ind}>{step}</li>                
            ))}
        </ol>

        <hr />
        <h4>You'll require: </h4>
        <ul>
            {ingredients.map((step, ind)=>(
                <li key={ind}>{step}, </li>                
            ))}
        </ul>
        <button onClick={handleAdding}>Add to your meal plan</button>
    </div>
  )
}

export default Card