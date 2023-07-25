import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { State,City} from 'country-state-city';


const DonorSignup = (props) => {

    const navigateTo = useNavigate();

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
    // const [selectedState,setSelectedState] = useState("");
    // const [selectedCity,setSelectedCity] = useState("");

    const fetchStates = () => {
        const canadaStates = State.getStatesOfCountry("CA");
        setStates(canadaStates);
    }

    let selectedSt;
    const fetchCities = (e) => {
        handleInputs(e);
        selectedSt = e.target.value;
        //console.log(selectedSt);
        //setSelectedState(selectedSt);
        //console.log(selectedState);
        const stateCities = City.getCitiesOfState("CA", selectedSt);
        setCities(stateCities);
        //handleInputs(selectedSt);
        //handleSelectedState(selectedSt);
        //console.log(stateCities);
    };

    // const handleSelectedState =(sl) =>{
    //    setSelectedState(sl);
    //    console.log("SElected state:",selectedState);
    // }

    // const handleSelectedCity =(e) =>{
    //     selectedCi=e.target.value;
    //     setSelectedCity(selectedCi);
    //  }

    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value });

    }

    const PostData = async (e) => {
        e.preventDefault();

        const { name, age, bloodGroup, pno, apno, email, pwd, cpwd, work, state, city } = user;

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
        if (data.status === 422 || !data) {
            window.alert("Invalid registration!!");
        }
        else {
            localStorage.setItem("TOKEN", data.token);
            props.setAuth(data.token);
            navigateTo("/");
        }
    }

    useEffect(() => {
        fetchStates();
    }, []);


    return (
        <div>

            <div className="mb-3 box">
                <form method='POST' className='register-form' id='register-form'>
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control w-25" id="name" placeholder="Your name" name="name" value={user.name} onChange={handleInputs} />

                    <label htmlFor="age">Age</label>
                    <input type="number" className="form-control w-25" id="age" placeholder="Your age" name="age" value={user.age} onChange={handleInputs} />

                    <label htmlFor="bgroup">Blood group </label>
    
                    <select name='bloodGroup' value={user.bloodGroup} onChange={handleInputs} >
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
                    <br/>

                    <label htmlFor="pno">Phone number</label>
                    <input type="number" className="form-control w-25" id="pno" placeholder="Your phone number" name="pno" value={user.pno} onChange={handleInputs} />

                    <label htmlFor="apno">Alternate phone number</label>
                    <input type="number" className="form-control w-25" id="apno" placeholder="Your Alternate phone number" name="apno" value={user.apno} onChange={handleInputs} />

                    <label htmlFor="work">Profession</label>
                    <input type="text" className="form-control w-25" id="work" placeholder="Your Profession" name="work" value={user.work} onChange={handleInputs} />

                    <label htmlFor="state">Select a state:</label>
                    <select id="state" name='state' onChange={fetchCities} value={user.state}>
                        <option value="">-- Select State --</option>
                        {
                            states.map((state) => (
                                <option name={state.name} key={state.isoCode} value={state.isoCode}>
                                    {state.name}
                                </option>
                            ))
                        }
                    
                    </select><br/>

                    <label htmlFor="city">Select a city:</label>
                    <select name='city' value={user.city} onChange={handleInputs} >
                    {/* <select id="city" disabled={!states} name='city' onChange={handleSelectedCity} value={selectedCity}> */}
                        <option value="">--Select a city--</option>
                        {cities.map((city) => (
                            <option key={city.id} value={city.name}>
                                {city.name}
                            </option>
                        ))}
                    </select><br/>


                    <label htmlFor="email">Email</label>
                    <input type="text" className="form-control w-25" id="email" placeholder="Your Email" name="email" value={user.email} onChange={handleInputs} />

                    <label htmlFor="pwd">Password</label>
                    <input type="text" className="form-control w-25" id="pwd" placeholder="Your Password" name="pwd" value={user.pwd} onChange={handleInputs} />

                    <label htmlFor="cpwd">Confirm password</label>
                    <input type="text" className="form-control w-25" id="cpwd" placeholder="Your password again" name="cpwd" value={user.cpwd} onChange={handleInputs} />

                    <input className="btn btn-primary" type="submit" value="Signup" onClick={PostData} />
                </form>
            </div>
        </div>
    )
}

export default DonorSignup
