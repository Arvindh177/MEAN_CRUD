const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

let Employee = new Scheme({
    name: {
        type: String
    },
    email: {
        type: String
    },
    designation: {
        type: String,
    },
    phoneNumber: {
        type: Number
    }
}, {
    collection: 'employees'
}) 

module.exports = mongoose.model('Employee',Employee);