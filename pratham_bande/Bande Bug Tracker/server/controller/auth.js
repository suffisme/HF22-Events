const User = require('../model/user');
const bcrypt = require('bcrypt');

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email }).then(user => {
        if (!user) {
            return res.send({ success: false, message: "Invalid Credentials" });
        }
        bcrypt.compare(password, user.password).then(doMatch => {
            if (doMatch) {
                req.session.isLoggedIn = true;
                req.session.user = user;
                req.session.save(err => {
                    console.log(err);
                });
                return res.send({ success: true, user, message: "Logged In ! You will be redirected to Home Page" });
            } else {
                return res.send({ success: false, message: "Invalid Credentials" });
            }
        })
    })
}

exports.cookieCheck = (req, res, next) => {
    if (req.session.user) {
        User.findOne({ _id: req.session.user._id }).then(user => {
            if (user) {
                res.send({ isLoggedIn: true, user });
            } else {
                res.send({ isLoggedIn: false });
            }
        })
    } else {
        res.send({ isLoggedIn: false });
    }
}

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
    })
    res.sendStatus(200);
}

exports.postSignup = (req, res, next) => {
    User.findOne({ email: req.body.email }).then(userDoc => {
        if (userDoc) {
            return res.send({ success: false, message: "Email Already Exists !" });
        }
        const hasher = async () => {
            return await bcrypt.hash(req.body.password, 12);
        }

        hasher().then(hashedPassword => {
            const user = new User({
                ...req.body,
                password: hashedPassword
            });
            return user.save();
        }).then(() => {
            res.send({ success: true, message: "Account Successfully Created, Welcome Aboard ! Proceed to Login ..." });
        })
    }).catch(err => {console.log(err);})
}
