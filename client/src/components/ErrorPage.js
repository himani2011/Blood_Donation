import React from 'react';
import { NavLink } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div>
     <div className='box'>
      <h1 className='pt-5' style={{color:"black"}}>404 page couldn't be found!!</h1><br/><br/>
      <center><NavLink to='/' style={{color:"blue"}}>Go to Homepage</NavLink></center>
    </div>
    </div>
  )
}

export default ErrorPage
