import { createContext, useState } from "react";

export const SelectedContext = createContext();

const SelectedContextProvider = (props) => {
    const [selectedRecipes, setSelectedRecipes] = useState([]);
    const [shoppingList, setShoppingList] = useState([]);

    const contextValue = {
        selectedRecipes, 
        setSelectedRecipes, 
        shoppingList, 
        setShoppingList
    };

    return (
        <SelectedContext.Provider value={contextValue}>
            {props.children}
        </SelectedContext.Provider>
    );
};

export default SelectedContextProvider;
