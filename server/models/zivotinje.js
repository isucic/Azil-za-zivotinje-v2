const mongoose = require("mongoose")
const { Schema } = mongoose;
const VrstaZivotinje = require("./vrstaZivotinje")

const zivotinjaSchema = new Schema({
    ime: String,
    vrsta: {type: Schema.Types.ObjectId, ref: 'VrstaZivotinje'},
    photo: String,
    cip: Boolean,
    godine: String,
    opis: String,
    pregled: String,
    udomljen: Boolean
  })
  const Zivotinja = mongoose.model("Zivotinja", zivotinjaSchema, "zivotinje")

  module.exports = Zivotinja