import React from 'react'

const OrgSignup = () => {
  return (
    <div>
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

export default OrgSignup
