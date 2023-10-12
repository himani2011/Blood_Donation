const express = require('express');
const router = express.Router();
const { Donor, Org } = require('../model/userSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('../db/conn');
const requireAuth = require('../middleware/authentication');
const nodemailer = require('nodemailer')

const createToken =(_id) => {
    return jwt.sign({_id},process.env.SECRET_KEY,{expiresIn:"1d"});
}

router.get('/', (req, res) => {
    console.log("From serevr");
    res.send("From server");
});

router.post('/dsignup', async (req, res) => {
    const role=0;
    const pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passPattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const isAvailable=true;
    const { name, age, bloodGroup, pno, apno, email, pwd, cpwd, work, state,city } = req.body;

       if(!name|| !age|| !bloodGroup|| !pno|| !email|| !pwd|| !cpwd || !work){
        return res.status(401).json({message:"PLease fill all the required fields!"});
       }
       if(age.length >=3){
        return res.status(401).json({message:"Enter a valid age!"});
       }
       if(pno.length !== 10){
        return res.status(401).json({message:"Enter a valid phone number!"});
       }
       if(apno !== '' && apno.length !== 10){
        return res.status(401).json({message:"Enter a valid alternate phone number!"});
       }
       if(apno !== '' && apno === pno){
        return res.status(401).json({message:"Enter a different alternate phone number!"});
       }
       if(!pattern.test(email)){
        return res.status(401).json({message:"Enter a valid email address!"});
       }
       if(!passPattern.test(pwd)){
        return res.status(401).json({message:"Password should be of the given format!"});
       }
       if(!passPattern.test(cpwd)){
        return res.status(401).json({message:"Password should be of the given format!"});
       }
       if(pwd !== cpwd){
        return res.status(401).json({message:"Passwords don't match!"});
       }
       
       
    try {
        const userExists = await Donor.findOne({ email: email });
        const existstInOrg = await Org.findOne({email:email});

        if (userExists||existstInOrg) {
            return res.status(401).json({ message: "User already exists!" });
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
    const pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const { name, bloodGroups, pno, apno, email, pwd, cpwd, pos, state,city } = req.body;

       if(!name|| !pno || !email|| !pwd|| !cpwd || !pos|| !state || !city){
        return res.status(401).json({message:"PLease fill all the required fields!"});
       }
       if(pno.length !== 10){
        return res.status(401).json({message:"Enter a valid phone number!"});
       }
       if(apno !== '' && apno.length !== 10){
        return res.status(401).json({message:"Enter a valid alternate phone number!"});
       }
       if(apno !== '' && apno === pno){
        return res.status(401).json({message:"Enter a different alternate phone number!"});
       }
       if(!pattern.test(email)){
        return res.status(401).json({message:"Enter a valid email address!"});
       }
       if(pwd.length < 8){
        return res.status(401).json({message:"Password should be of the given format!"});
       }
       if(pwd !== cpwd){
        return res.status(401).json({message:"Passwords don't match!"});
       }

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
        }
    } catch (error) {
        console.log(error);
    }
})


router.post('/login', async (req, res) => {
    try {
    
    const { email, pwd } = req.body;

    if (email.length === 0 || pwd.length === 0) {
        res.status(401).json({ message: "Please fill all the fields" });
    }

    const orgUser = await Org.findOne({ email: email });
    const donorUser = await Donor.findOne({ email: email });

    if (orgUser) {
        const isMatchOrg = bcrypt.compare(pwd, orgUser.pwd);
        
        if (isMatchOrg) {
            const token=createToken(orgUser._id);
            console.log(token);
            res.status(201).json({token});
        } else {
            res.status(401).json({ message: "Invalid credentials! Please try again!" });
        }
    }else if (donorUser) {
        const isMatchDonor = bcrypt.compare(pwd, donorUser.pwd);
        
        if (isMatchDonor) {
            const token = createToken(donorUser._id);
            res.status(201).json({ token});
        } else {
            res.status(401).json({ message: "Invalid credentials! Please try again!" });
        }
    }else{
        res.status(401).json({ message: "Unsucess from both" });
    }
    } catch (error) {
        console.log(error)
    }
})

router.post('/forgotPassword',async (req,res)=>{
    try {
        const pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const { email} = req.body;
    
        if (email.length === 0 || !pattern.test(email)) {
            res.status(401).json({ message: "Please provide a valid email!" });
        }
    
        const orgUser = await Org.findOne({ email: email });
        const donorUser = await Donor.findOne({ email: email });
    
        if (orgUser) {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'testnm1111@gmail.com',
                  pass: process.env.PWD
                }
              });
              
              var mailOptions = {
                from: 'testnm1111@gmail.com',
                to: email,
                subject: 'Reset your password for BloodHelp',
                text: `http://localhost:3000/resetPassword/${orgUser._id}`
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  return res.status(201).json({message:"Recovery email sent to your email address!"})
                }
              });
        }else if (donorUser) {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'testnm1111@gmail.com',
                  pass: process.env.PWD
                }
              });
              
              var mailOptions = {
                from: 'testnm1111@gmail.com',
                to: email,
                subject: 'Reset your password for BloodHelp',
                text: `http://localhost:3000/resetPassword/${donorUser._id}`
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  return res.status(201).json({message:"Recovery email sent to your email address!"})
                }
              });
        }else{
            res.status(401).json({ message: "User does not exist! Please sign up first!" });
        }
        } catch (error) {
            console.log(error)
        }
})

router.post('/resetPassword/:id',async(req,res)=>{
    try {
        console.log("Router")
        let {pwd,cpwd} = req.body;
        const {id} = req.params;

        if(!pwd || !cpwd){
            return res.status(401).json({message:"Please fill both the fields!"});
        }
        if(pwd !== cpwd){
            return res.status(401).json({message:"Passwords don't match!"});
        }

        pwd = await bcrypt.hash(pwd,12);
        cpwd = await bcrypt.hash(cpwd,12);

        const orgUser = await Org.findOne({ _id: id });
        const donorUser = await Donor.findOne({ _id: id });

        if(donorUser){
            await Donor.findByIdAndUpdate({_id:id},{$set:{pwd:pwd}},{$set:{cpwd:cpwd}});
            res.status(201).json({message:"Password reset successful!"});

        }else if(orgUser){
            await Org.findByIdAndUpdate({_id:id},{$set:{pwd:pwd}},{$set:{cpwd:cpwd}});
            res.status(201).json({message:"Password reset successful!"});
        }
        else{
            res.status(401).json({message:"Password reset unsuccessful!"});
        }
    } catch (error) {
        console.log(error)
    }
})
router.get('/profile', requireAuth ,async (req,res) =>{
    try {
        if(req.org){
            res.status(201).json(req.org);    
        }else if(req.user){
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
            const pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const {bloodGroups,email} = req.body;
            const pno=Number(req.body.pno);
            const apno=Number(req.body.apno);
            const org = req.org;

            console.log("org.pno: ",org.pno)
            console.log("pno: ",pno)
            console.log("org.apno: ",org.apno)
            console.log("apno: ",apno)

            
            // for array comparision: JSON.stringify(bloodGroups)
            if((JSON.stringify(bloodGroups) === JSON.stringify(org.bloodGroups)) && pno===org.pno && apno === org.apno && email === org.email){
                return res.status(401).json({message:"At least update one field!"});
            }
            if(pno !== org.pno && pno.toString().length !== 10){
                return res.status(401).json({message:"Enter a valid phone nujhmber!"});
            }

            if(apno !== org.apno && apno.toString().length !== 10 && apno.toString().length !== 1){
            return res.status(401).json({message:"Enter a valid alternate phone number!"});
            }
            if(pno !== org.pno &&  pno === apno){
                return res.status(401).json({message:"Enter a different phone number!"});
            }
        
            if(apno !== 0 && apno === pno){
            return res.status(401).json({message:"Enter a different alternate phone number!"});
            }
            if(email!==org.email && !pattern.test(email)){
            return res.status(401).json({message:"Enter a valid email address!"});
            } 

            //--------updating----------
            if(JSON.stringify(bloodGroups) !== JSON.stringify(org.bloodGroups)){
                await Org.updateOne({_id: org._id},{$set:{bloodGroups:bloodGroups}});
            }
            if(pno!==org.pno){
                await Org.updateOne({_id: org._id},{$set:{pno:pno}});
            }
            if(apno!==org.apno){
                await Org.updateOne({_id: org._id},{$set:{apno:apno}});
            }
            if(email!==org.email){
                await Org.updateOne({_id: org._id},{$set:{email:email}});
            }
            const data = await Org.findOne({email:email})
            res.status(201).json(data);
        }
        else if(req.user){
            const pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const {isAvailable,email} = req.body;
            const pno=Number(req.body.pno);
            const apno=Number(req.body.apno);

            const user = req.user;

            //-----------if everything is unchanged or for errors--------
            if(isAvailable===user.isAvailable && pno===user.pno && apno === user.apno && email === user.email){
                return res.status(401).json({message:"At least update one field!"});
            }//WORKING


            //if pno is changed and not a valid one
            if(pno !== user.pno && pno.toString().length !== 10){
                return res.status(401).json({message:"Enter a valid phone number!"});
            } //WORKING

            if(pno != user.pno && pno == apno){
                return res.status(401).json({message:"Enter a different phone number!"});
            }
            if(apno !== user.apno && apno.toString().length !== 10){
            return res.status(401).json({message:"Enter a valid alternate phone number!"});
            }//WORKING
           

            if(apno !== user.apno && apno === pno){
            return res.status(401).json({message:"Enter a different alternate phone number!"});
            }


            if(email !== user.email && !pattern.test(email)){
            return res.status(401).json({message:"Enter a valid email address!"});
            } //WORKING

        
            //-----------Updating---------- 
            if(user.isAvailable !== isAvailable){
               await Donor.updateOne({_id:user.id},{$set:{isAvailable:isAvailable}});
            }
            if(pno!==user.pno){
                await Donor.updateOne({_id: user._id},{$set:{pno:pno}});
            }
            if(apno!==user.apno){
                await Donor.updateOne({_id: user._id},{$set:{apno:apno}});
            }
            if(email!==user.email){
                await Donor.updateOne({_id: user._id},{$set:{email:email}});
            }    
           
            const data = await Donor.findOne({email:email})
            if(user.apno===pno || pno===apno){
                console.log("Phnumners are same")
            }else{
                console.log("Not same ")
            }

            res.status(201).json(data);
        }
    } catch (error) {
        console.log("Errorrrr:",error)
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