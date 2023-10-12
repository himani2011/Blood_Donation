import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { State, City } from 'country-state-city';
import {ToastContainer,toast} from 'react-toastify';
import Spinner from './Spinner';
import "../styles.css";
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {

    //for spinner
    const [spin,setSpin] = useState(false);
    const [spin1,setSpin1] = useState(false);
    const [spin2,setSpin2] = useState(false);

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [show, setShow] = useState([]);
    const [orgShow, setOrgShow] = useState([]);
    //for the form inputs
    const [st, setSt] = useState("");
    const [ct, setCt] = useState("");
    const [bg, setBg] = useState("");
    const [name,setName] = useState("");

    //for displaying name of org/user
    const token = localStorage.getItem("TOKEN");
    const navigateTo = useNavigate();

    const getUserName = async() =>{
        // setTimeout(()=>{
            setSpin2(true);
        // },2000)
        try {     
            const res =await fetch('/profile',{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":token
                }
            });
        
        const data = await res.json();
        if(res.status===201){
           setSpin2(false);
           setName(data.name);      
        }
       else{
        alert("Login required!!");
        navigateTo('/login');
       }
    
        } catch (error) {
            console.log(error);
        }
    }
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
                setTimeout(()=>{    
                    toast.error("No results found!!");
                },200);
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
        setSpin1(true);
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
                setSpin1(false);
                alert("No results found!");
            } else {
                setOrgShow(results);
            }
            setSpin1(false);
            
        } catch (error) {
            setSpin1(false);
            console.log(error);
        }
    }

    useEffect(() => {
        fetchStates();
        getUserName();
        //eslint-disable-next-line
    }, []);


    return (
        <div>
            
            <div className="row " style={{margin:"100px 60px 0 60px"}}>
                <div marginBottom="50px">
                {
                spin2 && <center style={{marginTop:"-50px"}}><Spinner/></center>
               }
                <center> <h4 color='black' textalign="center">{!spin2 && <span>Welcome {name}</span>}</h4> </center>
                </div>
            
            <div className='row' style={{border:"2px solid",borderColor:"#888A8A",justifyContent:"space-evenly",inlineSize:"1500px",backgroundColor:"rgba(177, 186, 145, 0.8)"}}>
                <div className='col-md-2' style={{padding:10}}>
                <select className="form-select form-select-lg w-100 h-85" id="state" onChange={handleState} value={selectedSt} style={{backgroundColor: "#84B0B0", color: "black"}} required>
                        <option value="" style={{fontSize:"15px"}}>Select State</option>
                        {
                            states.map((state) => (
                                <option name={state.name} key={state.isoCode} value={state.isoCode} style={{fontSize:"15px"}}>
                                    {state.name} 
                                </option>
                            ))
                        }
                    </select>
                </div>

            
                <div className="divider"></div>
                <div className='col-md-2 ' style={{padding:10}}>
                    <select className='form-select form-select-lg w-100 h-85' id="city" disabled={!states} onChange={handleCity} style={{backgroundColor: "#84B0B0", color: "black"}} required>
                        <option value="" style={{fontSize:"15px"}}>Select a city</option>
                        {cities.map((city) => (
                            <option key={city.id} value={city.name} style={{fontSize:"15px"}}>
                                {city.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="divider"></div>
                <div className='col-md-2' style={{padding:10,fontSize:"15px"}}> 
                {/* form-field  */}
                <select className='form-select form-select-lg w-100 h-85' name='bloodGroup' onChange={handleBg} style={{backgroundColor: "#84B0B0", color: "black"}} required>
                        <option value="" style={{fontSize:"15px"}}>Select blood group</option>
                        <option value="AP" style={{fontSize:"15px"}}>A+</option>
                        <option value="AN" style={{fontSize:"15px"}}>A-</option>
                        <option value="BP" style={{fontSize:"15px"}}>B+</option>
                        <option value="BN" style={{fontSize:"15px"}}>B-</option>
                        <option value="OP" style={{fontSize:"15px"}}>O+</option>
                        <option value="ON" style={{fontSize:"15px"}}>O-</option>
                        <option value="ABP" style={{fontSize:"15px"}}>AB+</option>
                        <option value="ABN" style={{fontSize:"15px"}}>AB-</option>
                    </select>
                </div>
                <div className="divider"></div>
                <div className='col-md-2' style={{padding:10}}>
                <button className="btn btn-dark w-100 h-100" type="submit" onClick={getDonors}>
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
                {/* <div className="divider"></div> */}
                <div className='col-md-2' style={{padding:10}}>
                <button className="btn btn-dark w-100 h-100" type="submit" onClick={getOrgs}>
                    Search Organizations
                </button>
                </div>
                </div>
            </div>


            <div className='container-sm'  style={{marginTop:"30px"}}>
            {
            !spin && <center><h4 style={{inlineSize: "320px",backgroundColor:"#84B0B0",border:"2px solid", borderColor:"#888A8A", marginTop:"25px",textAlign:"center"}}>Donor Results</h4></center>
            }
            {/* #888A8A */}
            {
                spin && <center style={{marginTop:"100px"}}><Spinner/></center>
            }

            {
 
            !spin && <div style={{marginTop:"20px"}}>

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
            <div>
            {
            !spin1 && <center><h4 style={{inlineSize:"320px",backgroundColor:"#84B0B0",border:"2px solid",borderColor:"#888A8A",marginTop:"25px",textAlign:"center"}}>Organization Results</h4></center>
            }
            {
                spin1 && <center style={{marginTop:"-10px"}}><Spinner/></center>
            }
            {

                !spin1 && <div style={{marginTop:"25px"}}>

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
       
            
            </div>
        </div>
    )
}

export default Home
