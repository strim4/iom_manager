//Database device model
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const DeviceSchema = new Schema({
device: String,
});

const Device = mongoose.model('Device', DeviceSchema)
module.exports = Device;