const User = require('../models/User');

const createUser = async userData => {
  const user = new User(userData);
  await user.save();
  return user;
};

const getUserByPhone = async phoneNumber => {
  return await User.findOne({phoneNumber});
};

const getUserById = async id => {
  return await User.findById(id);
};

const updateUser = async (id, updates) => {
  return await User.findByIdAndUpdate(id, updates, {new: true});
};

const deleteUser = async id => {
  return await User.findByIdAndDelete(id);
};

const verifyUser = async id => {
  return await User.findByIdAndUpdate(id, {isVerified: true}, {new: true});
};

const updateSavingsConfig = async (id, config) => {
  return await User.findByIdAndUpdate(id, {savingsConfig: config}, {new: true});
};

module.exports = {
  createUser,
  getUserByPhone,
  getUserById,
  updateUser,
  deleteUser,
  verifyUser,
  updateSavingsConfig,
};
