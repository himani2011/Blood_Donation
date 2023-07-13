import React, { useEffect, useState } from 'react';
import { State, City } from 'country-state-city';

const Home = () => {

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [show, setShow] = useState([]);
    //const [orgShow, setOrgShow] = useState([]);
    const [st, setSt] = useState("");
    const [ct, setCt] = useState("");
    const [bg, setBg] = useState("");
    // const [orgSt, setOrgSt] = useState("");
    // const [orgCt, setOrgCt] = useState("");
    // const [orgBg, setOrgBg] = useState("");

    const fetchStates = () => {
        const canadaStates = State.getStatesOfCountry("CA");
        setStates(canadaStates);
    }

    let selectedSt, selectedCity, selectedBg;
    const fetchCities = (selectedSt) => {
        console.log("selected state while entering fetchCities(): ", selectedSt);
        //selectedSt = e.target.value;
        //setSt(selectedSt);
        const stateCities = City.getCitiesOfState("CA", selectedSt);
        setCities(stateCities);
        //console.log(stateCities);
    };

    const handleState = (e) => {
        selectedSt = e.target.value;
        setSt(selectedSt);
        console.log("selected st: ", selectedSt);
        fetchCities(selectedSt);
    }
    const handleCity = (e) => {
        selectedCity = e.target.value;
        setCt(selectedCity);
        console.log("Selected city: ", selectedCity);
    }
    const handleBg = (e) => {
        selectedBg = e.target.value;
        console.log("bg: ", selectedBg);
        setBg(selectedBg);
    }

    const getDonors = async (e) => {
        e.preventDefault();
        let state = st;
        let bgroup = bg;
        let city = ct;

        try {
            const res = await fetch(`/donorResults/${state}/${city}/${bgroup}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const results = await res.json();

            if (!results) {
                alert("No results found!");
            } else {
                setShow(results);
            }
        } catch (error) {
            console.log(error);
        }

    }

    // const getOrgs = async () => {
    //     let orgSt = orgSt;
    //     let orgCt = orgCt;
    //     let orgBg = orgBg;

    //     try {
    //         const res = await fetch('/orgResults/${orgSt}/${orgCt}/${orgBg}', {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             }
    //         });
    //         const results = await res.json();

    //         if (!results) {
    //             alert("No results found!");
    //         } else {
    //             setShow(results);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }

    // }


    useEffect(() => {
        fetchStates();
    }, []);


    return (
        <div>
            <div className='box'>
                <form className="d-flex w-75 p-3" role="search">

                    <label htmlFor="state">Select a state:</label>
                    <select id="state" onChange={handleState} value={selectedSt}>
                        <option value="">-- Select State --</option>
                        {
                            states.map((state) => (
                                <option name={state.name} key={state.isoCode} value={state.isoCode}>
                                    {state.name}
                                </option>
                            ))
                        }
                    </select>

                    <label htmlFor="city">Select a city:</label>
                    <select id="city" disabled={!states} onChange={handleCity}>
                        <option value="">--Select a city--</option>
                        {cities.map((city) => (
                            <option key={city.id} value={city.name}>
                                {city.name}
                            </option>
                        ))}
                    </select>

                    <select name='bloodGroup' onChange={handleBg}>
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
                    <button className="btn btn-outline-success ml-3" type="submit" onClick={getDonors}>Search Donors</button>
                </form>
            </div>
            <h2><u>Donor Results</u></h2>
            <div className='box'>

                <table className="table">
                    <thead>
                        
                                    <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Contact</th>
                                <th scope="col">Alternate contact</th>
                                <th scope="col">State</th>
                                <th scope="col">City</th>
                                </tr>
                        

                        
                    </thead>
                    <tbody>
                    {
                                show.map((elem) => {
                                   return <tr>
                                <th scope="col">{elem.name}</th>
                                <th scope="col">{elem.pno}</th>
                                <th scope="col">{elem.apno}</th>
                                <th scope="col">{elem.state}</th>
                                <th scope="col">{elem.city}</th>
                                {/* <th scope="col">City</th>
                                <th scope="col">Direction</th> */}
                                </tr>
                                })
                            }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home
