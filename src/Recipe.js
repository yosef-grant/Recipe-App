import React from 'react';
import style from './recipe.module.css';

const Recipe = ({title, calories, image, ingredients, time}) => {
    return (
            
            <div className={style.recipe}>  {/* note the notation is different for introducing modular styles*/}
                <div className={style.dish}>
                <h1>{title}</h1> 
                <h2 className={style.ingredientHeading}>Ingredients:</h2>
                <ul>{ingredients.map((ingredient, index) => (  // because ingredients is given by the API as an array, it requires mapping here to get a list of separate ingredients
                   <li key={index}>{ingredient.text}</li>  
                ))}</ul>
                </div>
                <div className={style.info}>
                <p><span className={style.bold}>Calories</span><br/>{Math.floor(calories)}</p>
                <p><span className={style.bold}>Total Time</span><br/>{time} mins</p>
                </div>
                <img src={image} className={style.image} alt=""/>

            </div>

    )
}

export default Recipe;