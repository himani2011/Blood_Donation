const {Donor,Org} = require("../model/userSchema");
const jwt = require("jsonwebtoken");

const requireAuth = async (req,res,next) =>{
    try {
        const {authorization} = req.headers;
        if(!authorization){
            res.status(401).json({message:"Please login!"});
        }
        const token = authorization;

        const {_id} = jwt.verify(token,process.env.SECRET_KEY);
        req.user = await Donor.findOne({_id});
        req.org = await Org.findOne({_id});
        req.id= await Org.findOne({_id}).select({_id});
        req.did= await Donor.findOne({_id}).select({_id});

        //if(Org.find({ _id: { $exists: true } })){
        next();
        //req.user2 = await Org.findOne({_id});
        

    } catch (error) {
        res.status(401).json({message:error});
    }
}

module.exports = requireAuth;