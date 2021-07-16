import '../styles/auth.css';
import axios from 'axios';
import React, {useState} from 'react'
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import {isName} from '../functions/isName'
import {isEmail} from '../functions/isEmail'
import {isPassword} from '../functions/isPassword'


function Signup(props) {

  const [currentUsername, setCurrentUsername ] = useState('')
  const [currentEmail, setCurrentEmail ] = useState('')
  const [currentPassword, setCurrentPassword ] = useState('')
  const [error, setError] = useState('')

  const history = useHistory()

  const toSignin = () => {
    history.push('/signin')
  }
    
  const click = () => {
    console.log(isName('qwe123qwe'))
  }

  const submit = () => {
    // axios.get(`http://localhost:1337/categories`)
    //   .then(res => {
    //     console.log(res.data);
    //   })
    // create user
    if(isEmail(currentEmail) && isName(currentUsername) && isPassword(currentPassword)){
        axios
      .post('http://localhost:1337/auth/local/register', {
        username: currentUsername,
        email: currentEmail,
        password: currentPassword,
      })
      .then(response => {
        props.setMyJwt(response.data.jwt)
        history.push('/signin')
      })
      .catch(error => {
        setError('Something went wrong, we are so soryyyy!!!')
        console.log('An error occurred:', error.response);
      });
    } else if(isName(currentUsername) == false){
      setError('Username is invalid, should be 5 characters at least')
    } else if(isEmail(currentEmail) == false) {
      setError('Email is invalid')
    } else if(isPassword(currentPassword) == false){
      setError('Password is invalid, at least 8 characters (big and small letters and numbers)')
    }


    // login

  // axios
  // .post('http://localhost:1337/auth/local', {
  //   identifier: 'test@test.com',
  //   password: 'Password',
  // })
  // .then(response => {
  //   console.log('User profile', response.data.user);
  //   console.log('User token', response.data.jwt);
  // })
  // .catch(error => {
  //   console.log('An error occurred:', error.response);
  // });

  // axios.get('http://localhost:1337/categories', {
  //   headers: {
  //     Authorization:
  //       'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI1NTgxNzQ4LCJleHAiOjE2MjgxNzM3NDh9.RBehxk-UNwXFcxpktBw5EF8vxhm_9yQoYMG7Dx5k6dA',
  //   },
  // }).then(response => {
  //   console.log(response)
  // }).catch(error => {
  //   console.log('An error occurred:', error.response);
  // });

}



  return (
    <div className="login-box">
      <h2 onClick={click}>Signup</h2>
      <form>
        <div className="user-box">
          <input onChange={(event) => setCurrentUsername(event.target.value)} value={currentUsername} type="text" name required />
          <label>Username</label>
        </div>
        <div className="user-box">
          <input onChange={(event) => setCurrentEmail(event.target.value)} value={currentEmail} type="text" name required />
          <label>Email</label>
        </div>
        <div className="user-box">
          <input onChange={(event) => setCurrentPassword(event.target.value)} value={currentPassword} type="password" name required />
          <label>Password</label>
        </div>
        <div className='error'>
          {error}
        </div>
        <div className="user-box-flex">
            <a onClick={submit} className='user-box-flex_button'>
            <span />
            <span />
            <span />
            <span />
            Submit
            </a>
            <a onClick={toSignin} className='user-box-flex_button'>
            <span />
            <span />
            <span />
            <span />
            Signin
            </a>
        </div>
        
      </form>
  </div>
  );
}

Signup.propTypes = {
  setMyJwt: PropTypes.func
}

export default Signup;
