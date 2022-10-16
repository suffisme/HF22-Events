const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role,
  });

  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) if email and password exists
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  // 2) Check if email and password are correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError('Incorrect Email or Password', 401));

  // 3) If everything is correct, send token to client
  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  // 1) Getting the token and check if it exists
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token)
    return next(
      new AppError('you are no logged in. Please log in to continue', 401)
    );

  // 2) Verification of Token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser)
    return next(
      new AppError(
        'The user belonging to this token no longer exists. Please log in to continue',
        401
      )
    );

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat))
    return next(
      new AppError(
        'User recently changed password. Please log in to continue',
        401
      )
    );

  //GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});

exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    // roles ['admin', 'lead-guide'],
    if (!roles.includes(req.user.role))
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    next();
  };

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new AppError('No user exists with that email', 404));

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email address
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/reset-password/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and password Confirm to :${resetURL}.\n If you didnt forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token will expire in 10 minutes',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError('There was an error sending the email. Please try again'),
      500
    );
  }
});
exports.resetPassword = catchAsync(async (req, res, next) => {
  //1) Get user based on the tokens
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  //2) If token not expired and user is found, set new password
  if (!user) return next(new AppError('Token is invalid or has expired', 400));
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  //3) Update ChangedPasswordAt property for the user.
  //4)Log the user in and send JWT.
  createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  //1) Get user from collection
  const user = await User.findById(req.user.id).select('+password');

  //2) Check if POSTed user current password is correct

  if (!(await user.correctPassword(req.body.passwordCurrent, user.password)))
    return next(new AppError('Your current password is incorrect'), 401);

  //3) If so, update password
  user.password = req.body.password;

  user.passwordConfirm = req.body.passwordConfirm;

  await user.save();

  //4) Log user in
  createSendToken(user, 200, res);
});
