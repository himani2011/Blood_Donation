const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
    name:{
        type:String //,required : true
    },
    age:{
        type:Number
    },
    bloodGroup:{
        type:String
    },
    pno:{
        type:Number
    },
    apno:{
        type:Number
    },
    email:{
        type:String
    },
    pwd:{
        type:String
    },
    cpwd:{
        type:String
    },
    work:{
        type:String
    }
});

const orgSchema = new mongoose.Schema({
    name:{
        type:String //,required : true
    },
    bloodGroups:[{
        type:String
    }],
    pno:{
        type:Number
    },
    apno:{
        type:Number
    },
    email:{
        type:String
    },
    pwd:{
        type:String
    },
    cpwd:{
        type:String
    },
    pos:{
        type:String
    }
});

const Donor = mongoose.model('DONOR',donorSchema);
const Org = mongoose.model('DONOR',orgSchema);

module.exports = {Donor,Org};