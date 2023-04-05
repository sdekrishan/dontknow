require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const connection = mongoose.connect(process.env.MONGO);
module.exports = {connection}