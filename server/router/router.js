const express = require('express');
const router = express.Router();
const { Donor, Org } = require('../model/userSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('../db/conn');
const requireAuth = require('../middleware/authentication');

const createToken =(_id) => {
    return jwt.sign({_id},process.env.SECRET_KEY);
}

router.get('/', (req, res) => {
    console.log("From serevr");
    res.send("From server");
});

router.post('/dsignup', async (req, res) => {
    const role=0;
    const isAvailable=true;
    const { name, age, bloodGroup, pno, apno, email, pwd, cpwd, work, state,city } = req.body;

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
            const user = new Donor({ name, age, bloodGroup, pno, apno, email, pwd, cpwd, work, state,city,role,isAvailable });
            const token = createToken(user._id);
            await user.save();
            res.status(201).json({token});
        }
    } catch (error) {
        console.log(error);
    }

})

router.post('/osignup', async (req, res) => {
    const role=1;
    const { name, bloodGroups, pno, apno, email, pwd, cpwd, pos, state,city } = req.body;

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
            const org = new Org({ name, bloodGroups, pno, apno, email, pwd, cpwd, pos, state,city,role });
            const token = createToken(org._id);
            await org.save();
            res.status(201).json({ token });
            //console.log("Saved org:  ",org);
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

    if (orgUser) {
        const isMatchOrg = await bcrypt.compare(pwd, orgUser.pwd);
        
        if (isMatchOrg) {
            const token=createToken(orgUser._id);
            console.log(token);
            res.status(201).json({token});
        } else {
            res.status(401).json({ message: "Invalid cred" });
        }
    }else if (donorUser) {
        const isMatchDonor = await bcrypt.compare(pwd, donorUser.pwd);
        
        if (isMatchDonor) {
            const token = createToken(donorUser._id);
            res.status(201).json({ token});
        } else {
            res.status(401).json({ message: "Invalid cred" });
        }
    }else{
        res.status(401).json({ message: "Unsucess from both" });
    }
    

})

router.get('/profile', requireAuth ,async (req,res) =>{
    try {
        if(req.org){
            //console.log("Req.user: ",req.org);
            res.status(201).json(req.org);    
        }else if(req.user){
            //console.log("Req.user: ",req.user);
            res.status(201).json(req.user); 
        }
       
    } catch (error) {
        console.log(error);
        res.status(422).json({msg: error.message});
    }
});

router.post('/updateProfile',requireAuth,async (req,res)=>{
    try {
        if(req.org){
            const {bloodGroups,pno,apno,email} = req.body;
            const org = req.org;
        
            if(bloodGroups.length!==0){
                await Org.updateOne({_id: org._id},{$set:{bloodGroups:bloodGroups}});
            }
            if(pno!==0){
                await Org.updateOne({_id: org._id},{$set:{pno:pno}});
            }
            if(apno!==0){
                await Org.updateOne({_id: org._id},{$set:{apno:apno}});
            }
            if(email!==""){
                await Org.updateOne({_id: org._id},{$set:{email:email}});
            }
    
            res.status(201).json({msg:"Success"});
        }
        else if(req.user){
            const {isAvailable,pno,apno,email} = req.body;
            //console.log("Req.boydL :",isAvailable)
            const user = req.user;
            if(req.user.isAvailable !== isAvailable){
                await Donor.updateOne({_id:user.id},{$set:{isAvailable:isAvailable}});
            }
            if(pno!==0){
                await Donor.updateOne({_id: user._id},{$set:{pno:pno}});
            }
            if(apno!==0){
                await Donor.updateOne({_id: user._id},{$set:{apno:apno}});
            }
            if(email!==""){
                await Donor.updateOne({_id: user._id},{$set:{email:email}});
            }    
            res.status(201).json({msg:"Success"});
        }
    } catch (error) {
        console.log("Errorrrr:",error)
        res.status(401).json({msg:"Error"})
    }
   
})

router.get('/donorResults/:st/:ct/:bg', async (req,res)=>{
    let st = req.params.st;
    let ct = req.params.ct;
    let bg = req.params.bg;

    // if (!st || !ct || !bg) {
    //     res.status(401).json({ message: "please fill all the fields" });
    // }

    filtered= await Donor.find({$and: [{state:st},{city:ct},{bloodGroup:bg},{isAvailable:true}]});

    res.status(201).json(filtered);
})

router.get('/orgResults/:st/:ct/:bg', async (req,res)=>{
    let st = req.params.st;
    let ct = req.params.ct;
    let bg = req.params.bg;
    
    filtered= await Org.find({$and: [{state:st},{city:ct},{ bloodGroups: { $in: bg } }]});
    console.log("Filtered: ",filtered);

    res.status(201).json(filtered);
})

module.exports = router;