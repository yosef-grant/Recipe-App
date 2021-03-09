import React, {useEffect, useState} from 'react';  // effect runs each time the page renders
import './App.css';
import Recipe from './Recipe';
import searchIcon from './assets/search-icon.png'


const App = () => {

  const id = process.env.REACT_APP_ID;  // this is the id for the API from EDAMAM.com
  const key = process.env.REACT_APP_KEY; // this is the key for the API from EDAMAM.com
  const URL = 'https://api.edamam.com/search?q='
  // const exampleReq = `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`           
                                                                                                               /*  
                                                                                                                  the 'q' after search? is the query. 
                                                                                                                  this is the keyword that will be used   
                                                                                                                  to search with. Putting the URL in backticks 
                                                                                                                  instead of inverted commas allows insertion 
                                                                                                                  of custom key and ID variables and the query itself.   
                                                                                                              */
  
  // const [counter, setCounter] = useState(0);          
  
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");  // a search funtion is now present in state
  const [query, setQuery] = useState("");  // this can be inserted into the API url. additionally, putting the query in state will let it be used by the app to search for whole terms, rather than useEffect fetching data for each letter typed


  useEffect(() => {
    getRecipes();  // results mentioning the query will now appear in the console in the form of an object which can be used to pinpoint data for the component to render
  /*console.log("effect run successfully")*/
  },[query]);  /* the array as a second argument tells the effect to only run once when the component mounts, thereby preventing a call being run each time the component renders.
                  entering particular elements into this array will cause the effect to be run each time that element is interacted with. query is entered here to ensure effect 
                  runs only once a submit request has been made on the form buttoon  */


  const getRecipes = async() => {  // the function performs asynchronously
    const response = await fetch(`${URL}${query}&app_id=${id}&app_key=${key}`)  // since the API response is not instant, the await keyword is needed before the fetch command. the query from state is now used as the search query.
    const data = await response.json(); // this converts the data from the fetch request into a useable format; again, await is required here as the response is not instant
   console.log(data.hits)
    setRecipes(data.hits);  // this argument pinpoints the hits from the API object
  
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);  // referring back to the state
   
    //console.log(search)
  }


  const getSearch = (e) => {
    e.preventDefault();  // stops the page reloading once the submit button is pressed
    setQuery(search); // set manually for testing
    setSearch("");  // reset the input to an empty string rather than having the previous search term remain in place. comment out to see opposite effect.
  }

  return (
    <div className="App">

     {/*<h1 onClick={() => setCounter(counter + 1)}>hello {counter}</h1>*/}
     <form className="search-form" onSubmit={getSearch}>  {/* this utilises the completed query from state, and on clicking will perform the API search request*/}
        <input type="text" className="search-bar" placeholder="Search for a recipe..." value={search} onChange={updateSearch}/>
          <button className="search-button" type="submit" ><img src={searchIcon} alt='search icon' className='search-icon' /></button>  
     </form>
     <div className="recipes">
     {recipes.map(({recipe, index}) => (  // this maps over the search API array to find 'recipe'
       <Recipe    
                  key={index}
                  title={recipe.label} // the mapped array recipe ==> recipe object key ==> label data key 
                  calories={recipe.calories} 
                  image={recipe.image}
                  ingredients={recipe.ingredients}
                  time={recipe.totalTime}
                  />  // these props can now be passed to the 'Recipe' component
                  
       ))} </div>
    </div>
  );
}

export default App;