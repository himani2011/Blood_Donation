import React from 'react';

const Signup = () => {
    return (
        <div>
            <div className='box mb-3'>
                <div className="form-check form-check-inline mt-3">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                    <label className="form-check-label" for="inlineRadio1">Are you a donor? (An Individual)</label>
                </div>
                <div className="form-check form-check-inline mb-3">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                    <label className="form-check-label" for="inlineRadio2">Are you an organization? (A hospital, PHC etc)</label>
                </div>
            </div>

            <div className="mb-3 box">
                <form method='POST' className='register-form' id='register-form'>
                    <label for="name">Name</label>
                    <input type="text" className="form-control w-25" id="name" placeholder="Your name" />

                    <label for="age">Age</label>
                    <input type="number" className="form-control w-25" id="age" placeholder="Your age" />

                    <label for="bgroup">Blood group </label>
                    <p>(Write P for Positive and N for Negative. Eg. write AP if blood group is A positive and write BN for B positive blood group)</p>
                    <input type="text" className="form-control w-25" id="bgroup" placeholder="Your blood group" />

                    <label for="pno">Phone number</label>
                    <input type="number" className="form-control w-25" id="pno" placeholder="Your phone number" />

                    <label for="apno">Alternate phone number</label>
                    <input type="number" className="form-control w-25" id="apno" placeholder="Your Alternate phone number" />

                    <label for="work">Profession</label>
                    <input type="work" className="form-control w-25" id="work" placeholder="Your Profession" />

                    <label for="email">Email</label>
                    <input type="text" className="form-control w-25" id="email" placeholder="Your Email" />

                    <label for="pwd">Password</label>
                    <input type="text" className="form-control w-25" id="pwd" placeholder="Your Password" />

                    <label for="cpwd">Confirm password</label>
                    <input type="name" className="form-control w-25" id="cpwd" placeholder="Your password again" />

                    <input className="btn btn-primary" type="submit" value="Signup"></input>
                </form>
            </div>


            <div className="mb-3 box">
                <form method='POST' className='register-form' id='register-form'>
                    <label for="oname">Name</label>
                    <input type="text" className="form-control w-25" id="oname" placeholder="Your name" />

                    <label for="pos">Position</label>
                    <input type="text" className="form-control w-25" id="pos" placeholder="Your Position" />

                    <label for="ono">Phone number</label>
                    <input type="number" className="form-control w-25" id="ono" placeholder="Your phone number" />

                    <label for="oano">Alternate phone number</label>
                    <input type="number" className="form-control w-25" id="oano" placeholder="Your Alternate phone number" />

                    <label>Available blood groups with you:</label><br/>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="ap" value="ap"/>
                            <label className="form-check-label" for="inlineCheckbox1">A+</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="an" value="an"/>
                            <label className="form-check-label" for="inlineCheckbox2">A-</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="bp" value="bp" />
                            <label className="form-check-label" for="inlineCheckbox3">B+</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="bn" value="bn" />
                            <label className="form-check-label" for="inlineCheckbox3">B-</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="op" value="op" />
                            <label className="form-check-label" for="inlineCheckbox3">O+</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="on" value="on" />
                            <label className="form-check-label" for="inlineCheckbox3">O-</label>
                    </div>
                    
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="abp" value="abp" />
                            <label className="form-check-label" for="inlineCheckbox3">AB+</label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="abn" value="abn" />
                            <label className="form-check-label" for="inlineCheckbox3">AB-</label>
                    </div>
                    <br/>

                    <label for="oemail">Email</label>
                    <input type="text" className="form-control w-25" id="oemail" placeholder="Your Email" />

                    <label for="opwd">Password</label>
                    <input type="text" className="form-control w-25" id="opwd" placeholder="Your Password" />

                    <label for="ocpwd">Confirm password</label>
                    <input type="name" className="form-control w-25" id="ocpwd" placeholder="Your password again" />

                    <input className="btn btn-primary" type="submit" value="Signup"></input>
                </form>
            </div>
        </div>
    )
}

export default Signup
