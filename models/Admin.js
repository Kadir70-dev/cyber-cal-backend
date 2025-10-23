const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const AdminSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
});

AdminSchema.methods.setPassword = async function(password){
  this.passwordHash = await bcrypt.hash(password, 10);
};
AdminSchema.methods.verifyPassword = async function(password){
  return bcrypt.compare(password, this.passwordHash);
};

module.exports = mongoose.model('Admin', AdminSchema);
