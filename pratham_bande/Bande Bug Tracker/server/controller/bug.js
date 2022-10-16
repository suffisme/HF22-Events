const Bug = require('../model/bug');
const User = require('../model/user');
const BugHistory = require('../model/bugHistory');
const mongoose = require('mongoose');

exports.postBug = (req,res,next) => {
    try{
        const bug = new Bug({
            ...req.body,
            userId: req.session.user._id
        });
        bug.save();
        console.log(bug);
        res.send({success:true, message:"Your Bug has been reported. Thank You."});
    }catch(error){
        console.log(error);
        res.send({success:false, message:"An error occured. We are working on it ... (dont report this as bug lol)"});
    }
}

exports.getUserReportedBugs = (req,res,next) => {
    Bug.find({userId : req.session.user._id}).then(bugsDoc => {
        res.send({success:true, bugs:bugsDoc});
        return;
    }).catch(err => {
        console.log(err);
        res.send({success:false, bugs:bugsDoc});
    })
}

exports.getBug = (req,res,next) => {
    Bug.findById(req.body.id).then(bug => {
        if(bug){
            res.send({success: true, bug});
        }else{
            res.send({success: false});
        }
    }).catch(err=>{
        console.log(err);
        res.send({success: false});
    })
}

exports.getTesterPendingBugs = (req,res,next) => {
    Bug.find({"testerIds.0" : {"$exists" : false}}).then(bugsDoc => {
        res.send({success:true, bugs:bugsDoc});
        return;
    }).catch(err => {
        console.log(err);
        res.send({success:false, bugs:[]});
    })
}

exports.getDeveloperPendingBugs = (req,res,next) => {
    Bug.find({$and : [{"developerIds.0" : {"$exists" : false}}, {testerVerified : true}] }).then(bugsDoc => {
        res.send({success:true, bugs:bugsDoc});
        return;
    }).catch(err => {
        console.log(err);
        res.send({success:false, bugs:[]});
    })
}

exports.getTesterVerificationPendingBugs = (req,res,next) => {
    //let BugIds = [];
    User.findById(req.session.user._id).then(user => {
        // console.log(user);
        // console.log(user.bugsAssigned);
        return user.bugsAssigned;
    }).then(BugIds => {
        Bug.find({$and : [{_id : {$in : BugIds}}, {testerVerified: false}]}).then(bugs => {
            res.send({success:true, bugs});
        })
    }).catch(err => {
        console.log(err);
        res.send({success:false, bugs:[]});
    })
}

exports.getDeveloperUnworkedBugs = (req,res,next) => {
    //let BugIds = [];
    User.findById(req.session.user._id).then(user => {
        // console.log(user);
        // console.log(user.bugsAssigned);
        return user.bugsAssigned;
    }).then(BugIds => {
        Bug.find({$and : [{_id : {$in : BugIds}}, {developerWorked: false}]}).then(bugs => {
            res.send({success:true, bugs});
        })
    }).catch(err => {
        console.log(err);
        res.send({success:false, bugs:[]});
    })
}

exports.deleteBug = (req,res,next) => {
    Bug.findOneAndRemove({_id:req.body.id}).then(() => {
        res.send({success:true, message: "Successfully Deleted"});
    }).catch(err => {
        console.log(err)
        res.send({success:false, message: "Error Occured >.<"});
    })
}

exports.verifyBug = (req,res,next) => {
    Bug.findById(req.body.id).then((bug) => {
        if(!bug.testerVerified){
            bug.testerVerified = true;
            bug.save();
        }else if(!bug.developerWorked){
            bug.developerWorked = true;
            bug.save();
        }else{
            bug.testerApproved = true;
            bug.save();
            
            // const bugHistory = new BugHistory(bug);
            // bugHistory.save();
            // //Bug.findByIdAndRemove(req.body.id);
        }
        res.send({success:true, message: "Successfully Recorded !!"});
    }).catch(err => {
        console.log(err)
        res.send({success:false, message: "Error Occured >.<"});
    })
}

exports.rollBackToDev = (req,res,next) => {
    Bug.findById(req.body.id).then(bug => {
        bug.developerWorked = false;
        bug.save();
        res.send({success:true, message: "Successfully Recorded !!"});
    }).catch(err => {
        console.log(err)
        res.send({success:false, message: "Error Occured >.<"});
    })
}

exports.getTesterApprovalPendingBugs = (req,res,next) => {
    User.findById(req.session.user._id).then(user => {
        return user.bugsAssigned;
    }).then(BugIds => {
        Bug.find({$and : [{_id : {$in : BugIds}}, {developerWorked: true}, {testerApproved: false}]}).then(bugs => {
            res.send({success:true, bugs});
        })
    }).catch(err => {
        console.log(err);
        res.send({success:false, bugs:[]});
    })
}