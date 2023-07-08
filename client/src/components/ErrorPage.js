import React from 'react';
import { NavLink } from 'react-router-dom';

const ErrorPage = () => {
  return (
     <div className='box'>
      <h1 className='pt-5'>404 page couldn't be found!!</h1><br/><br/>
      <NavLink to='/'>Go to Homepage</NavLink>
    </div>
  )
}

export default ErrorPage
