import React, { useState} from 'react';
import {ToastContainer,toast} from 'react-toastify';
import { useNavigate, NavLink } from 'react-router-dom';
import Spinner from './Spinner';
import '../loginstyle.css';
import 'react-toastify/dist/ReactToastify.css';

const Forgotpassword = () => {

  const [spin,setSpin] = useState(false);

  const navigateTo = useNavigate();

  const [user, setUser] = useState({
    email: ""
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
    const { email} = user;

    try {
      const res = await fetch("/forgotPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        //because server doesn't understand json, it has to be string
        body: JSON.stringify({
          email
        })
      });
  
      //parses the text as json, which was string earlier as we just saw
      const data = await res.json();
  
      if (res.status === 201) {
        setTimeout(()=>{
          setSpin(false);
        },500);

        setTimeout(()=>{
          toast.success("Email sent successfully!");
        },800);
        
        setTimeout(()=>{
          navigateTo("/login");
        },2500);
        
      } else{
        setTimeout(()=>{
          setSpin(false);
        },500);
  
        setTimeout(()=>{
          toast.error(data.message);
        },800);
      }
      setUser({
        email:""
      });  
    } catch (error) {
      setSpin(false);
      console.log(error);
    }
  }


  return (
    <div>
     
     {
     spin && <center style={{marginTop:"100px"}}><Spinner/></center>
     }
    
     {
      !spin && <div className="container">
        <div className="form-container" id="login-form" style={{marginTop:"200px"}}>
          <center><h1 style={{inlineSize: "350px",backgroundColor:"#84B0B0",border:"2px solid",color:"black",borderColor:"#888A8A"}}>Reset Password</h1></center>
          <form>
            <label htmlFor="email">Email<sup style={{color:"red"}}>*</sup></label>
            <input type="email" id="email" name="email" required value={user.email} onChange={handleInputs}/>
          
                <button type="submit" value="Email" onClick={PostData}>Send email</button> 

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
              <p>Go back to Login page? 
                <NavLink to='/login' id="signup-link" style={{color:"#769696"}}> <u>Login</u></NavLink>
                </p>
        </div>
      </div>
      }
    </div>
        )
}

export default Forgotpassword
