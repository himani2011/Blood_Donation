import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { State,City} from 'country-state-city';
import '../loginstyle.css';
import Spinner from './Spinner';
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer,toast} from 'react-toastify';


const DonorSignup = (props) => {

    const navigateTo = useNavigate();
    const [spin,setSpin] = useState(false);

    const [user, setUser] = useState({
        name: "",
        age: "",
        bloodGroup: "",
        pno: "",
        apno: "",
        email: "",
        pwd: "",
        cpwd: "",
        work: "",
        state:"",
        city: ""
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
    };

    let name, value;
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

        const { name, age, bloodGroup, pno, apno, email, pwd, cpwd, work, state, city } = user;

        try {
            const res = await fetch("/dsignup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, age, bloodGroup, pno, apno, email, pwd, cpwd, work,state, city
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
                name: "",
                age: "",
                bloodGroup: "",
                pno: "",
                apno: "",
                email: "",
                pwd: "",
                cpwd: "",
                work: "",
                state:"",
                city: ""
            });
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

            
            !spin && user!==undefined && <div className="signup-container">
                <div className="form-container" id="login-form">
                    <center><h1 style={{inlineSize: "330px",border:"2px solid",color:"black",borderColor:"#888A8A",backgroundColor:"#84B0B0"}}>Donar Signup</h1></center>
                    <form>
                        <label htmlFor="name">Name <sup style={{color:"red"}}>*</sup></label>
                        <input type="text" id="name" name="name" required value={user.name} onChange={handleInputs} />

                        <label htmlFor="age">Age <sup style={{color:"red"}}>*</sup></label>
                        <input type="number" id="age" name="age" required value={user.age} onChange={handleInputs} maxLength={3}/>

                        {user.age !== '' && user.age.length >2 && <p style={{ color: 'grey',textAlign:"left",marginTop:"1px" }}>Enter a valid age!</p>}

                        <label htmlFor="bgroup">Blood Group <sup style={{color:"red"}}>*</sup></label>
                        <select className='bgroup' name='bloodGroup' value={user.bloodGroup} onChange={handleInputs} >
                        <option>Select blood group</option>
                        <option value="AP">A+</option>
                        <option value="AN">A-</option>
                        <option value="BP">B+</option>
                        <option value="BN">B-</option>
                        <option value="OP">O+</option>
                        <option value="ON">O-</option>
                        <option value="ABP">AB+</option>
                        <option value="ABN">AB-</option>
                    </select>

                    <label htmlFor="pno">Phone number <sup style={{color:"red"}}>*</sup></label>
                    <input type="tel" id="pno" name="pno" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required value={user.pno} onChange={handleInputs} maxLength={10} minLength={10}/>

                    {(user.pno !== '' && user.pno.length <10) && <p style={{ color: 'grey',textAlign:"left",marginTop:"1px" }}>Enter a valid phone number!</p>}

                    <label htmlFor="apno">Alternate phone number </label>
                    <input type="tel" id="apno" name="apno" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" value={user.apno} onChange={handleInputs} maxLength={10} minLength={10}/>

                    {(user.apno !== '' && user.apno.length <10) && <p style={{ color: 'grey',textAlign:"left",marginTop:"1px" }}>Enter a valid phone number!</p>}
                    {(user.apno !== '' && (user.pno === user.apno)) && <p style={{ color: 'grey',textAlign:"left",marginTop:"1px" }}>Enter a different phone number!</p>}

                    <label htmlFor="work">Profession <sup style={{color:"red"}}>*</sup></label>
                    <input type="text" id="work" name="work" required value={user.work} onChange={handleInputs} />

                    <label htmlFor="state">Select a state <sup style={{color:"red"}}>*</sup></label>
                    <select className="bgroup" id="state" name='state' onChange={fetchCities} value={user.state}>
                        <option value="">-- Select State --</option>
                        {
                            states.map((state) => (
                                <option name={state.name} key={state.isoCode} value={state.isoCode}>
                                    {state.name}
                                </option>
                            ))
                        }
                    
                    </select>

                    <label htmlFor="city">Select a city <sup style={{color:"red"}}>*</sup></label>
                    <select className="bgroup" name='city' value={user.city} onChange={handleInputs} >
                    {/* <select id="city" disabled={!states} name='city' onChange={handleSelectedCity} value={selectedCity}> */}
                        <option value="">--Select a city--</option>
                        {cities.map((city) => (
                            <option key={city.id} value={city.name}>
                                {city.name}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="email">Email <sup style={{color:"red"}}>*</sup></label>
                    <input type="email" id="email" name="email" required value={user.email} onChange={handleInputs} />
                            
                    <label htmlFor="pwd">Password <sup style={{color:"red"}}>*</sup></label>
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

                    <label htmlFor="pwd" style={{marginTop:"-20px"}}>Confirm password <sup style={{color:"red"}}>*</sup></label>
                    <input type="password" id="cpwd" name="cpwd" required value={user.cpwd} onChange={handleInputs} />
                    

                    {(user.pwd !== user.cpwd) && <p style={{ color: 'grey',textAlign:"left",marginTop:"1px" }}>Passwords do not match!</p>}

                    <button type="submit" value="Signup" onClick={PostData} >
                        Register</button>

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
                    <p>Have an account? Then <NavLink to='/login' id="signup-link" style={{color:"#769696"}}><u>Login</u></NavLink>
                    </p>
                </div>
            </div>
            }
        </div>
    )
}

export default DonorSignup
