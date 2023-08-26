import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from './Spinner';
const Profile = () => {

    const token = localStorage.getItem("TOKEN");
    const navigateTo = useNavigate();

    const [spin,setSpin]=useState(false);
    //for user
    const [user,setUser] = useState([]);
    
    //for org
    const [org,setOrg] = useState([]);
    

    const getUserData = async() =>{
        setSpin(true);
        try {
            
            const res =await fetch('/profile',{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":token
                }
            });
        
        const data = await res.json();
        console.log(data.isAvailable);
        if(res.status===201){
            if(data.role===1){
                setOrg(data);
                setSpin(false);
            }
            else{
                setUser(data);  
                setSpin(false);
            }
            
        }
       else{
        alert("Login required!!");
        navigateTo('/login');
       }
    
        } catch (error) {
            console.log(error);
        }

    }

    let name,value,isChecked;
    const handleCheckbox = (e) => {
        value=e.target.value;
        isChecked = e.target.checked;
      
        if (isChecked) {
            console.log("Checked!")
            setOrg({...org, bloodGroups: [...org.bloodGroups, value]});
          } else {
            console.log("not Checked!")
            setOrg({ ...org, bloodGroups: org.bloodGroups.filter((group) => group !== value) });
          }
      };
    

    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value });
        
      }
    
      const handleOrgInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setOrg({ ...org, [name]: value });
      }

    const changeAvail=(e)=>{
        setUser({...user,isAvailable:e.target.checked});
    }

    const updateProfile =async (e) =>{
        e.preventDefault();
        setSpin(true);
        const {bloodGroups,pno,apno,email} = org;

        try {
            const res=await fetch('/updateProfile',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":token
                },
                body:JSON.stringify({
                    bloodGroups,pno,apno,email
                })
            });

            const data = await res.json();
            if(res.status===201){
                setSpin(false);
                    setOrg(data);

                setTimeout(()=>{    
                toast.success("Profile updated!!");
                },200);
                setTimeout(()=>{    
                        window.location.reload();
                },400); 
            }
    
        } catch (error) {
            toast.error("Error updating your profile!");
        }
    }

    const updateUserProfile =async (e) =>{
        e.preventDefault();
        setSpin(true);
        const {isAvailable,pno,apno,email} = user;

        try {
            const res=await fetch('/updateProfile',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":token
                },
                body:JSON.stringify({
                    isAvailable,pno,apno,email
                })
            });

            const data = await res.json();
            if(res.status===201){
                setSpin(false);
                setUser(data)
                    setTimeout(()=>{     
                      toast.success("Profile updated!!");
                    },100); 
                    setTimeout(()=>{    
                        window.location.reload();
                      },300); 
            }
            
        } catch (error) {
            toast.error("Error updating your profile!");

        }
    }

    
    useEffect(()=>{
    getUserData();
    //eslint-disable-next-line
    },[]);


    return (
        <div>
            {spin && <center style={{marginTop:"100px"}}><Spinner/></center>}
            {
                !spin && user.length !==0 &&
                <div className="form-container" id="login-form" style={{marginTop:"90px"}}>
                <h1>Update your information</h1>
                <form>
                <label className='mb-3'>Turn your availability on/off:</label>
                <div className="form-check form-switch ">
                    <input className="form-check-input" type="checkbox" name="isAvailable" id="flexSwitchCheckReverse" checked={user.isAvailable} onChange={(e)=>{changeAvail(e)}}/>
                    <label className="form-check-label" htmlFor="flexSwitchCheckReverse">Available</label>
                </div>

                <div>
                    <label htmlFor="pno">Update Phone number</label>
                    <input type="number" className="form-control w-75" id="pno" name='pno' placeholder={user.pno} onChange={handleInputs}/>

                    <label htmlFor="apno">Update Alternate phone number</label>
                    <input type="number" className="form-control w-75" id="apno" name='apno' placeholder={user.apno} onChange={handleInputs}/>

                    <label htmlFor="email">Update Email</label>
                    <input type="email" className="form-control w-75" id="email" name='email' placeholder={user.email} onChange={handleInputs}/>

                    <button type="submit" value="update" onClick={updateUserProfile}>Update</button>
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
                </form>
                   
            {/* <div className='box mb-3'>
                
            </div>  */}
            </div>
            }
            {
                org.length !==0 && org.bloodGroups !== undefined && !spin &&
                <div className="form-container" id="login-form" style={{marginTop:"90px"}} >
                <h1>Update your information</h1>
                <form>
                    <div className='mt-3'>
                        <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" name='bloodGroups' id="ap" value="AP" checked={org.bloodGroups.includes('AP')} onChange={handleCheckbox}/>
                            <label className="form-check-label" htmlFor="inlineCheckbox1" style={{marginLeft:"5px"}}>A+</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" name='bloodGroups' id="an" value="AN" checked={org.bloodGroups.includes('AN')} onChange={handleCheckbox}/>
                            <label className="form-check-label" htmlFor="inlineCheckbox2" style={{marginLeft:"5px"}}>A-</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" name='bloodGroups' id="bp" value="BP" checked={org.bloodGroups.includes('BP')} onChange={handleCheckbox}/>
                            <label className="form-check-label" htmlFor="inlineCheckbox3" style={{marginLeft:"5px"}}>B+</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" name='bloodGroups' id="bn" value="BN" checked={org.bloodGroups.includes('BN')} onChange={handleCheckbox}/>
                            <label className="form-check-label" htmlFor="inlineCheckbox3" style={{marginLeft:"5px"}}>B-</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" name='bloodGroups' id="op" value="OP" checked={org.bloodGroups.includes('OP')} onChange={handleCheckbox}/>
                            <label className="form-check-label" htmlFor="inlineCheckbox3" style={{marginLeft:"5px"}}>O+</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" name='bloodGroups' id="on" value="ON" checked={org.bloodGroups.includes('ON')} onChange={handleCheckbox}/>
                            <label className="form-check-label" htmlFor="inlineCheckbox3" style={{marginLeft:"5px"}}>O-</label>
                    </div>
                    
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" name='bloodGroups' id="abp" value="ABP" checked={org.bloodGroups.includes('ABP')} onChange={handleCheckbox}/>
                            <label className="form-check-label" htmlFor="inlineCheckbox3" style={{marginLeft:"5px"}}>AB+</label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" name='bloodGroups' id="abn" value="ABN" checked={org.bloodGroups.includes('ABN')} onChange={handleCheckbox}/>
                            <label className="form-check-label" htmlFor="inlineCheckbox3" style={{marginLeft:"5px"}}>AB-</label>
                    </div>
                    </div>
                    <div>
                    <label htmlFor="pno">Update Phone number</label>
                    <input type="number" className="form-control w-75" id="pno" placeholder={org.pno} name='pno' onChange={handleOrgInputs}/>

                    <label htmlFor="oano">Update Alternate phone number</label>
                    <input type="number" className="form-control w-75" id="opno" placeholder={org.apno} name='apno' onChange={handleOrgInputs}/>

                    <label htmlFor="oano">Alternate email</label>
                    <input type="email" className="form-control w-75" id="email" placeholder={org.email} name='email' onChange={handleOrgInputs}/>

                    <button type="submit" value="update" onClick={updateProfile}>Update</button>
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
                    </form>
                    </div>
                }

        </div>
        
    )
}

export default Profile
