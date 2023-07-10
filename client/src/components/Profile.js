import React, { useEffect, useState } from 'react';

const Profile = () => {

    const token = localStorage.getItem("TOKEN");

    const [user,setUser] = useState([]);

    const getUserData = async() =>{
        try {
            //some if condition here 
            const res =await fetch('/profile',{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":token
                }
            });
        
        const data = await res.json();
        console.log("Data aaaaa :  ",data);
        setUser(data);
    
        } catch (error) {
            console.log(error);
        }

    }

    
    useEffect(()=>{
    getUserData();
        
    },[]);

    return (
        <div>
            <div className='box mb-3'>
                <label className='mb-3'>Turn your availability on/off</label>
                <div className="form-check form-switch ">
                    <input className="form-check-input" type="checkbox" name="avail" id="flexSwitchCheckReverse" />
                    <label className="form-check-label" htmlFor="flexSwitchCheckReverse">Not available</label>
                </div>

                <div>

                <label htmlFor="pno">Update Phone number</label>
                    <input type="number" className="form-control w-25" id="pno" name='pno' placeholder="Your phone number" value={user.pno}/>

                    <label htmlFor="apno">Update Alternate phone number</label>
                    <input type="number" className="form-control w-25" id="apno" name='apno' placeholder="Your Alternate phone number" value={user.apno}/>

                    <label htmlFor="email">Update Email</label>
                    <input type="text" className="form-control w-25" id="email" name='email' placeholder="Your Email" value={user.email}/>

                </div>
            </div>

            <label className='mb-3'>Organizations, update your blood groups availability : </label>

            <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="ap" value="ap"/>
                            <label className="form-check-label" htmlFor="inlineCheckbox1">A+</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="an" value="an"/>
                            <label className="form-check-label" htmlFor="inlineCheckbox2">A-</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="bp" value="bp" />
                            <label className="form-check-label" htmlFor="inlineCheckbox3">B+</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="bn" value="bn" />
                            <label className="form-check-label" htmlFor="inlineCheckbox3">B-</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="op" value="op" />
                            <label className="form-check-label" htmlFor="inlineCheckbox3">O+</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="on" value="on" />
                            <label className="form-check-label" htmlFor="inlineCheckbox3">O-</label>
                    </div>
                    
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="abp" value="abp" />
                            <label className="form-check-label" htmlFor="inlineCheckbox3">AB+</label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="abn" value="abn" />
                            <label className="form-check-label" htmlFor="inlineCheckbox3">AB-</label>
                    </div>

                    <div>
                    <label htmlFor="pno">Update Phone number</label>
                    <input type="number" className="form-control w-25" id="pno" placeholder="Your phone number" name='pno' value={user.pno}/>

                    <label htmlFor="oano">Update Alternate phone number</label>
                    <input type="number" className="form-control w-25" id="oano" placeholder="Your Alternate phone number" />

                    <label htmlFor="oano">Alternate email</label>
                    <input type="number" className="form-control w-25" id="oano" placeholder="Your Alternate phone number" />

                    </div>

        </div>
        
    )
}

export default Profile
