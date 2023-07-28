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

        if(!name || !bloodGroups || !pno || !apno || !email || !pwd || !cpwd || !pos || !state ||!city){
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
                  toast.error("Email already in use or you have not filled all the details!");
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
                    <h1>Organization Signup</h1>
                    <h6 style={{color:"red",marginTop:"20px"}}>(All the fields in this form are required to be filled)</h6>
                    <form>
                        <label htmlFor="name">Name *</label>
                        <input type="text" id="name" name="name" required value={user.name} onChange={handleInputs} />

                        <label htmlFor="pos">Position *</label>
                        <input type="text" id="pos" name="pos" required value={user.pos} onChange={handleInputs} />

                        <label htmlFor="pno">Phone number *</label>
                        <input type="tel" id="pno" name="pno" required value={user.pno} onChange={handleInputs} />

                        <label htmlFor="apno">Alternate phone number *</label>
                        <input type="tel" id="apno" name="apno" required value={user.apno} onChange={handleInputs} />

                        <label>Available blood groups with you *</label><br/>
                    <div className="bgroup">
                        <input className="form-check-input" type="checkbox" id="ap" name='bloodGroups' value="AP" checked={user.bloodGroups.includes('AP')} onChange={handleCheckbox}/>
                            <label className="form-check-label" htmlFor="ap">A+</label>
                    </div>
                    <div className="bgroup">
                        <input className="form-check-input" type="checkbox" id="an" name='bloodGroups' value="AN" checked={user.bloodGroups.includes('AN')} onChange={handleCheckbox}/>
                            <label className="form-check-label" htmlFor="an">A-</label>
                    </div>
                    <div className="bgroup">
                        <input className="form-check-input" type="checkbox" id="bp" name='bloodGroups' value="BP" checked={user.bloodGroups.includes('BP')} onChange={handleCheckbox}/>
                            <label className="form-check-label" htmlFor="bp">B+</label>
                    </div>
                    <div className="bgroup">
                        <input className="form-check-input" type="checkbox" id="bn" name='bloodGroups' value="BN" checked={user.bloodGroups.includes('BN')} onChange={handleCheckbox} />
                            <label className="form-check-label" htmlFor="bn">B-</label>
                    </div>
                    <div className="bgroup">
                        <input className="form-check-input" type="checkbox" id="op" name='bloodGroups' value="OP" checked={user.bloodGroups.includes('OP')} onChange={handleCheckbox} />
                            <label className="form-check-label" htmlFor="op">O+</label>
                    </div>
                    <div className="bgroup">
                        <input className="form-check-input" type="checkbox" id="on" name='bloodGroups' value="ON" checked={user.bloodGroups.includes('ON')} onChange={handleCheckbox} />
                            <label className="form-check-label" htmlFor="on">O-</label>
                    </div>
                    
                    <div className="bgroup">
                        <input className="form-check-input" type="checkbox" id="abp" name='bloodGroups' value="ABP" checked={user.bloodGroups.includes('ABP')} onChange={handleCheckbox} />
                            <label className="form-check-label" htmlFor="abp">AB+</label>
                    </div>

                    <div className="bgroup">
                        <input className="form-check-input" type="checkbox" id="abn" name='bloodGroups' value="ABN" checked={user.bloodGroups.includes('ABN')} onChange={handleCheckbox} />
                            <label className="form-check-label" htmlFor="abn">AB-</label>
                    </div>


                    <label htmlFor="state">Select a state *</label>
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

                    <label htmlFor="city">Select a city *</label>
                    <select className='bgroup' id="city" name="city" disabled={!states} value={user.city} onChange={handleInputs}>
                        <option value="">--Select a city--</option>
                        {cities.map((city) => (
                            <option key={city.id} value={city.name}>
                                {city.name}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="email">Email *</label>
                    <input type="email" id="email" name="email" required value={user.email} onChange={handleInputs} />

                    <label htmlFor="pwd">Password *</label>
                    <input type="password" id="pwd" name="pwd" required value={user.pwd} onChange={handleInputs} />

                    <label htmlFor="pwd">Confirm password *</label>
                    <input type="password" id="cpwd" name="cpwd" required value={user.cpwd} onChange={handleInputs} />

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
                    <p>Have an account? <NavLink to='/login' id="signup-link"><u>Login</u></NavLink>
                    </p>
                </div>
            </div>
    }
    </div>
  )
}

export default OrgSignup
