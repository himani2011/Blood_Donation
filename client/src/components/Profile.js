import React from 'react'

const Profile = () => {
    return (
        <div>
            <div className='box mb-3'>
                <label className='mb-3'>Turn your availability on/off</label>
                <div class="form-check form-switch ">
                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckReverse" />
                    <label class="form-check-label" for="flexSwitchCheckReverse">Not available</label>
                </div>

                <div>

                <label for="pno">Update Phone number</label>
                    <input type="number" className="form-control w-25" id="pno" placeholder="Your phone number" />

                    <label for="apno">Update Alternate phone number</label>
                    <input type="number" className="form-control w-25" id="apno" placeholder="Your Alternate phone number" />

                    <label for="email">Update Email</label>
                    <input type="text" className="form-control w-25" id="email" placeholder="Your Email" />

                </div>
            </div>

            <label className='mb-3'>Organizations, update your blood groups availability : </label>

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

                    <div>
                    <label for="ono">Update Phone number</label>
                    <input type="number" className="form-control w-25" id="ono" placeholder="Your phone number" />

                    <label for="oano">Update Alternate phone number</label>
                    <input type="number" className="form-control w-25" id="oano" placeholder="Your Alternate phone number" />

                    <label for="oano">Alternate email</label>
                    <input type="number" className="form-control w-25" id="oano" placeholder="Your Alternate phone number" />

                    </div>

        </div>
    )
}

export default Profile
