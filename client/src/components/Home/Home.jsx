import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getRecipes, filterRecipesByDiets, filterCreated, orderByHealth, orderByName } from "../../redux/actions/index";
import { Link } from "react-router-dom";
import Card from '../Card/Card';
import Paginado from '../Paginado/Paginado';
import SearchBar from '../SearchBar/SearchBar';
import '../Home/HomeStyle.css'
import {IoMdArrowDropdown} from 'react-icons/io';

export default function Home(){
    const dispatch = useDispatch()
    const allRecipes = useSelector ((state) => state.recipes) //con esta constante traeme todos los que esta en el estado de las recetas. El useSelector es lo mismo que hacer el mapStatetoProps
    const [currentPage, setCurrentPage] = useState(1) //useState es para estados locales, empieza en 1 porque siempre voy arrancar en 1 mis paginas
    const [RecipesPerPage, setRecipePerPage] = useState(9) //cuantos personajes quiero yo por pagina. 
    
    const [orden, setOrden] = useState('')

    const indexOfLastRecipe = currentPage * RecipesPerPage //en un principio sera 6
    const indexOfFirstRecipe = indexOfLastRecipe - RecipesPerPage
    const currentRecipe = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe) //te divide un array dependiendo lo que este pasando por parametro

    const paginado = (pageNumber) =>{ //me ayuda al renderizado
        setCurrentPage(pageNumber)
    }

    useEffect(()=>{
        dispatch(getRecipes()) //este dispatch es lo mismo que hacer el mapDispatchToProps. 
    }, [dispatch]) //el array es para que no se llame la funcion de forma infinita. 


    function handleClick(e){ //para resetear las recetas
        e.preventDefault(); //para que no se rompa
        dispatch(getRecipes());
    }

    function handlerFilteredByDiets(e){
        e.preventDefault();
        dispatch(filterRecipesByDiets(e.target.value)) //tomara lo que clickea el usuario
        setCurrentPage(1);
    }

    function handlerFilteredCreated(e){
        e.preventDefault();
        dispatch(filterCreated(e.target.value)) //recordar esto es el payload lo del select
    }

    function HandlerOrderByName(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden (`Ordenado ${e.target.value}`)
    }

    function HandlerOrderByHealth(e){
        e.preventDefault();
        dispatch(orderByHealth(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    return (
        
    <div className='DivHome'>
            <h1 id='h1Home'>RECIPES FOR</h1>
            <h1 id='h2Home'>YOUR WELL-BEING</h1>
        <SearchBar />
            <div> 
            <button className='buttonAll' onClick={e => {handleClick(e)}}>
            Load all recipes
            </button>
    <select className="selectStyle" onChange={e=>HandlerOrderByName(e)} >
        <option disabled>(Select by name)</option> 
        <option value="asc">Name (A-Z) </option>
        <option value="desc">Name (Z-A)</option>
    </select>
    <span className="iconStyle">
    <IoMdArrowDropdown />
</span>

    <select className="selectStyle" onChange={e=>HandlerOrderByHealth(e)}>
        <option value="healthScoreAll" >(All by Health Score) </option>
        <option value="healthScoreAsc">Ascending Health Score</option>
        <option value="healthScoreDesc">Descending Health Score</option>
    </select>
    <span className="iconStyle">
    <IoMdArrowDropdown />
</span>


    <select className="selectStyle" onChange={e=>handlerFilteredByDiets(e)}>
        <option value='All'>(All Recipes)</option>
        <option value='gluten free'>Gluten free</option>
        <option value='dairy free"'>Dairy free</option>
        <option value='ketogenic'>Ketogenic</option>
        <option value='lacto ovo vegetarian'>Lacto ovo vegetarian</option>
        <option value='vegan'>Vegan</option>
        <option value='pescatarian'>Pescatarian</option>
        <option value='paleolithic'>Paleolithic</option>
        <option value='primal'>Primal</option>
        <option value='fodmap friendly'>Fodmap friendly</option>
        <option value='whole 30'>Whole 30</option>
    </select>
    <span className="iconStyle">
    <IoMdArrowDropdown />
</span>


    <select className="selectStyle" onChange={e=>handlerFilteredCreated(e)}>
        <option value='All'>(Todos)</option>
        <option value='Created'>Creados</option>
        <option value='Api'>Existentes</option>
    </select>
    <span className="iconStyle">
    <IoMdArrowDropdown />
</span>

</div>
            {currentRecipe?.map((el) =>{ //este signo de pregunta es para preguntar si existe primeor y despues lo mapea
            return (
                <div className= 'cartas'>
                    <Link to={"/detail/"+ el.id}>
                        <Card name={el.name} image={el.image} diets={el.diets}/>
                    </Link>
                </div>
            )
        })}

        <Paginado 
        RecipesPerPage={RecipesPerPage}
        allRecipes={allRecipes.length}
        paginado = {paginado}
        /> 
    </div>
    )
}