import React, { useEffect, useState } from 'react';
import { State, City } from 'country-state-city';
import {ToastContainer,toast} from 'react-toastify';
import Spinner from './Spinner';
import "../styles.css";
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {

    //for spinner
    const [spin,setSpin] = useState(false);

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [show, setShow] = useState([]);
    const [orgShow, setOrgShow] = useState([]);
    //for the form inputs
    const [st, setSt] = useState("");
    const [ct, setCt] = useState("");
    const [bg, setBg] = useState("");

    const fetchStates = () => {
        const canadaStates = State.getStatesOfCountry("CA");
        setStates(canadaStates);
    }

    let selectedSt, selectedCity, selectedBg;
    const fetchCities = (selectedSt) => {
        console.log("selected state while entering fetchCities(): ", selectedSt);
        const stateCities = City.getCitiesOfState("CA", selectedSt);
        setCities(stateCities);
    };

    const handleState = (e) => {
        selectedSt = e.target.value;
        setSt(selectedSt);
        console.log("selected st: ", selectedSt);
        if(selectedSt === ""){
            alert("Please select a valid state!");
        }else{
            fetchCities(selectedSt);
        }
        
    }
    const handleCity = (e) => {
        selectedCity = e.target.value;
        if(selectedCity === ""){
            alert("Please select a valid city!");
        }else{
            setCt(selectedCity);
            console.log("Selected city: ", selectedCity);
        }
       
    }
    const handleBg = (e) => {
        selectedBg = e.target.value;
        console.log("bg: ", selectedBg);
        if(selectedBg === ""){
            alert("Please select a valid blood group!");
        }else{
            setBg(selectedBg);
            console.log("Selected bg: ", selectedBg);
        }
        
    }

    const getDonors = async (e) => {
        setShow([]);
        setSpin(true);
        e.preventDefault();
        let state = st;
        let bgroup = bg;
        let city = ct;

        if(!state || !city || !bgroup){
            alert("Please select valid state, city and bloodgroup!!");
        }

        try {
            
            const res = await fetch(`/donorResults/${state}/${city}/${bgroup}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const results = await res.json();

            if (results.length === 0) {  //res.status === 201
                // setTimeout(()=>{
                //     setSpin(false);
                // },500);
                setSpin(false);
                alert("No results found!");
            } else {
                setSpin(false);
                setShow(results);
            }
            setSpin(false);

        } catch (error) {
            setSpin(false);
            console.log(error);
        }
    }

    const getOrgs = async (e) => {
        setOrgShow([]);
        setSpin(true);
        e.preventDefault();
        let state = st;
        let city = ct;
        let bgroup = bg;

        if(!state || !city || !bgroup){
            alert("Please select valid state, city and bloodgroup!!");
        }
        
        try {
            const res = await fetch(`/orgResults/${state}/${city}/${bgroup}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const results = await res.json();

            if (results.length === 0) {
                setSpin(false);
                alert("No results found!");
            } else {
                setOrgShow(results);
            }
            setSpin(false);
            
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
            <div className="signup-form">
                <div className="form-field">
                {/* <label htmlFor="state">Select a state: </label> */}
                <select className="bgroup" id="state" onChange={handleState} value={selectedSt} required>
                        <option value="">-- Select State --</option>
                        {
                            states.map((state) => (
                                <option name={state.name} key={state.isoCode} value={state.isoCode}>
                                    {state.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div className="divider"></div>
                <div className="form-field">
                    <select className='bgroup' id="city" disabled={!states} onChange={handleCity} required>
                        <option value="">--Select a city--</option>
                        {cities.map((city) => (
                            <option key={city.id} value={city.name}>
                                {city.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="divider"></div>
                <div className="form-field">
                <select className='bgroup' name='bloodGroup' onChange={handleBg} required>
                        <option value="">Select blood group</option>
                        <option value="AP">A+</option>
                        <option value="AN">A-</option>
                        <option value="BP">B+</option>
                        <option value="BN">B-</option>
                        <option value="OP">O+</option>
                        <option value="ON">O-</option>
                        <option value="ABP">AB+</option>
                        <option value="ABN">AB-</option>
                    </select>
                </div>

                <div className="form-field">
                <button className="submit" type="submit" onClick={getDonors}>
                    Search Donors
                </button>
                <ToastContainer
                 position="top-center"
                 autoClose={2000}
                 newestOnTop
                 closeOnClick={true}
                 rtl={false}
                 draggable
                 pauseOnHover={false}
                 theme="dark"/>
                </div>

                <div className="form-field">
                <button className="submit" type="submit" onClick={getOrgs}>
                    Search Organizations
                </button>
                </div>
            </div>

            {
            !spin && <h2 style={{padding:25}}><u>Donor Results</u></h2>
            }
            {
                spin && <center style={{marginTop:"100px"}}><Spinner/></center>
            }

            {
 
            !spin && <div className='box'>

            <table className="table">
                <thead>
                    
                    <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Contact</th>
                    <th scope="col">contact 2</th>
                    <th scope="col">State</th>
                    <th scope="col">City</th>
                    </tr>
                    
                </thead>
                <tbody>
                {
                    show.map((elem) => {
                    return <tr>
                    <td>{elem.name}</td>
                    <td>{elem.pno}</td>
                    <td>{elem.apno}</td>
                    <td>{elem.state}</td>
                    <td>{elem.city}</td>
                    </tr>
                    })
                        }
                </tbody>
            </table>
            </div>

            }
            
            {
            !spin && <h2 style={{padding:25}}><u>Organization Results</u></h2>
            }
            {
                spin && <center style={{marginTop:"100px"}}><Spinner/></center>
            }
            {

                !spin && <div className='box'>

                <table className="table">
                    <thead>
                        
                        <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Contact</th>
                        <th scope="col">contact 2</th>
                        <th scope="col">State</th>
                        <th scope="col">City</th>
                        </tr>
                        
                    </thead>
                    <tbody>
                    {
                        orgShow.map((elem) => {
                        return <tr>
                        <td>{elem.name}</td>
                        <td>{elem.pno}</td>
                        <td>{elem.apno}</td>
                        <td>{elem.state}</td>
                        <td>{elem.city}</td>
                        </tr>
                        })
                            }
                    </tbody>
                </table>
                        
                </div>
            }
       
            
        </div>
    )
}

export default Home
