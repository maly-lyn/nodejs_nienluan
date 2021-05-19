const mongoose = require('mongoose');

async function connect() {

    try {
        await mongoose.connect('mongodb://localhost:27017/Jasmine', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
        });
        console.log('Connect successfully!!!');
    } catch (error) {
        console.log('Connect failue!!!');
    }

}

module.exports = { connect };