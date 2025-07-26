const mongoose = require('mongoose');

const connectToDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://sidduhatavadi7:sidduhatavadi7@cluster0.cqfdtwt.mongodb.net/');
        console.log('DataBase Connected Succesfully');
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectToDB;