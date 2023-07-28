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

    const PostData = async (e) => {
        e.preventDefault();
        setSpin(true);

        const { name, age, bloodGroup, pno, apno, email, pwd, cpwd, work, state, city } = user;

        if(!name || !age || !bloodGroup || !pno || !apno || !email || !pwd || !cpwd || !work || !state ||!city){
            alert("Please fill all the details in the form! ");
        }

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
                  toast.error("Email already in use or you have not filled all the details!");
                },800);
                
              }
              setUser([]);
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

            
            !spin && <div className="signup-container">
                <div className="form-container" id="login-form">
                    <h1>Donar Signup</h1>
                    <h6 style={{color:"red",marginTop:"20px"}}>(All the fields in this form are required to be filled)</h6>
                    <form>
                        <label htmlFor="name">Name *</label>
                        <input type="text" id="name" name="name" required value={user.name} onChange={handleInputs} />

                        <label htmlFor="age">Age *</label>
                        <input type="number" id="age" name="age" required value={user.age} onChange={handleInputs} />

                        <label htmlFor="bgroup">Blood Group *</label>
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

                    <label htmlFor="pno">Phone number*</label>
                    <input type="tel" id="pno" name="pno" required value={user.pno} onChange={handleInputs} />

                    <label htmlFor="apno">Alternate phone number *</label>
                    <input type="tel" id="apno" name="apno" required value={user.apno} onChange={handleInputs} />

                    <label htmlFor="work">Profession *</label>
                    <input type="text" id="work" name="work" required value={user.work} onChange={handleInputs} />

                    <label htmlFor="state">Select a state *</label>
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

                    <label htmlFor="city">Select a city*</label>
                    <select className="bgroup" name='city' value={user.city} onChange={handleInputs} >
                    {/* <select id="city" disabled={!states} name='city' onChange={handleSelectedCity} value={selectedCity}> */}
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

                    <button type="submit" value="Signup" onClick={PostData}>Signup</button>
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

export default DonorSignup
