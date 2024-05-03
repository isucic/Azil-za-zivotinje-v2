const mongoose = require("mongoose")
const { Schema } = mongoose;

const tipDonacijeSchema = new Schema({
    naziv: String
  })
const TipDonacije = mongoose.model("TipDonacije", tipDonacijeSchema, "tipDonacije")

module.exports = TipDonacije
