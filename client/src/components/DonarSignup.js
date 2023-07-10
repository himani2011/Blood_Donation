import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const DonorSignup = () => {

    const navigateTo = useNavigate();

    const [user,setUser] = useState({
        name:"",
        age:"",
        bloodGroup:"",
        pno:"",
        apno:"",
        email:"",
        pwd:"",
        cpwd:"",
        work:""
    });

    let name,value;
    const handleInputs = (e) =>{
        name=e.target.name;
        value=e.target.value;
        setUser({...user,[name]:value});

    }

    const PostData = async (e) =>{
        e.preventDefault();

        const {name,age,bloodGroup,pno,apno,email,pwd,cpwd,work} = user;
        
        const res = await fetch("/dsignup",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,age,bloodGroup,pno,apno,email,pwd,cpwd,work
            })
        });


        const data = await res.json();
        if(data.status === 422 || !data){
            window.alert("Invalid registration!!");
        }
        else{
            localStorage.setItem("TOKEN",data.token);
            navigateTo("/");
        }
    }
    
    
    return (
        <div>
            {/* <div className='box mb-3'>
                <div className="form-check form-check-inline mt-3">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                    <label className="form-check-label" htmlFor="inlineRadio1">Are you a donor? (An Individual)</label>
                </div>
                <div className="form-check form-check-inline mb-3">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                    <label className="form-check-label" htmlFor="inlineRadio2">Are you an organization? (A hospital, PHC etc)</label>
                </div>
            </div> */}

            <div className="mb-3 box">
                <form method='POST' className='register-form' id='register-form'>
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control w-25" id="name" placeholder="Your name" name="name" value={user.name} onChange={handleInputs}/>

                    <label htmlFor="age">Age</label>
                    <input type="number" className="form-control w-25" id="age" placeholder="Your age" name="age" value={user.age} onChange={handleInputs}/>

                    <label htmlFor="bgroup">Blood group </label>
                    <p>(Write P for Positive and N for Negative. Eg. write AP if blood group is A positive and write BN for B positive blood group)</p>
                    <input type="text" className="form-control w-25" id="bloodGroup" placeholder="Your blood group" name="bloodGroup" value={user.bloodGroup} onChange={handleInputs}/>

                    <label htmlFor="pno">Phone number</label>
                    <input type="number" className="form-control w-25" id="pno" placeholder="Your phone number" name="pno" value={user.pno} onChange={handleInputs}/>

                    <label htmlFor="apno">Alternate phone number</label>
                    <input type="number" className="form-control w-25" id="apno" placeholder="Your Alternate phone number" name="apno" value={user.apno} onChange={handleInputs}/>

                    <label htmlFor="work">Profession</label>
                    <input type="work" className="form-control w-25" id="work" placeholder="Your Profession" name="work" value={user.work} onChange={handleInputs}/>

                    <label htmlFor="email">Email</label>
                    <input type="text" className="form-control w-25" id="email" placeholder="Your Email" name="email" value={user.email} onChange={handleInputs}/>

                    <label htmlFor="pwd">Password</label>
                    <input type="text" className="form-control w-25" id="pwd" placeholder="Your Password" name="pwd" value={user.pwd} onChange={handleInputs}/>

                    <label htmlFor="cpwd">Confirm password</label>
                    <input type="name" className="form-control w-25" id="cpwd" placeholder="Your password again" name="cpwd" value={user.cpwd} onChange={handleInputs}/>

                    <input className="btn btn-primary" type="submit" value="Signup" onClick={PostData}/>
                </form>
            </div>
        </div>
    )
}

export default DonorSignup
