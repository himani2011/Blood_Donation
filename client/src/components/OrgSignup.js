import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const OrgSignup = () => {

    const navigateTo = useNavigate();

    const [user,setUser] = useState({
        name:"",
        bloodGroups:[],
        pno:"",
        apno:"",
        email:"",
        pwd:"",
        cpwd:"",
        pos:""
    });

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

        const {name,bloodGroups,pno,apno,email,pwd,cpwd,pos} = user;
        
        const res = await fetch("/osignup",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,bloodGroups,pno,apno,email,pwd,cpwd,pos
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
      <div className="mb-3 box">
                <form method='POST' className='register-form' id='register-form'>
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control w-25" id="name" placeholder="Your name"  name='name'  value={user.name} onChange={handleInputs}/>

                    <label htmlFor="pos">Position</label>
                    <input type="text" className="form-control w-25" id="pos" placeholder="Your Position" name='pos'  value={user.pos} onChange={handleInputs}/>

                    <label htmlFor="pno">Phone number</label>
                    <input type="number" className="form-control w-25" id="pno" placeholder="Your phone number" name='pno' value={user.pno} onChange={handleInputs}/>

                    <label htmlFor="apno">Alternate phone number</label>
                    <input type="number" className="form-control w-25" id="apno" placeholder="Your Alternate phone number" name='apno' value={user.apno} onChange={handleInputs}/>

                    <label>Available blood groups with you:</label><br/>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="ap" name='bloodGroups' value="AP" checked={user.bloodGroups.includes('AP')} onChange={handleCheckbox}/>
                            <label className="form-check-label" htmlFor="ap">A+</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="an" name='bloodGroups' value="AN" checked={user.bloodGroups.includes('AN')} onChange={handleCheckbox}/>
                            <label className="form-check-label" htmlFor="an">A-</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="bp" name='bloodGroups' value="BP" checked={user.bloodGroups.includes('BP')} onChange={handleCheckbox}/>
                            <label className="form-check-label" htmlFor="bp">B+</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="bn" name='bloodGroups' value="BN" checked={user.bloodGroups.includes('BN')} onChange={handleCheckbox} />
                            <label className="form-check-label" htmlFor="bn">B-</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="op" name='bloodGroups' value="OP" checked={user.bloodGroups.includes('OP')} onChange={handleCheckbox} />
                            <label className="form-check-label" htmlFor="op">O+</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="on" name='bloodGroups' value="ON" checked={user.bloodGroups.includes('ON')} onChange={handleCheckbox} />
                            <label className="form-check-label" htmlFor="on">O-</label>
                    </div>
                    
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="abp" name='bloodGroups' value="ABP" checked={user.bloodGroups.includes('ABP')} onChange={handleCheckbox} />
                            <label className="form-check-label" htmlFor="abp">AB+</label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="abn" name='bloodGroups' value="ABN" checked={user.bloodGroups.includes('ABN')} onChange={handleCheckbox} />
                            <label className="form-check-label" htmlFor="abn">AB-</label>
                    </div>
                    <br/>

                    <label htmlFor="email">Email</label>
                    <input type="text" className="form-control w-25" id="email" placeholder="Your Email" name='email' value={user.email} onChange={handleInputs}/>

                    <label htmlFor="pwd">Password</label>
                    <input type="text" className="form-control w-25" id="pwd" placeholder="Your Password" name='pwd' value={user.pwd} onChange={handleInputs}/>

                    <label htmlFor="cpwd">Confirm password</label>
                    <input type="name" className="form-control w-25" id="cpwd" placeholder="Your password again" name='cpwd' value={user.cpwd} onChange={handleInputs}/>

                    <input className="btn btn-primary" type="submit" value="Signup" onClick={PostData}/>
                </form>
            </div>
    </div>
  )
}

export default OrgSignup
