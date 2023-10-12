import './App.css';
import Body from './components/mainComponents/Body';
import Header from './components/mainComponents/Header';
import Footer from './components/mainComponents/Footer';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import MainNeLe from './components/mainComponents/MainNeLe';
import MyAccount from './components/mainComponents/MyAccount';
import NewRecipeForm from './components/mainComponents/NewRecipeForm';
import RandomMenu from './components/mainComponents/RandomMenu';
import PublicRecipeList from './components/mainComponents/PublicRecipeList';

// window.onload = () => {
//   window.localStorage.removeItem('auth_token')
// }

function App() {
  return (
      <div>
      <Router>

      <Header />
      
      <Body className='body' body={
          <Routes>
          
          <Route path='' Component={MainNeLe}></Route>
          <Route path='/MyAccount' Component={MyAccount}></Route>
          <Route path='/getAll' Component={PublicRecipeList}></Route>
          <Route path='/randomMenu' Component={RandomMenu}></Route>
          <Route path='/addRecipe' Component={NewRecipeForm}></Route>

        </Routes>
      }/>
      <Footer />
      </Router>
      </div>
    );
  }
  
  export default App;
  
