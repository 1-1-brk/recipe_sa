import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { setNewHost } from '../../axios_helper';

function Header() {

    const loggedIn = useSelector(state => state.auth.isLoggedIn);

    const logoBgColor = loggedIn ? '#baeabe' : '#ff9d9d';

    const imageUrl = `${process.env.PUBLIC_URL}websiteImgs/recipe-icon-png-16.jpg.png`;
    // const altImg = `${process.env.PUBLIC_URL+ALT_IMG}`;
    const altImg = `https://media4.giphy.com/media/xTiN0mKP2Am8PuQW0U/source.gif`;

    // const [host, setHost] = useState()

    
    // console.log('path:' , altImg)
  return (
    // <Router>

    <div className='navbar-header' >
        <Link to='/'>
            <img className='headerLogo' src={imageUrl} alt={altImg} />
        </Link>
        {/* <input type='text' placeholder="set new host" id="newHost"
        onChange={(e)=>setNewHost(e.target.value)}></input> */}
      <nav className='site-nav-container'>
        <ul className='site-nav'>
            <li className='list-item'>
                <Link to='/getAll' className='navbar-link' title='Recipes' >
                    <span>
                        <em className='navbar-text'>Recipes</em>
                    </span>
                </Link>
            </li>
            <li className='list-item'>
                <Link to='/addRecipe' className='navbar-link' title='Add Recipe' >
                    <span>
                        <em className='navbar-text'>Add Recipe</em>
                    </span>
                </Link>
            </li>
            <li className='list-item'>
                <Link to='/randomMenu' className='navbar-link' title='Random Choice'>
                    <span>
                        <em className='navbar-text'>Random Menu</em>
                    </span>
                </Link>
            </li>
            <li className='list-item'>
                <Link to='/MyAccount' className='navbar-link' title='MyAccount'>
                    <span>
                        <em className='navbar-text' style={{color : logoBgColor}}>MyAccount</em>
                    </span>
                </Link>
            </li>
        </ul>
      </nav>
    </div>
    // </Router>

  )
}

export default Header
