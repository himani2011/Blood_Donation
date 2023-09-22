import React, { useState} from 'react';
import {ToastContainer,toast} from 'react-toastify';
import { useNavigate, NavLink, useParams } from 'react-router-dom';
import Spinner from './Spinner';
import '../loginstyle.css';
import 'react-toastify/dist/ReactToastify.css';

const Resetpassword = () => {

  const [spin,setSpin] = useState(false);
  const {id} = useParams();
  console.log(id)

  const navigateTo = useNavigate();

  const [user, setUser] = useState({
    pwd: "",
    cpwd:""
  });

  let name, value;
  //let, because it will get changed all the time
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  }

  const handlePasswords = (e) => {
    name = e.target.name;
    value = e.target.value;

    let rule1 = document.getElementById("rule1");
    let rule2 = document.getElementById("rule2");
    let rule3 = document.getElementById("rule3");
    let rule4 = document.getElementById("rule4");

    if(value.toString().length >= 8 ? rule1.style.color = 'green' : rule1.style.color = 'grey')
    if(/\d/.test(value) ? rule2.style.color = 'green' : rule2.style.color = 'grey')
    if(/[!@#$%^&*]/.test(value) ? rule3.style.color = 'green' : rule3.style.color = 'grey')          
    if(/(?=.*[a-z])(?=.*[A-Z])/.test(value) ? rule4.style.color = 'green' : rule4.style.color = 'grey')

    setUser({ ...user, [name]: value });
}

  const PostData = async (e) => {
    
    e.preventDefault();
    setSpin(true);

    const { pwd,cpwd} = user;

    try {
      const res = await fetch(`/resetPassword/${id}`,
       {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        //because server doesn't understand json, it has to be string
        body: JSON.stringify({
          pwd,cpwd
        })
      });

      //parses the text as json, which was string earlier as we just saw
      const data = await res.json();
      console.log("data got")
  
      if (res.status === 201) {
        setTimeout(()=>{
          setSpin(false);
        },500);

        setTimeout(()=>{
          toast.success(data.message);
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
        pwd:"",
        cpwd:""
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
        <div className="form-container" id="login-form" style={{marginTop:"315px"}}>
          <center><h1 style={{inlineSize: "350px",backgroundColor:"#84B0B0",border:"2px solid",color:"black",borderColor:"#888A8A"}}>Reset Password</h1></center>
          <form>
          <pre id="changeStyles" style={{ color: 'grey',textAlign:"left",marginTop:"1px",whiteSpace:"pre-wrap",fontSize:"12px" }}>
                        Password should be: 
                            <ul>
                                <li id='rule1'>
                                At least 8 characters long  
                                </li>
                                <li id='rule2'>
                                Should contain at least a number
                                </li>
                                <li id='rule3'>
                                Should contain at least one special character from ! @ # $ % ^ & *
                                </li>
                                <li id='rule4'>
                                Should contain the mix of upper and lower case letters
                                </li>
                            </ul>           
                        </pre>    
            <label htmlFor="pwd" style={{marginTop:"-20px"}}>New Password<sup style={{ color: "red" }}>*</sup></label>
            <input type="password" id="pwd" name="pwd" required value={user.pwd} onChange={handlePasswords} />

            <label htmlFor="cpwd">Confirm new password<sup style={{ color: "red" }}>*</sup></label>
            <input type="password" id="cpwd" name="cpwd" required value={user.cpwd} onChange={handleInputs} />

            {(user.pwd !== user.cpwd) && <p style={{ color: 'grey',textAlign:"left",marginTop:"1px" }}>Passwords do not match!</p>}
                <button type="submit" value="Email" onClick={PostData}>Update Password</button> 

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

export default Resetpassword
