import { jwtHelper } from "../helpers/jwt.helper.mjs";
import { User } from "../models/index.mjs";
import { hashPassword, comparePassword } from "../helpers/users.helper.mjs";
import { MailService } from "../services/index.mjs";
import { config } from "../config/config.mjs";

export const login = async (req, res, next) => {
  const { username, password,email } = req.body;
  try {
    const exists = await User.findOne({ ...(email?{email}:{}),...(username?{username}:{}),is_superuser:true }).lean().exec();
    if (exists) {
      const isMatch = comparePassword(exists.password, password);
      if (isMatch) {
        const token = await jwtHelper.signAccessToken(exists);
        const user=await User.findByIdAndUpdate(exists?._id,{last_login:new Date()}, {
          new: true,
        }).lean();
        var message = "Successfully Singed In ";
        delete user.password;
        var responseData = {   token, user };
        return res.json({
          message,
          payload: responseData,
        });
      } else {
        let err = "Invalid Password";
        return res.status(404).json({ error: { code: 404, message: err } });
      }
    } else {
      let err = "User doesn't exists or not superuser";
      return res.status(404).json({ error: { code: 404, message: err } });
    }
  } catch (error) {
    next(error);
  }
};
export const loginWithWalletAddr = async (req, res, next) => {
  const { wallet_addr } = req.body;
  try {
    const exists = await User.findOne({wallet_addr:wallet_addr}).lean().exec();
    if (exists) {
        const token = await jwtHelper.signAccessToken(exists);
        const user=await User.findByIdAndUpdate(exists?._id,{last_login:new Date()}, {
          new: true,
        }).lean();
        var message = "Successfully Singed In ";
        delete user.password;
        var responseData = {   token, user };
        return res.json({
          message,
          payload: responseData,
        });
     
    } else {
      let err = "User doesn't exists ";
      return res.status(404).json({ error: { code: 404, message: err } });
    }
  } catch (error) {
    next(error);
  }
};
export const signup = async (req, res, next) => {
  try {
    let userData = req.body;
  let {email,username}=userData;
    if (email||username) {
      const checkemail = await User.findOne({ ...(email?{email}:{}),...(username?{username}:{}) });
      if(checkemail) return res.status(404).json({ error: { code: 404, message: 'Email or Name already exists' } });
    }
    let encryptedPassword = hashPassword(userData.password);
    let newUser = await User.create({
      ...userData,
      password: encryptedPassword,
    });
    let token = await jwtHelper.signAccessToken(newUser);
    delete newUser.password;
    return res.json({
      message: "Signup Successfully!",
      payload: { user: newUser,   token },
    });
  } catch (error) {
    next(error);
  }
};
export const createWithWalletAddr = async (req, res, next) => {
  try {
    let userData = req.body;
  let {wallet_addr}=userData;
    if (wallet_addr) {
      const checkemail = await User.findOne({ wallet_addr });
      if(checkemail) return res.status(404).json({ error: { code: 404, message: 'wallet_address already exists' } });
    }
    let newUser = await User.create({
      ...userData,
    });
    let token = await jwtHelper.signAccessToken(newUser);
    delete newUser?.password;
    return res.json({
      message: "Signup Successfully!",
      payload: { user: newUser,   token },
    });
  } catch (error) {
    next(error);
  }
};


export const forgotPassword = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email }).lean().exec();
    if (!user) {
      return res.status(401).json({
        error: {
          code: 401,
          message: "Authentication failed. Invalid user.",
        },
      });
    }
    let token = await jwtHelper.forgotPasswordToken(user);
    // let nToken = token.replaceAll(".", "ABC45");
    let link = `${config.base_url}resetPassword?token=${token}&id=${user._id}`;
    let data = { link, user };
    let mailResponse = await MailService.sendResetPasswordMail(data);
    return res.json({
      message: "email send successfully!",
      payload: mailResponse,
    });
  } catch (error) {
    next(error);
  }
};
export const resestPasswordLayout = async (req, res, next) => {
  let { token, id } = req.query;
  try {
    let isValidToken = jwtHelper.verifyJWTToken(token);
  } catch (error) {
    next(error);
  }
};
export const resestPassword = async (req, res, next) => {
  let { id, password } = req.body;
  try {
    let encryptedPassword = hashPassword(password);
    await User.findByIdAndUpdate(id, {
      password: encryptedPassword,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    let users=await User.find().select('-password');
    return res.json({
      message: "Users Fetch Successfully!",
      payload: users,
    });
  } catch (error) {
    next(error);
  }
};
export const getUserWithWalletAddr = async (req, res, next) => {
  let { wallet_addr } = req.params;
  try {
    if(!wallet_addr) return res.status(401).json({ error: { code: 401, message: 'wallet_addr required' } });
    const user=await User.findOne({wallet_addr}).lean().exec()
    if(!user) return res.status(404).json({ error: { code: 404, message: 'user not found' } });
    delete user?.password;
    return res.json({
      message: "User Fetch Successfully!",
      payload: user,
    });
  } catch (error) {
    next(error);
  }
};
export const getOneUser = async (req, res, next) => {
  let { id } = req.params;
  try {
    if(!id) return res.status(401).json({ error: { code: 401, message: 'id required' } });
    const user=await User.findById(id).lean().exec()
    if(!user) return res.status(404).json({ error: { code: 404, message: 'user not found' } });
    delete user.password;
    return res.json({
      message: "User Fetch Successfully!",
      payload: user,
    });
  } catch (error) {
    next(error);
  }
};
export const updateUser = async (req, res, next) => {
  let { id } = req.params;
  let {email,username}=req.body;
  try {
    if(!id) return res.status(401).json({ error: { code: 401, message: 'id required' } });
    if (email||username) {
      const checkemail = await User.findOne({ ...(email?{email}:{}),...(username?{username}:{}) });
      if(checkemail) return res.status(404).json({ error: { code: 404, message: 'Email or Name already exists' } });
    }
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    }).lean().exec();
    if(!user) return res.status(404).json({ error: { code: 404, message: 'user not found' } });
    delete user.password;
    return res.json({
      message: "User Updated Successfully!",
      payload: user,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteUser = async (req, res, next) => {
  let { id } = req.params;
  try {
    if(!id) return res.status(401).json({ error: { code: 401, message: 'id required' } });
    const user=await User.findByIdAndDelete(id)
    if(!user) return res.status(404).json({ error: { code: 404, message: 'user not found' } });
    return res.json({
      message: "User delete Successfully!",
      payload: {},
    });
  } catch (error) {
    next(error);
  }
};