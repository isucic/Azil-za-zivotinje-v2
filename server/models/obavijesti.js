const mongoose = require("mongoose")
const { Schema } = mongoose;

const obavijestSchema = new Schema({
    naslov: String,
    datum: String,
    tekst: String,
    vazno: Boolean
  })
  const Obavijest = mongoose.model("Obavijest", obavijestSchema, "obavijesti")

  module.exports = Obavijest