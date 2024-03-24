const { default: mongoose } = require("mongoose");
const mongo = require("mongoose");

const mongoURI = "mongodb://localhost:27017/notes";

const connectTOMongo = () => {
    // try {
    mongoose.connect(mongoURI);
    // } catch (e) {
    // console.log(e);
    // }
    // let response = res.then((e) => {
    //     console.log(e);
    // });
};

module.exports = connectTOMongo;
