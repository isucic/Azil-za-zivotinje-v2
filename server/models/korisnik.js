const mongoose = require("mongoose")
const { Schema } = mongoose;

const korisnikShema = new Schema({
    username: String,
    email: String,
    password: String,
    role: { type: String, default: "user" }
})
const Korisnik = mongoose.model("Korisnik", korisnikShema, "korisnici")

module.exports = Korisnik