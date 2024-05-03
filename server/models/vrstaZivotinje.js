const mongoose = require("mongoose")
const { Schema } = mongoose;

const vrstaZivotinjeSchema = new Schema({
    naziv: String
  })
  const VrstaZivotinje = mongoose.model("VrstaZivotinje", vrstaZivotinjeSchema, "vrstaZivotinje")

module.exports = VrstaZivotinje