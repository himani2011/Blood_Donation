import React, { useState, useContext, useEffect } from 'react';
import {ToastContainer,toast} from 'react-toastify';
import { useNavigate, NavLink } from 'react-router-dom';
import noteContext from '../context/notes/NoteContext';
import Spinner from './Spinner';
import '../loginstyle.css';
import 'react-toastify/dist/ReactToastify.css';

const Login = (props) => {

  const [spin,setSpin] = useState(false);
  const a = useContext(noteContext);

  const navigateTo = useNavigate();

  const [user, setUser] = useState({
    email: "",
    pwd: ""
  });

  let name, value;
  //let, because it will get changed all the time
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  }

  const PostData = async (e) => {
    e.preventDefault();
    setSpin(true);
    const { email, pwd } = user;


    try {

      const res = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        //because server doesn't understand json, it has to be string
        body: JSON.stringify({
          email, pwd
        })
      });
  
      //parses the text as json, which was string earlier as we just saw
      const data = await res.json();
  
      if (res.status === 201) {

        setTimeout(()=>{
          setSpin(false);
        },500);

        setTimeout(()=>{
          localStorage.setItem("TOKEN", data.token);
          props.setAuth(data.token);
          toast.success("Login successful");
        },800);
        
        setTimeout(()=>{
          navigateTo("/");
        },2500);
        
      } else if(!email||!pwd){
        setSpin(false);
        toast.error("Please fill all the details!");
    }
    else{
        setTimeout(()=>{
          setSpin(false);
        },500);
  
        setTimeout(()=>{
          toast.error("Invalid Credentials! Please try again!");
        },800);
      }
      setUser([]);
      
    } catch (error) {
      setSpin(false);
      console.log(error);
    }
  }

  useEffect(() => {
    a.update();
  }, [])


  return (
    <div>
        {/* This is use of useContext {a.state.name} */}
     
     {
     spin && <center style={{marginTop:"100px"}}><Spinner/></center>
     }
    
     {
      !spin && <div className="container">
        <div className="form-container" id="login-form" style={{marginTop:"20px"}}>
          <h1>Login</h1>
          <form>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" required value={user.email} onChange={handleInputs} />
              <label htmlFor="pwd">Password</label>
              <input type="password" id="pwd" name="pwd" required value={user.pwd} onChange={handleInputs}/>
                <button type="submit" value="Login" onClick={PostData}>Login</button>
                <ToastContainer
                 position="top-center"
                 autoClose={2000}
                 newestOnTop
                 closeOnClick={true}
                 rtl={false}
                 draggable
                 pauseOnHover={false}
                 theme="dark"/>
          </form>
              <p>Don't have an account ? 
                <NavLink to='/osignup' id="signup-link"> <u>Organization</u></NavLink> or 
                
                <NavLink to='/dsignup' id="signup-link"> <u>Donar</u></NavLink> 
                </p>
        </div>
      </div>
      }
    </div>
        )
}

        export default Login
