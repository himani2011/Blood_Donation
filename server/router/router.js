const express = require('express');
const router = express.Router();
const { Donor, Org } = require('../model/userSchema');
//const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

require('../db/conn');

router.get('/', (req, res) => {
    console.log("From serevr");
    res.send("From server");
});

router.post('/dsignup', async (req, res) => {
    const { name, age, bloodGroup, pno, apno, email, pwd, cpwd, work } = req.body;

    //    if(!name|| !age|| !bloodGroup|| !pno|| !apno|| !email|| !pwd|| !cpwd,!work){
    //     return res.status(401).json({message:"PLease fill all the required fields!"});
    //    }

    try {
        const userExists = await Donor.findOne({ email: email });
        const existstInOrg = await Org.findOne({email:email});

        if (userExists||existstInOrg) {
            return res.status(401).json({ message: "User already exists!" });
        }
        else if (pwd != cpwd) {
            return res.status(401).json({ message: "Passwords don't match" });
        }
        else {
            const user = new Donor({ name, age, bloodGroup, pno, apno, email, pwd, cpwd, work });
            await user.save();
            return res.status(201).json({ message: "success!" });
        }
    } catch (error) {
        console.log(error);
    }

})

router.post('/osignup', async (req, res) => {
    const { name, bloodGroups, pno, apno, email, pwd, cpwd, pos } = req.body;

    //    if(!name|| !bloodGroups|| !pno|| !apno|| !email|| !pwd|| !cpwd,!pos){
    //     return res.status(401).json({message:"PLease fill all the required fields!"});
    //    }

    try {
        const userExists = await Org.findOne({ email: email });
        const existstInDonor = await Donor.findOne({email:email});

        if (userExists || existstInDonor) {
            return res.status(401).json({ message: "User already exists!" });
        }
        else if (pwd != cpwd) {
            return res.status(401).json({ message: "Passwords don't match" });
        }
        else {
            const org = new Org({ name, bloodGroups, pno, apno, email, pwd, cpwd, pos });
            await org.save();
            return res.status(201).json({ message: "success!" });
        }
    } catch (error) {
        console.log(error);
    }
})


router.post('/login', async (req, res) => {
    const { email, pwd } = req.body;

    if (!email || !pwd) {
        res.status(401).json({ message: "please fill all the fields" });
    }

    const orgUser = await Org.findOne({ email: email });
    const donorUser = await Donor.findOne({ email: email });

    if (orgUser || donorUser) {
        const isMatchOrg = await bcrypt.compare(pwd, orgUser.pwd);
        const isMatchDonor = await bcrypt.compare(pwd, donorUser.pwd);
        //console.log(isMatchDonor);
        //

        if (isMatchOrg|| isMatchDonor) {
            res.status(201).json({ message: "Login success" });
        } else {
            res.status(401).json({ message: "Invalid cred" });
        }
    }else{
        res.status(401).json({ message: "Unsucess" });
    }



})
module.exports = router;