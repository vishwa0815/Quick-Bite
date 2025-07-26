const mongoose = require('mongoose');

const connectToDB = async () => {
    try {
        await mongoose.connect('MONGO_URL');
        console.log('DataBase Connected Succesfully');
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectToDB;
