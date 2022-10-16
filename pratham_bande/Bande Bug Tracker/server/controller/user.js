const Bug = require('../model/bug');
const User = require('../model/user');


exports.getUnassignedUsers = (req,res,next) => {
    User.find({role: "Unassigned"}).then(users => {
        res.send({success:true, users});
    }).catch(err => {
        res.send({success:false});
    })
}

exports.assignRole = (req,res,next) => {
    console.log(req.body.id, req.body.role);
    User.findById(req.body.id).then(user => {
        user.role = req.body.role;
        user.save();
        return res.send({success:true});
    }).catch(err => {
        console.log(err);
    })
}

exports.deleteUser = (req,res,next) => {
    User.findByIdAndRemove(req.body.id).then(() => {
        return res.send({success:true});
    }).catch(err => {
        console.log(err);
    })
}

exports.getTester = (req,res,next) => {
    User.find({$and: [{role: "Tester"}, {$or: [{bugsAssigned: null}, {"bugsAssigned.2" : {"$exists" : false}}]}]}).then(testers => {
        res.send({success:true, testers});
    }).catch(err => {
        console.log(err);
        res.send({success:false});
    })
}

exports.getDeveloper = (req,res,next) => {
    User.find({$and: [{role: "Developer"}, {$or: [{bugsAssigned: null}, {"bugsAssigned.2" : {"$exists" : false}}]}]}).then(developers => {
        res.send({success:true, developers});
    }).catch(err => {
        console.log(err);
        res.send({success:false});
    })
}


exports.assignBugToTester = (req,res,next) => {
    try{
        User.find({_id : { $in : req.body.testerIds}}).then(users => {
            users.forEach(user => {
                user.bugsAssigned.push(req.body.bugId);
                user.save();
            })
        })
        Bug.findById(req.body.bugId).then(bug => {
            req.body.testerIds.forEach(tId => {
                bug.testerIds.push(tId);
            });
            bug.save();
        })
        res.send({success:true});
    }catch(err){
        console.log(err);
        res.send({success:false});
    }
}

exports.assignBugToDeveloper = (req,res,next) => {
    try{
        User.find({_id : { $in : req.body.developerIds}}).then(users => {
            users.forEach(user => {
                user.bugsAssigned.push(req.body.bugId);
                user.save();
            })
        })
        Bug.findById(req.body.bugId).then(bug => {
            req.body.developerIds.forEach(tId => {
                bug.developerIds.push(tId);
            });
            bug.save();
        })
        res.send({success:true});
    }catch(err){
        console.log(err);
        res.send({success:false});
    }
}