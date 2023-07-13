import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Login = (props) => {

  const navigateTo = useNavigate();

  const [user,setUser] = useState({
    email:"",
    pwd:""
  });

  let name,value;
  //let, because it will get changed all the time
  const handleInputs = (e) =>{
    name=e.target.name;
    value=e.target.value;
    setUser({ ...user, [name]: value });
  }

  const PostData = async (e) =>{
    e.preventDefault();
    const {email,pwd} = user;

    const res= await fetch("/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      //because server doesn't understand json, it has to be string
      body: JSON.stringify({
        email,pwd
      })
    });

    //parses the text as json, which was string earlier as we just saw
    const data=await res.json();

    if(data.status === 422 || !data){
      window.alert("Invalid login!!");
    }else{
      window.alert("valid login!!");
      localStorage.setItem("TOKEN",data.token);
      props.setAuth(data.token);
      navigateTo("/");
    }
  }


  return (
    <div>
      <div className="box">
                <form method='POST' className='register-form' id='register-form'>

                    <label for="email">Email</label>
                    <input type="text" className="form-control w-25 mb-3" id="email" placeholder="Your Email" name='email' value={user.email} onChange={handleInputs}/>

                    <label for="pwd">Password</label>
                    <input type="text" className="form-control w-25 mb-2" id="pwd" placeholder="Your Password" name='pwd' value={user.pwd} onChange={handleInputs}/>

                    <input className="btn btn-primary" type="submit" value="Login" onClick={PostData}/>
                </form>
            </div>
    </div>
  )
}

export default Login
