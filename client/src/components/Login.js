import React from 'react'

const Login = () => {
  return (
    <div>
      <div className="box">
                <form method='POST' className='register-form' id='register-form'>

                    <label for="email">Email</label>
                    <input type="text" className="form-control w-25 mb-3" id="email" placeholder="Your Email" />

                    <label for="pwd">Password</label>
                    <input type="text" className="form-control w-25 mb-2" id="pwd" placeholder="Your Password" />

                    <input className="btn btn-primary" type="submit" value="Login"></input>
                </form>
            </div>
    </div>
  )
}

export default Login
