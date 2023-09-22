import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import {ToastContainer,toast} from 'react-toastify';
import { State, City} from 'country-state-city';
import Spinner from './Spinner';
import 'react-toastify/dist/ReactToastify.css';
import '../loginstyle.css';

const OrgSignup = (props) => {

    const navigateTo = useNavigate();

    const [spin,setSpin] = useState(false);
    
    const [user,setUser] = useState({
        name:"",
        bloodGroups:[],
        pno:"",
        apno:"",
        email:"",
        pwd:"",
        cpwd:"",
        pos:"",
        state:"",
        city:""
        });

    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);

    const fetchStates = () => {
        const canadaStates = State.getStatesOfCountry("CA");
        setStates(canadaStates);
    }

    let selectedSt;

    const fetchCities = (e) => {
        handleInputs(e);
        selectedSt = e.target.value;
        const stateCities = City.getCitiesOfState("CA", selectedSt);
        setCities(stateCities);
        console.log("selected state is ",selectedSt);
    };

    let name,value,isChecked;
    const handleInputs = (e) =>{
        name=e.target.name;
        value=e.target.value;
        setUser({...user,[name]:value});
        //name's value will be used as the property name in the new object. (what does [name] mean)
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

    const handleCheckbox = (e) => {
        value=e.target.value;
        isChecked = e.target.checked;
      
        setUser((user) => {
          if (isChecked) {
            return { ...user, bloodGroups: [...user.bloodGroups, value] };
            //[...user.bloodGroups, value] => used for appending
          } else {
            return { ...user, bloodGroups: user.bloodGroups.filter((group) => group !== value) };
          }
        });
      };
    
    const PostData = async (e) =>{
        e.preventDefault();
        setSpin(true);

        const {name,bloodGroups,pno,apno,email,pwd,cpwd,pos,state,city} = user;

        if(!name || !bloodGroups || !pno || !email || !pwd || !cpwd || !pos || !state ||!city){
            alert("Please fill all the details in the form! ");
        }
        try {
            const res = await fetch("/osignup",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    name,bloodGroups,pno,apno,email,pwd,cpwd,pos,state,city
                })
            });
    
    
            const data = await res.json();
    
            if (res.status === 201 ) { // || res
                setTimeout(()=>{
                  setSpin(false);
                },500);
        
                setTimeout(()=>{
                    localStorage.setItem("TOKEN",data.token);
                    props.setAuth(data.token);
                  toast.success("Registration successful");
                },800);
                
                setTimeout(()=>{
                  navigateTo("/");
                },2500);
    
              } else {
                setTimeout(()=>{
                  setSpin(false);
                },500);
          
                setTimeout(()=>{
                    toast.error(data.message);
                },800);
                
              }
              setUser({
                name:"",
                bloodGroups:[],
                pno:"",
                apno:"",
                email:"",
                pwd:"",
                cpwd:"",
                pos:"",
                state:"",
                city:""
              }
              );
        } catch (error) {
            setSpin(false);
            console.log(error);
        }
       
    }

    useEffect(() => {
        fetchStates();
    }, []);

  return (
    <div>
    {
     spin && <center style={{marginTop:"100px"}}><Spinner/></center>
    }
    {
    !spin && <div className="org-container">
                <div className="form-container" id="login-form">
                    {/* <center><h1 style={{inlineSize: "410px",backgroundColor:"#888A8A",border:"2px solid",color:"black"}}>Organization Signup</h1></center> */}
                    <center><h1 style={{inlineSize: "410px",backgroundColor:"#84B0B0",border:"2px solid",color:"black",borderColor:"#888A8A"}}>Organization Signup</h1></center>

                    <form>
                        <label htmlFor="name">Name<sup style={{color:"red"}}>*</sup></label>
                        <input type="text" id="name" name="name" required value={user.name} onChange={handleInputs} />

                        <label htmlFor="pos">Position<sup style={{color:"red"}}>*</sup></label>
                        <input type="text" id="pos" name="pos" required value={user.pos} onChange={handleInputs} />

                        <label htmlFor="pno">Phone number<sup style={{color:"red"}}>*</sup></label>
                        <input type="tel" id="pno" name="pno" required value={user.pno} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" onChange={handleInputs} minLength={10} maxLength={10}/>

                        {(user.pno !== '' && user.pno.length <10) && <p style={{ color: 'grey',textAlign:"left",marginTop:"1px" }}>Enter a valid phone number!</p>}

                        <label htmlFor="apno">Alternate phone number</label>
                        <input type="tel" id="apno" name="apno" value={user.apno} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" onChange={handleInputs} minLength={10} maxLength={10}/>

                        {(user.apno !== '' && user.apno.length <10) && <p style={{ color: 'grey',textAlign:"left",marginTop:"1px" }}>Enter a valid phone number!</p>}
                        {(user.apno !== '' && (user.pno === user.apno)) && <p style={{ color: 'grey',textAlign:"left",marginTop:"1px" }}>Enter a different phone number!</p>}
                   
                        <label style={{marginBottom:"-10px"}}>Available blood groups with you :</label><br/>
                        <div>
                    <div className='form-check form-check-inline'>
                        <input className="form-check-input" type="checkbox" id="ap" name='bloodGroups' value="AP" checked={user.bloodGroups.includes('AP')} onChange={handleCheckbox} style={{accentColor:"red"}}/>
                        <span className="checkmark"></span>
                            <label className="form-check-label" htmlFor="ap" style={{marginLeft:"5px"}}>A+</label>
                    </div>
                    <div className='form-check form-check-inline'>
                        <input className="form-check-input" type="checkbox" id="an" name='bloodGroups' value="AN" checked={user.bloodGroups.includes('AN')} onChange={handleCheckbox}/>
                            <label className="form-check-label" htmlFor="an" style={{marginLeft:"5px"}}>A-</label>
                    </div>
                    <div className='form-check form-check-inline'>
                        <input className="form-check-input" type="checkbox" id="bp" name='bloodGroups' value="BP" checked={user.bloodGroups.includes('BP')} onChange={handleCheckbox}/>
                            <label className="form-check-label" htmlFor="bp" style={{marginLeft:"5px"}}>B+</label>
                    </div>
                    <div className='form-check form-check-inline'>
                        <input className="form-check-input" type="checkbox" id="bn" name='bloodGroups' value="BN" checked={user.bloodGroups.includes('BN')} onChange={handleCheckbox} />
                            <label className="form-check-label" htmlFor="bn" style={{marginLeft:"5px"}}>B-</label>
                    </div>
                    <div className='form-check form-check-inline'>
                        <input className="form-check-input" type="checkbox" id="op" name='bloodGroups' value="OP" checked={user.bloodGroups.includes('OP')} onChange={handleCheckbox} />
                            <label className="form-check-label" htmlFor="op" style={{marginLeft:"5px"}}>O+</label>
                    </div>
                    <div className='form-check form-check-inline'>
                        <input className="form-check-input" type="checkbox" id="on" name='bloodGroups' value="ON" checked={user.bloodGroups.includes('ON')} onChange={handleCheckbox} />
                            <label className="form-check-label" htmlFor="on" style={{marginLeft:"5px"}}>O-</label>
                    </div>
                    
                    <div className='form-check form-check-inline'>
                        <input className="form-check-input" type="checkbox" id="abp" name='bloodGroups' value="ABP" checked={user.bloodGroups.includes('ABP')} onChange={handleCheckbox} />
                            <label className="form-check-label" htmlFor="abp" style={{marginLeft:"5px"}}>AB+</label>
                    </div>

                    <div className='form-check form-check-inline'>
                        <input className="form-check-input" type="checkbox" id="abn" name='bloodGroups' value="ABN" checked={user.bloodGroups.includes('ABN')} onChange={handleCheckbox} />
                            <label className="form-check-label" htmlFor="abn" style={{marginLeft:"5px"}}>AB-</label>
                    </div>
                    </div>

                    <label htmlFor="state">Select a state<sup style={{color:"red"}}>*</sup></label>
                    <select className='bgroup' id="state" name="state" onChange={fetchCities} value={user.state}>
                        <option value="">-- Select State --</option>
                        {
                            states.map((state) => (
                                <option name={state.name} key={state.isoCode} value={state.isoCode}>
                                    {state.name}
                                </option>
                            ))
                        }
                    
                    </select><br/>

                    <label htmlFor="city">Select a city<sup style={{color:"red"}}>*</sup></label>
                    <select className='bgroup' id="city" name="city" disabled={!states} value={user.city} onChange={handleInputs}>
                        <option value="">--Select a city--</option>
                        {cities.map((city) => (
                            <option key={city.id} value={city.name}>
                                {city.name}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="email">Email<sup style={{color:"red"}}>*</sup></label>
                    <input type="email" id="email" name="email" required value={user.email} onChange={handleInputs} />

                    <label htmlFor="pwd">Password<sup style={{color:"red"}}>*</sup></label>
                    <input type="password" id="pwd" name="pwd" required value={user.pwd} onChange={handlePasswords} />
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

                    <label htmlFor="cpwd" style={{marginTop:"-20px"}}>Confirm password<sup style={{color:"red"}}>*</sup></label>
                    <input type="password" id="cpwd" name="cpwd" required value={user.cpwd} onChange={handleInputs} />

                    {(user.pwd !== user.cpwd) && <p style={{ color: 'grey',textAlign:"left",marginTop:"1px" }}>Passwords do not match!</p>}


                    <button type="submit" value="Signup" onClick={PostData}>Register</button>
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
                    <p>Have an account? <NavLink to='/login' id="signup-link" style={{color:"#769696"}}><u>Login</u></NavLink>
                    </p>
                </div>
            </div>
    }
    </div>
  )
}

export default OrgSignup
