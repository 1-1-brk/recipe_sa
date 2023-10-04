import React, { useState } from 'react';
import classNames from 'classnames'


export default class LoginForm extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      active: 'login',
      // firstName: '',
      // lastName: '',
      username: '',
      password: '',
      email: '',
      onLogin: props.onLogin,
      onRegister: props.onRegister
    }
  }

  onChangeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value
    this.setState({[name] : value});
  }

  onSubmitLogin = (e) => {
    this.state.onLogin(
      e,
      this.state.username, 
      this.state.password
    )
  }

  onSumbitRegister = (e) => {
    this.state.onRegister(
      e,
      this.state.username,
      this.state.password,
      this.state.email
    )
  }





  render (){
    return (
      <div className = 'row justify-content-center'>
        <div className = 'col-4'>
          <ul className='nav nav-pills nav-justified mb-3' id='ex1' rol='tablist'>
          
          <li className='nav-item' role='presentation'>
            <button className={classNames('nav-link', this.state.active === 'login' ? 'active' : '')} id='tab-login' onClick={() => this.setState({active : 'login'})}>Login</button>
          </li>
          <li className='nav-item' role='presentation'>
            <button className={classNames('nav-link', this.state.active === 'register' ? 'active' : '')} id='tab-register' onClick={() => this.setState({active : 'register'})}>Register</button>
          </li>
          </ul>

          <div className='tab-content'>
            <div className={classNames('tab-pane', 'fade', this.state.active === 'login' ? 'show active' : '')}>
              <form onSubmit={this.onSubmitLogin}>
                <div className='form-outline mb-4'>
                  <input placeholder='enter "t"' type='login' id='loginName' name='username' className='form-control' onChange={this.onChangeHandler}/>
                  <label className='form-label' htmlFor='loginName'>Username</label>
                </div>
                <div className='form-outline mb-4'>
                  <input placeholder='enter "t"' type='password' id='loginPassword' name='password' className='form-control' onChange={this.onChangeHandler}/>
                  <label className='form-label' htmlFor='loginPassword'>Password</label>
                </div>

                <button type='submit' className='btn btn-primary btn-block mb-4'>Sign in</button>
              </form>
            </div>



            <div className={classNames('tab-pane', 'fade', this.state.active === 'register' ? 'show active' : '')}>
              <form onSubmit={this.onSumbitRegister}>
                <div className='form-outline mb-4'>
                  <input type='text' id='registerName' name='username' className='form-control' onChange={this.onChangeHandler}/>
                  <label className='form-label' htmlFor='registerName'>register Username</label>
                </div>
                <div className='form-outline mb-4'>
                  <input type='text' id='registerPassword' name='password' className='form-control' onChange={this.onChangeHandler}/>
                  <label className='form-label' htmlFor='registerPassword'>register Password</label>
                </div>
                <div className='form-outline mb-4'>
                  <input type='text' id='registerPassword' name='email' className='form-control' onChange={this.onChangeHandler}/>
                  <label className='form-label' htmlFor='registerPassword'>register Email</label>
                </div>

                <button type='submit' className='btn btn-primary btn-block mb-4'>Sign up</button>
              </form>
            </div>
          </div>


        </div>
      </div>
    );
  };

}
















































// async function loginUser(credentials){
//     try{
//         return await axios.post(`${BASE_URL}/x-login`, credentials)
//     } 
//     catch (error) {
//         console.error('Error logging in:', error);
//     }
// }

// export default function Login({ setToken }) {

//     const [username, setUserName] = useState();
//     const [password, setPassword] = useState();

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const response = await loginUser({
//             username,
//             password
//         });
//         if (response.status === 201){
//             // !!!!!!!!!!!! ??????????????
//             setToken(response.data)
//         }

        
//     }

//   return(
//     <div className="login-wrapper">
//       <h1>Please Log In</h1>
//       <form>
//         <label>
//           <p>Username</p>
//           <input type="text" onChange={(e) => setUserName(e.target.value)}/>
//         </label>
//         <label>
//           <p>Password</p>
//           <input type="password" onChange={(e) => setPassword(e.target.value)}/>
//         </label>
//         <div>
//           <button type="submit">Submit</button>
//         </div>
//       </form>
//     </div>
//   )
// }

// Login.propTypes = {
//   setToken: PropTypes.func.isRequired
// } 