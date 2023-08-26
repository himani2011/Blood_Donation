const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
    },
    state:{
        type:String
    },
    city:{
        type:String
    },
    role:{
        type:Number
    },
    isAvailable:{
        type:Boolean
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
    },
    state:{
        type:String
    },
    city:{
        type:String
    },
    role:{
        type:Number
    }
});

donorSchema.pre('save',async function(next){
    if(this.isModified('pwd')){
        this.pwd = await bcrypt.hash(this.pwd,12);
        this.cpwd = await bcrypt.hash(this.cpwd,12);
    }
    next();
});

orgSchema.pre('save',async function(next){
    if(this.isModified('pwd')){
        this.pwd = await bcrypt.hash(this.pwd,12);
        this.cpwd = await bcrypt.hash(this.cpwd,12);
    }
    next();
});

const Donor = mongoose.model('DONOR',donorSchema);
const Org = mongoose.model('ORG',orgSchema);

module.exports = {Donor,Org};