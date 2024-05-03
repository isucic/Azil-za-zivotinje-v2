const mongoose = require("mongoose")
const { Schema } = mongoose;
const TipDonacije = require("./tipDonacije")
  
const donacijaShema = new Schema({
opis: String,
kategorija: String,
tip: {type: Schema.Types.ObjectId, ref: 'TipDonacije'},
vrijednost: Number
})
const Donacija = mongoose.model("Donacija", donacijaShema, "donacije")

module.exports = Donacija
  