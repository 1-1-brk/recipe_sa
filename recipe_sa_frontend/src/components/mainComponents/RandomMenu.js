import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { request } from '../../axios_helper';
import { authActions } from '../../store/auth-Slice';
import { commonActions } from '../../store/common-Slice';

function RandomMenu() {
  const [menu, setMenu] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState({});

  const dispatch = useDispatch();
  const randomMenu = useSelector(state => state.common.randomMenu)
  // const br = useSelector(state => state.common.breakfast)

  const [breakfast, setBreakfast] = useState();
  const [lunch, setLunch] = useState();
  const [dessert, setDessert] = useState();
  const [dinner, setDinner] = useState();
  
  // const stateBreakfast = useSelector(state => state.common.breakfast)

  useEffect(
    () => {
      if (menu.length > 0){
        setSelectedMenu(createRecToCatMap(menu))
        const br = menu.filter((recipe) => recipe.category === 'Breakfast');
        // dispatch(commonActions.setBre(br))
        setBreakfast((breakfast) => breakfast = br);
        setLunch(menu.filter((recipe) => recipe.category === 'Lunch'))
        setDessert(menu.filter((recipe) => recipe.category === 'Dessert'))
        setDinner(menu.filter((recipe) => recipe.category === 'Dinner'))

        console.log('useEffect in random menu executed', selectedMenu)
    }
  },
    [menu]
  )

  // function getBreakfast(){
  //     return menu.filter((recipe) => recipe.category === 'Breakfast')
  // }
  // function getLunch(){
  //     return menu.filter((recipe) => recipe.category === 'Lunch')
  // }
  // function getDessert(){
  //     return menu.filter((recipe) => recipe.category === 'Dessert')
  // }
  // function getDinner(){
  //     return menu.filter((recipe) => recipe.category === 'Dinner')
  // }

  function getRandomMenu(){
    // console.log('dispatched: ' , commonActions.getBreakfast())
    request(
      'GET',
      '/api/getRandomMenu',
      {}
    ).then(
      (response) => {
      console.log('got random Menu: ', response.data)
      setMenu(() => response.data);
      dispatch(commonActions.setRandomMenu(response.data))
    }
    ).catch(
      (err) =>
      console.log('fetching random menu gone wrong')
    )
    
  }

function createRecToCatMap(recList){
  const map = {};
  recList.forEach((e) => {
    map[e.category.toLowerCase()] = e;
    }
  )
  return map
}

  return (

    <div>
      <h3>Here you can choose Random Menu for the day</h3>
      <button onClick={getRandomMenu}>generate menu suggestion</button>
      {(selectedMenu !== null) &&
        
        <>
        <div>
          {selectedMenu.breakfast && 
          (<>
            <div className="card recipe-card">  
              <div className="card-body">
                <h5 className="card-title">breakfast would be: {selectedMenu.breakfast.name}</h5> 
                <h6 className="card-subtitle mb-2 text-muted">Cook time: {selectedMenu.breakfast.cook_time}</h6>
                <p className="card-text">{selectedMenu.breakfast.instructions}</p>
              </div>
            </div>
          </>)
          }
        </div>
        <div>
          {selectedMenu.lunch && 
          <>
            <div className="card recipe-card">  
              {/* <img src="..." class="card-img-top" alt="..."> */}
              <div className="card-body">
                <h5 className="card-title">lunch would be: {selectedMenu.lunch.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Cook time: {selectedMenu.lunch.cook_time}</h6>
                <p className="card-text">{selectedMenu.lunch.instructions}</p>
              </div>
            </div>
          </>
          }
        </div>
        <div>
          {selectedMenu.dessert && 
          <>
            <div className="card recipe-card">  
              {/* <img src="..." class="card-img-top" alt="..."> */}
              <div className="card-body">
              <h5 className="card-title">dessert would be: {selectedMenu.dessert.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Cook time: {selectedMenu.dessert.cook_time}</h6>
                <p className="card-text">{selectedMenu.dessert.instructions}</p>
              </div>
            </div>
          </>
          }
        </div>
        <div>
          {selectedMenu.dinner && 
          <>
            <div className="card recipe-card">  
              {/* <img src="..." class="card-img-top" alt="..."> */}
              <div className="card-body">
              <h5 className="card-title">dinner would be: {selectedMenu.dinner.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Cook time: {selectedMenu.dinner.cook_time}</h6>
                <p className="card-text">{selectedMenu.dinner.instructions}</p>
              </div>
            </div>
          </>
          }
        </div>
        </>
        
      }
    </div>
  )
}

export default RandomMenu
