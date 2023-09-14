const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const {createTokenUser,attachCookiesToResponse} = require("../utils")

const getAllUsers = async (req, res) => {
  console.log(req.user);
  const users = await User.find().select("-password");
  if (!users) {
    throw new CustomError.NotFoundError("No users available");
  }
  res.status(StatusCodes.OK).send(users);
};

const getSingleUser = async (req, res) => {
  const user = await User.find({ _id: req.params.id }).select("-password");
  if (user.length === 0) {
    throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`);
  }
  res.status(StatusCodes.OK).send(user);
};

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

const updateUser = async (req, res) => {
  const {name,email} = req.body;
  if(!name || !email){
    throw new CustomError.BadRequestError("Enter name and email");
  }
  const user = await User.findOneAndUpdate({_id:req.user.userId},{email,name},{new:true,runValidators:true})

  //we create new token as name is changed 
  const tokenUser = createTokenUser(user);

  attachCookiesToResponse({res,user:tokenUser});
  
  res.status(StatusCodes.OK).json({user:tokenUser});

};

const updateUserPassword = async (req, res) => {

  const {oldPassword,newPassword} = req.body;
  if(!oldPassword || !newPassword){
    throw new CustomError.BadRequestError("Enter new and old password");
  }

  const user = await User.findOne({_id:req.user.userId})

  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if(!isPasswordCorrect){
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }

  user.password = newPassword;

  //save invokes the UserSchema.pre in models/User
  await user.save();
  res.status(StatusCodes.OK).json({msg:"success. password updated"})

  }

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
