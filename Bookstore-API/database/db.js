const mongoose = require('mongoose');

const connectToDB = async () => {
    try {
        await mongoose.connect(
            'mongodb+srv://kolawoleolari:kolawoleolari0992@cluster1.9b4ddeu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1'
        );
        console.log("mongodb is connected successfully");
    } catch (error) {
        console.error('Mongodb connection failed', error);
        process.exit(1);
    }
}

module.exports = connectToDB;